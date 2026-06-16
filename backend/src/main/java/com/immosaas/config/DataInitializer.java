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
        if (!userRepository.existsByEmail("admin@fynd.ma")) {
            userRepository.save(User.builder()
                    .email("admin@fynd.ma")
                    .password(passwordEncoder.encode("Admin1234"))
                    .nom("Admin Fynd")
                    .telephone("0600000000")
                    .role(Role.ADMIN)
                    .enabled(true)
                    .build());
            log.info("✅ Admin créé : admin@fynd.ma / Admin1234");
        }
        if (!userRepository.existsByEmail("vendeur@fynd.ma")) {
            userRepository.save(User.builder()
                    .email("vendeur@fynd.ma")
                    .password(passwordEncoder.encode("Fynd1234"))
                    .nom("Vendeur Test")
                    .telephone("0611111111")
                    .role(Role.VENDEUR)
                    .enabled(true)
                    .build());
            log.info("✅ Vendeur créé : vendeur@fynd.ma / Fynd1234");
        }
        if (!userRepository.existsByEmail("acheteur@fynd.ma")) {
            userRepository.save(User.builder()
                    .email("acheteur@fynd.ma")
                    .password(passwordEncoder.encode("Fynd1234"))
                    .nom("Acheteur Test")
                    .telephone("0622222222")
                    .role(Role.ACHETEUR)
                    .enabled(true)
                    .build());
            log.info("✅ Acheteur créé : acheteur@fynd.ma / Fynd1234");
        }
    }
}
