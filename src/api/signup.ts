import {BACKEND_BASE_URL} from './endpoints';

export interface SignUpParams {
  email: string;
  firstname: string;
  surname: string;
  country_code: string;
  password: string;
  hobbies: string[];
}

type Token = string;

const signup: (userInfo: SignUpParams) => Promise<Token> = async (userInfo) => {
  const url = `${BACKEND_BASE_URL}/signup`;

  console.log(JSON.stringify(userInfo));

  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(userInfo),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to connect');
  }

  return await response.json().then((data) => {
    if (data.status !== 200) {
      throw new Error(data.message);
    }

    return data.token;
  });
};

export default signup;
