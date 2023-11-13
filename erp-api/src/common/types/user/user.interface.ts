export interface UserInterface {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  pwdHash: string;
  currentTokenId: string;
}

export type SaveUserInterface = Omit<
  UserInterface,
  'pwdHash' | 'currentTokenId'
>;
