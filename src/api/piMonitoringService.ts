import { RegisterResponse } from '../types/piMonitoringService';
import { FetchResponse } from '../types/fetchResponse';
import fetch from 'node-fetch';
import { getConfig } from '@danielhammerl/nodejs-service-framework';

export const register = async (token: string, name: string): Promise<FetchResponse<RegisterResponse>> => {
  const { url } = getConfig<{ url: string }>('serviceAccounts.piMonitoringService');
  const response = await fetch(`${url}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};

export const heartbeat = async (token: string, id: string): Promise<FetchResponse<RegisterResponse>> => {
  const { url } = getConfig<{ url: string }>('serviceAccounts.piMonitoringService');
  const response = await fetch(`${url}/heartbeat/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return {
    ok: response.ok,
    status: response.status,
    data,
  };
};
