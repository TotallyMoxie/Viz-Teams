// * IMPORTS
const jwt = require("jsonwebtoken");

// * FUNCTIONS
const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET); // Check if a token is valid

// Attach cookies to the response
const attachCookies = ({ res, user, refreshToken }) => {
	const accessTokenJWT = jwt.sign({ user }, process.env.JWT_SECRET); // Create an access token
	const refreshTokenJWT = jwt.sign(
		{ user, refreshToken },
		process.env.JWT_SECRET
	); // Create a refresh token

	const oneHour = 1000 * 60 * 60; // One hour in milliseconds
	const oneDay = 1000 * 60 * 60 * 24; // One day in milliseconds

	// Attach the cookies
	res.cookie("accessToken", accessTokenJWT, {
		httpOnly: true,
		expires: new Date(Date.now() + oneHour),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});
	res.cookie("refreshToken", refreshTokenJWT, {
		httpOnly: true,
		expires: new Date(Date.now() + oneDay),
		secure: process.env.NODE_ENV === "production",
		signed: true,
	});

	return { accessTokenJWT, refreshTokenJWT };
};

// * EXPORTS
module.exports = { isTokenValid, attachCookies };
