export type Credential = {
    
    id?: number;
    firstName?: string;
    lastName?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    age?: number;
    email?: string;
    phone?: number;
    role?: 'user' | 'admin';
    address?: {
      street?: string;
      city?: string;
      state?: string;
      zipCode?: number;
    };
}