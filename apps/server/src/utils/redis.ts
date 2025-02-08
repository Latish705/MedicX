import { Redis } from "@upstash/redis";

const connnectRedis = async () => {
  try {
    const client = new Redis({
      url: process.env.REDIS_URL!,
      token: process.env.REDIS_TOKEN!,
    });
    console.log("Redis connected");
    return client;
  } catch (error: any) {
    console.log(error);
  }
};
