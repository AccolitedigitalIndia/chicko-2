import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createServer } from '../server';

const app = createServer();

export default async (req: VercelRequest, res: VercelResponse) => {
  return new Promise((resolve, reject) => {
    app(req as any, res as any, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
};
