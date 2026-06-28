import express from "express";

import { connectRedis, pingRedis, publisher } from "./utils/engine-client";

await connectRedis();

export const app = express();

app.get("/health", async (_req, res) => {
  await pingRedis();
  res.json({ ok: true });
});

console.log("Backend started...");

setInterval(async () => {
  const payload = {
    type: "create_order",
    payload: {
      userId: "ankit",
      symbol: "BTCUSDT",
      price: 100,
      quantity: 1,
    },
  };

  console.log("Publishing:", payload);

  await publisher.publish("engine:command", JSON.stringify(payload));
}, 5000);
