import Subscription from "../models/subscription-model.js";

export async function createSubscription(req, res, next) {
  try {
    const subscription = await Subscription({
      ...req.body,
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (e) {
    next(e);
  }
}

export async function getUserSubscriptions(req, res, next) {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.statusCode = 401;
      throw error;
    }

    const subscriptions = await Subscription.find({
      user: req.params.id,
    });

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (e) {
    next(e);
  }
}
