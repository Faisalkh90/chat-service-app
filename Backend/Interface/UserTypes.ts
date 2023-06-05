export type userRegistration = {
  name: string;
  email: string;
  password: string;
};

export type userLogin = {
  email: string;
  password: string;
};

export type userLogin2 = {
  _id: string;
  name: string;
  email: string;
  password: string;
  matchPasswords: (password: string) => Promise<boolean>;
};
