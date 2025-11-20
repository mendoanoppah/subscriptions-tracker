import Subscription from "../models/subscription-model.js";

export async function createSubscription(req, res, next) {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // const dataSubscription = subscription.toObject()
    // delete subscription.__v;

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
    }).select("-__v");

    res.status(200).json({
      success: true,
      data: subscriptions,
    });
  } catch (e) {
    next(e);
  }
}
