export interface Auth {
  login: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  data: {
    id: number;
    role: number;
  };
}
