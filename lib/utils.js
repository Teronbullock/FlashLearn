module.exports.asyncHandler = (cb, errMsg, errStatus ) => {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (error) {
      if (errMsg) {
        error.message = errMsg + error.message;
      }

      if (errStatus) {
        error.status = errStatus;
      }

      next(error);
    }
  };
};