const { validateToken } = require("../services/authentication");
function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      console.log("No token cookie found");
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      console.log("User authenticated:", req.user);
    } catch (error) {
      console.error("Error validating token:", error);
    }
    return next();
  };
}

module.exports = {
  checkForAuthenticationCookie,
  validateToken,
};
