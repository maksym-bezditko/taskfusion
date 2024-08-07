import axios from 'axios';

export const nextApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_NEXT_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
