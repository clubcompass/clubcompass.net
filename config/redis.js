import { createClient } from "redis";

const redis = createClient({
  url: "rediss://:98602f47511e4af1b658ec0184fb55d5@usw1-modern-lamprey-32301.upstash.io:32301",
});

export { redis };
