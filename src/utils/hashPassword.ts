import crypto from 'node:crypto';

const hashPassword = (password: string) => {
  const hash = crypto
    .createHmac('sha256', process.env.JWT_SECRET as string)
    .update(password)
    .digest('hex');
  return hash;
};

export default hashPassword;
