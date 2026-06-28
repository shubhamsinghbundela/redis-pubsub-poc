import { createClient } from "redis";

export const publisher = createClient({ url: process.env.REDIS_URL }).on(
  "error",
  (error) => {
    console.error("Redis publisher error", error);
  },
);

export async function connectRedis(): Promise<void> {
  await Promise.all([publisher.connect()]);
}

export async function pingRedis(): Promise<string> {
  return publisher.ping();
}
