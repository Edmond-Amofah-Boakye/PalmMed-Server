interface General {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  imageUrl?: string;
  resetToken?: string;
  tokenExpiration?: number;
}

export interface User extends General {
  reports?: any;
  role: string;
  doctor_id?: any
}

export interface Message {
  message: string;
  type: string;
}

export interface Doctor extends General {
  user_id: any;
  type: any;
  role: string;
  reports?: any;
}

export enum ROLE {
  user = "user",
  doctor = "doctor"
}

