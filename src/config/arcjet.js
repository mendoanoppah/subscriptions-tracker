import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const arcjt = arcjet({
  key: ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        "POSTMAN",
        // See the full list at https://arcjet.com/bot-list
      ],
    }),
    tokenBucket({
      mode: "LIVE",
      // See https://docs.arcjet.com/fingerprints
      characteristics: ["ip.src"],
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 5, // Bucket capacity of 5 tokens
    }),
  ],
});

export default arcjt;
