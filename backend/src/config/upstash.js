import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import dotenv from 'dotenv';

dotenv.config();

// rate limiter that allows 10 reqs per 20 seconds

const rateLimit = new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10, '20 s')
});

export default rateLimit;