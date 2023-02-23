import fetch from 'node-fetch';
import { getConfig, log } from '@danielhammerl/nodejs-service-framework';

export const login = async (): Promise<string | null> => {
  try {
    const { url, username, password } = getConfig<{ url: string; username: string; password: string }>(
      'serviceAccounts.userService'
    );
    const response = await fetch(`${url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });
    if (!response.ok) {
      console.error('User service login call failed', { metadata: { serverResponse: response } });
      return null;
    }
    const loginResponseBody = await response.json();
    return loginResponseBody.token;
  } catch (e: unknown) {
    console.error('Error in userService::login', e as Error);
    return null;
  }
};
