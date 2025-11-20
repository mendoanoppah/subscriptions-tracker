import User from "../models/user-model.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password").select("-__v");

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").select("-__v");

    if (!user) {
      const error = new Error("User is not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export {
  getUsers,
  getUser
}