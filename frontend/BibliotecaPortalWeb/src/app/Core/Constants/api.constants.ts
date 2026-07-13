import { environment } from '../../../environments/environment.prod';

export const API_URL = environment.apiUrl;

export const COOKIE = `${API_URL}`;
export const AUTH_URL = `${API_URL}/auth`;
export const PUBLIC = `${API_URL}/public`;
export const API = `${API_URL}/api`;