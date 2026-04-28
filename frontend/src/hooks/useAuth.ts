import { useAuthStore } from '../store/authStore';
import { authApi } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const { user, setUser, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    setUser(res.data);
    const role = res.data.role;
    if (role === 'ADMIN') navigate('/admin');
    else if (role === 'VENDEUR') navigate('/vendeur/mes-produits');
    else navigate('/');
  };

  const register = async (data: {
    email: string;
    password: string;
    nom: string;
    telephone?: string;
    role: 'VENDEUR' | 'ACHETEUR';
  }) => {
    await authApi.register(data);
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return { user, login, register, logout: handleLogout, isAuthenticated };
}
