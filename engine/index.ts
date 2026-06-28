import { createClient } from "redis";

export const subscriber = createClient({ url: process.env.REDIS_URL }).on(
  "error",
  (error) => {
    console.error("Redis publisher error", error);
  },
);

await subscriber.connect();

console.log("Engine listening...");

await subscriber.subscribe("engine:command", async (message) => {
  const data = JSON.parse(message);

  console.log("Received:", data);

  // Simulate processing
  const response = {
    ok: true,
    message: "Order processed successfully",
    data,
  };
});
