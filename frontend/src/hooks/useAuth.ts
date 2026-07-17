import { useAuthStore } from '../store/authStore';
import { loginCustomer, loginAdmin } from '../services/authService';

export function useAuth() {
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin);
  const token = useAuthStore((state) => state.token);
  const loginState = useAuthStore((state) => state.login);
  const loginAdminState = useAuthStore((state) => state.loginAsAdmin);
  const logoutState = useAuthStore((state) => state.logout);
  const updateCashback = useAuthStore((state) => state.updateCashbackBalance);

  const handleCustomerLogin = async (email: string, document: string) => {
    const data = await loginCustomer(email, document);
    loginState(data.customer, data.token);
    return data.customer;
  };

  const handleAdminLogin = async (password: string) => {
    const data = await loginAdmin(password);
    loginAdminState(data.token);
  };

  return {
    user,
    isAdmin,
    token,
    isAuthenticated: !!token,
    loginCustomer: handleCustomerLogin,
    loginAdmin: handleAdminLogin,
    logout: logoutState,
    updateCashback
  };
}
