import aj from "../config/arcjet.js";

export default async function arcjetMiddleware(req, res, next) {
  try {
    const decision = await aj.protect(req, { requested: 1 });
    // console.log("ARCJET DECISION:", decision);

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({ error: "Rate limit exceeded" });
      if (decision.reason.isBot())
        return res.status(403).json({ error: "Bot detected" });

      return res.status(403).json({ error: "Access denied" });
    }

    next();
  } catch (err) {
    console.log("Arcjet middleware Error: ", err);
    next(err);
  }
}
// console.log(typeof arcjetMiddleware);
