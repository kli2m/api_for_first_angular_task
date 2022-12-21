import bcrypt from 'bcrypt';

export const getHashPsw = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const isVerifyPsw = async (password: string, hash: string) => {
  const isRes = await bcrypt.compare(password, hash);
  return isRes;
};
