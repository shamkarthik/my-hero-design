import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NEXT_PUBLIC_BLOG_SYNC_URL: z.string().min(1),
    NEXT_PUBLIC_BLOG_SYNC_FOLDER: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_BLOG_SYNC_URL: process.env.NEXT_PUBLIC_BLOG_SYNC_URL,
    NEXT_PUBLIC_BLOG_SYNC_FOLDER: process.env.NEXT_PUBLIC_BLOG_SYNC_FOLDER,
  },
});
