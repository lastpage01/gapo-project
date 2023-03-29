export interface UserState {
  isLoggedIn: boolean;
  username: null | string;
  email: null | string;
}

export interface Login {
  email: string;
  password: string;
  success:()=>void
}

export interface LoginSuccess {
  username: string;
  email: string;
}

export interface ChangeName {
  email: string;
  newName: string;
}

export interface GetMe {
  onErr: () => void;
}
