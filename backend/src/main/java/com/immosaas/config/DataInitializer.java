package com.immosaas.config;

import com.immosaas.domain.User;
import com.immosaas.domain.enums.Role;
import com.immosaas.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@immosaas.ma")) {
            User admin = User.builder()
                    .email("admin@immosaas.ma")
                    .password(passwordEncoder.encode("Admin@2024!"))
                    .nom("Administrateur IMMO SAAS")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build();
            userRepository.save(admin);
            log.info("Compte admin créé : admin@immosaas.ma / Admin@2024!");
        }
    }
}
