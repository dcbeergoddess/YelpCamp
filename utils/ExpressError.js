//CLASS EXTENDS REGULAR BUILT IN ERROR
class ExpressError extends Error {
  constructor(message, statusCode){
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
};

module.exports = ExpressError;