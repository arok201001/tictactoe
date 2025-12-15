import { createContext, useContext, useEffect, useState } from "react";
import type { User, AuthContextType } from "../types";
import type { Props } from "../types";
import { apiClient } from "../api/api-client";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async (email: string, password: string ) => {},
  register: async (username: string, email: string, password: string) => {},
  forgotPassword: async (email: string) => {},
  loading: false,
});

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("In order to use context - AuthContext must be present");
  }
  return context;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      const refreshToken = localStorage.getItem("refresh_token");

      if (!refreshToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await apiClient.post(`/refresh_token`, {
          refresh_token: refreshToken,
        });

        const data = response.data;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
      } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");

        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    autoLogin();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiClient.post(`/login`, {
        email,
        password,
      });

      const data = response.data;
      console.log("Logged in successfuly", data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } catch (error: any) {
      console.log("Login error:", error);

      if (error.response?.status === 404) {
        console.log("User not found");
      }
      if (error.response?.status === 401) {
        console.log("Password is incorrect");
      }
      throw new Error("Login failed");
    } finally {
      setLoading(false)
    }
  };

  const register = async (username: string, email: string, password: string) => {
    setLoading(true)
    try {
      const response = await apiClient.post(`/register`, {
        username,
        email,
        password,
      });

      const data = response.data;
      console.log("Registered successfuly", data);

      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("refresh_token", data.refresh_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
    } catch (error: any) {
      console.log("Registration error:", error);
      throw error;
    } finally {
      setLoading(false)
    }
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    try {
      await apiClient.post(`/forgot-password`, { 
        email,
      });
      console.log("Reset email sent successfully");
    } catch (error: any) {
      console.log("Forgot password error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, forgotPassword, loading }}>
      {children}
    </AuthContext.Provider>
  );
}