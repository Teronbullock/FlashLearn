/**
 *  Function to handle async errors.
 *  This function will handle async errors and pass them to the
 *  error handling middleware.
 *  If there is no error the callback will be called.
 * 
 * @param {*} cb - The callback function to call.
 * @param {*} errMsg - The error message to display.
 * @param {*} errStatus - The error status to display.
 * @returns 
 */
export const asyncHandler = (cb, errMsg, errStatus ) => {
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