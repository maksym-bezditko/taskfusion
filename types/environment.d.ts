import 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_URL: string;
      AT_SECRET: string;
      RT_SECRET: string;
    }
  }
}
