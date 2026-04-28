import api from './axios';
import type { AuthUser } from '../types';

export const authApi = {
  register: (data: { email: string; password: string; nom: string; telephone?: string; role: string }) =>
    api.post<string>('/auth/register', data),

  login: (data: { email: string; password: string }) =>
    api.post<AuthUser>('/auth/login', data),

  refresh: (refreshToken: string) =>
    api.post<AuthUser>('/auth/refresh', null, { params: { refreshToken } }),
};
