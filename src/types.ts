export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: User;
};

export type User = {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  password: string;
  created_at: string;
};

export type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    loading: boolean;
}

export type Props = {
    children: React.ReactElement;
}

export type LoginFormData = {
  email: string;
  password: string; 
}