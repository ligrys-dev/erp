import { hash, compare } from 'bcrypt';

export const hashPwd = async (plaintextPwd: string) => {
  return await hash(plaintextPwd, 10);
};

export const comparePwd = async (plaintextPwd: string, hashPwd: string) => {
  return await compare(plaintextPwd, hashPwd);
};
