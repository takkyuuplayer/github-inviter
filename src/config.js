import sha256 from 'sha256';

export const signingSecret = sha256(`${process.env.GH_BASIC_CLIENT_ID}${process.env.GH_BASIC_CLIENT_SECRET}`);

export default signingSecret;
