// Made by: Santiago Manco

// External Imports
import axios from 'axios';

// Internal Imports
import type { UserInterface } from '@/interfaces/UserInterface';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default class AuthService {
  public static async login(email: string, password: string): Promise<UserInterface | null> {
    try {
      const { data: tokenResponse } = await axios.post<{ access_token: string }>(
        `${BASE_URL}/api/auth/login`,
        { email, password },
      );

      localStorage.setItem('token', tokenResponse.access_token);

      const { data: user } = await axios.get<UserInterface>(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
      });

      return user;
    } catch {
      return null;
    }
  }

  public static async getMe(token: string): Promise<UserInterface | null> {
    try {
      const { data: user } = await axios.get<UserInterface>(`${BASE_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return user;
    } catch {
      return null;
    }
  }

  public static logout(): void {
    localStorage.removeItem('token');
  }
}
