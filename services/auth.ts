import { ADMIN_USERS } from '../constants';
import type { AdminUser } from '../types';

const USER_KEY = 'aura_admin_user';

class AuthService {
  
  login(email: string): AdminUser | null {
    const user = ADMIN_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      return user;
    }
    return null;
  }

  logout(): void {
    localStorage.removeItem(USER_KEY);
  }

  getCurrentUser(): AdminUser | null {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) {
      try {
        return JSON.parse(userJson) as AdminUser;
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        this.logout();
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  hasRole(role: 'Senior Admin'): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }
}

export const authService = new AuthService();
