// * IMPORTS
const { isTokenValid, attachCookies } = require("../lib/auth/jwt");
const { Token } = require("../models/Token.model");

// * MIDDLEWARE
// Authenticate User
async function authenticateUser(req, res, next) {
	const { refreshToken, accessToken } = req.signedCookies; // Grab the cookies from the request

	// Try to authenticate the user
	try {
		// If the access token is present, check if it's valid
		if (accessToken) {
			const payload = isTokenValid(accessToken); // Check if the token is valid

			req.user = payload.user; // Set the user in the request object so it can be accessed in the route

			return next(); // Move on to the next middleware
		}

		// If the refresh token is present, check if it's valid
		const payload = isTokenValid(refreshToken);

		// If the refresh token is valid, attach the cookies and move on to the next middleware
		const existingToken = await Token.findOne({
			user: payload.user.userId,
			refreshToken: payload.refreshToken,
		});
		// If the token doesn't exist or isn't valid, send a 401 response
		if (!existingToken || !existingToken?.isValid) {
			return res.status(401).json({ message: "Unauthorized" });
		} else {
			// If the token is valid, attach the cookies and move on to the next middleware
			attachCookies({
				res,
				user: payload.user,
				refreshToken: existingToken.refreshToken,
			});

			req.user = payload.user; // Set the user in the request object so it can be accessed in the route

			return next(); // Move on to the next middleware
		}
	} catch (err) {
		return res.status(500).json({ message: "Server Error" });
	}
}

// Authorize Permissions
const authorizePermissions = (...roles) => {
	// Return a middleware function
	return (req, res, next) => {
		// If the user's role isn't included in the roles array, send a 401 response
		if (!roles.includes(req.user.role)) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		next(); // Move on to the next middleware
	};
};

// * EXPORTS
module.exports = { authenticateUser, authorizePermissions };
