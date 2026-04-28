package com.immosaas.service.impl;

import com.immosaas.domain.User;
import com.immosaas.domain.enums.Role;
import com.immosaas.dto.request.LoginRequest;
import com.immosaas.dto.request.RegisterRequest;
import com.immosaas.dto.response.AuthResponse;
import com.immosaas.exception.BusinessException;
import com.immosaas.repository.UserRepository;
import com.immosaas.security.JwtTokenProvider;
import com.immosaas.service.AuthService;
import com.immosaas.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    @Override
    @Transactional
    public void register(RegisterRequest request) {
        if (request.getRole() == Role.ADMIN) {
            throw new BusinessException("Inscription ADMIN non autorisée via API");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BusinessException("Email déjà utilisé");
        }
        User user = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .nom(request.getNom())
                .telephone(request.getTelephone())
                .role(request.getRole())
                .enabled(true)
                .build();
        userRepository.save(user);
        emailService.sendWelcomeEmail(user);
        log.info("Nouvel utilisateur enregistré : {} ({})", user.getEmail(), user.getRole());
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BusinessException("Utilisateur introuvable"));

        log.info("Connexion réussie : {}", user.getEmail());
        return AuthResponse.builder()
                .token(jwtTokenProvider.generateToken(user))
                .refreshToken(jwtTokenProvider.generateRefreshToken(user))
                .email(user.getEmail())
                .role(user.getRole().name())
                .nom(user.getNom())
                .build();
    }

    @Override
    public AuthResponse refreshToken(String refreshToken) {
        String email = jwtTokenProvider.extractEmail(refreshToken);
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BusinessException("Token invalide"));
        return AuthResponse.builder()
                .token(jwtTokenProvider.generateToken(user))
                .refreshToken(refreshToken)
                .email(user.getEmail())
                .role(user.getRole().name())
                .nom(user.getNom())
                .build();
    }
}
