import { createClient } from "redis";

const redis = createClient({
  url: process.env.REDIS_DB_URL,
});

export { redis };
