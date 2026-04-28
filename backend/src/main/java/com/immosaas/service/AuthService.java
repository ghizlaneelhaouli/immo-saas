package com.immosaas.service;

import com.immosaas.dto.request.LoginRequest;
import com.immosaas.dto.request.RegisterRequest;
import com.immosaas.dto.response.AuthResponse;

public interface AuthService {
    void register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
    AuthResponse refreshToken(String refreshToken);
}
