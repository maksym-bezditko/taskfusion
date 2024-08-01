'use server';

import * as jose from 'jose';

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.AT_SECRET),
};

export const isJwtValid = async (token: string) => {
  try {
    await jose.jwtVerify(token, jwtConfig.secret);

    return true;
  } catch (error) {
    return false;
  }
};
