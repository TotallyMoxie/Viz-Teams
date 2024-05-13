// * IMPORTS
const User = require("../models/User.model.js");
const Token = require("../models/Token.model.js");
const crypto = require("crypto");
const {
	sendResetPasswordEmail,
	sendVerificationEmail,
} = require("../lib/email/nodemailer");
const { attachCookies } = require("../lib/auth/jwt.js");

// * CONTROLLERS
// CONTROLLER: Register User
const registerUser = async (req, res) => {
	const { email, password } = req.body; // Destructure the email, password from the request body
	const emailAlreadyExists = await User.findOne({ email }); // Check if the email is already taken

	// If the email is already taken, send a 400 response
	if (emailAlreadyExists) {
		return res.status(400).json({ message: "Invalid email" });
	}

	// If the email or password is missing, send a 400 response
	if (!email || !password) {
		return res.status(400).json({ message: "Invalid fields" });
	}

	const verificationToken = crypto.randomBytes(2 ** 8).toString("hex"); // Generate a verification token

	// Create a new user
	const user = await User.create({
		email,
		password
	});

	let frontendUrlString = "http://localhost:4200";
	// TODO: Set this to the server URL depending on the environment

	// Send a verification email
	/* await sendVerificationEmail({
		email: user.email,
		verificationToken: user.verificationToken,
		frontendUrl: frontendUrlString,
	}); */

	const tokenUser = { userId: user._id, email: user.email }; // Create a token user
	let refreshToken = ""; // Create a refresh token

	const existingToken = await Token.findOne({ user: user._id }); // Find an existing token

	// If the token exists, check if it's valid
	if (existingToken) {
		const { isValid } = existingToken; // Destructure the isValid property from the existing token

		// If the token isn't valid, send a 401 response
		if (!isValid) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		refreshToken = existingToken.refreshToken; // Set the refresh token to the existing token's refresh token

		attachCookies({ res, user: tokenUser, refreshToken }); // Attach the cookies
		console.log(tokenUser)
		return res.status(200).json({ data: { user: {email} } }); // Send a 200 response with the user
	}

	// If the token doesn't exist, create a new refresh token
	refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"]; // Get the user agent
	const ip = req.ip; // Get the IP address
	const userToken = { refreshToken, ip, userAgent, user: user._id }; // Create a user token

	await Token.create(userToken); // Create the token

	attachCookies({ res, user: tokenUser, refreshToken }); // Attach the cookies
	res.status(200).json({ data: { email: user.email, id: user._id } }); // Send a 200 response with the user
};

// CONTROLLER: Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body; // Destructure the email and password from the request body

	// If the email or password is missing, send a 401 response
	if (!email || !password) {
		return res.status(401).json({ message: "Email or password not valid" });
	}

	const user = await User.findOne({ email }); // Find the user by email

	// If the user doesn't exist, send a 401 response
	if (!user) {
		return res.status(401).json({ message: "Email or password not valid" });
	}

	const isPassCorrect = await user.comparePass(password); // Compare the password with the hashed password

	// If the password is incorrect, send a 401 response
	if (!isPassCorrect) {
		return res.status(401).json({ message: "Email or password not valid" });
	}

	const tokenUser = { userId: user._id, role: user.role }; // Create a token user
	let refreshToken = ""; // Create a refresh token

	const existingToken = await Token.findOne({ user: user._id }); // Find an existing token

	// If the token exists, check if it's valid
	if (existingToken) {
		const { isValid } = existingToken; // Destructure the isValid property from the existing token

		// If the token isn't valid, send a 401 response
		if (!isValid) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		refreshToken = existingToken.refreshToken; // Set the refresh token to the existing token's refresh token

		attachCookies({ res, user: tokenUser, refreshToken }); // Attach the cookies

		return res.status(200).json({ data: { email: user.email, id: user._id } }); // Send a 200 response with the user
	}

	// If the token doesn't exist, create a new refresh token
	refreshToken = crypto.randomBytes(40).toString("hex");
	const userAgent = req.headers["user-agent"]; // Get the user agent
	const ip = req.ip; // Get the IP address
	const userToken = { refreshToken, ip, userAgent, user: user._id }; // Create a user token

	await Token.create(userToken); // Create the token

	attachCookies({ res, user: tokenUser, refreshToken }); // Attach the cookies
	res.status(200).json({ data: { email: user.email, id: user._id } }); // Send a 200 response with the user
};

// CONTROLLER: Logout User
const logoutUser = async (req, res) => {
	await Token.findOneAndDelete({ user: req.user.userId }); // Find and delete the token

	// Attach the cookies
	res.cookie("accessToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.cookie("refreshToken", "logout", {
		httpOnly: true,
		expires: new Date(Date.now()),
	});

	return res.status(200).json({ message: "user logged out" }); // Send a 200 response
};

// CONTROLLER: Forgot Password
const forgotPass = async (req, res) => {
	const { email } = req.body; // Destructure the email from the request body

	// If the email is missing, send a 400 response
	if (!email) {
		return res.status(400).json({ message: "Invalid email" });
	}

	const user = await User.findOne({ email }); // Find the user by email

	let frontendUrlString = "http://localhost:4200"; // TODO: Set this to the server URL depending on the environment

	// If the user exists, send a reset password email
	if (user) {
		const passwordToken = crypto.randomBytes(70).toString("hex"); // Generate a password token
		// Send a reset password email
		await sendResetPasswordEmail({
			email: user.email,
			passwordToken: passwordToken,
			frontendUrl: frontendUrlString,
		});

		const tenMinutes = 1000 * 60 * 10; // Set the expiration date to 10 minutes
		const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes); // Set the expiration date

		user.passwordResetToken = passwordToken; // Set the password token
		user.passwordResetExpiration = passwordTokenExpirationDate; // Set the expiration date
		await user.save(); // Save the user

		//TODO Remove password token from res
		return res.status(200).json({
			message: "Check your email for reset link",
			passwordToken,
		}); // Send a 200 response
	}
};

// CONTROLLER: Reset Password
const resetPass = async (req, res) => {
	const { passwordToken, password, email } = req.body; // Destructure the token, email, and password from the request body

	// If the token, email, or password is missing, send a 400 response
	if (!passwordToken || !email || !password) {
		return res
			.status(400)
			.json({ message: "Invalid token, email, or password" });
	}

	const user = await User.findOne({ email }); // Find the user by email

	if (user.passwordResetToken !== passwordToken) {
		return res.status(400).json({ message: "Invalid token" });
	}

	// If the user doesn't exist, send a 400 response
	if (user && user.passwordResetToken && user.passwordResetExpiration) {
		const currentDate = new Date(); // Get the current date

		// If the password token and expiration date are valid, reset the password
		if (
			user.passwordResetToken === passwordToken &&
			user.passwordResetExpiration > currentDate
		) {
			user.password = password; // Set the password
			user.passwordResetToken = null; // Set the password token to null
			user.passwordResetExpiration = null; // Set the expiration date to null

			await user.save(); // Save the user

			return res.status(200).json({ message: "Success: Reset password" }); // Send a 200 response
		} else {
			return res.status(400).json({ message: "Invalid token" }); // Send a 400 response
		}
	} else {
		return res.status(400).json({ message: "Please try again" }); // Send a 400 response
	}
};

// CONTROLLER: Verify Email
const verifyEmail = async (req, res) => {
	const { verificationToken, email } = req.body; // Destructure the verification token and email from the request params

	const user = await User.findOne({ email }); // Find the user by email

	// If the user doesn't exist, send a 401 response
	if (!user) {
		return res.status(400).json({ message: "Verification failed" });
	}

	// If the user is already verified, send a 401 response
	if (user.verificationToken !== verificationToken) {
		return res.status(400).json({ message: "Verification failed" });
	}

	user.isVerified = true; // Set the user to verified
	user.verified = Date.now(); // Set the verified date
	user.verificationToken = ""; // Set the verification token to an empty string

	await user.save(); // Save the user

	return res.status(200).json({ message: "Success: Email verified" }); // Send a 200 response
};

// CONTROLLER: Resend Verification Email
const resendVerification = async (req, res) => {
	// Destructure the email from the request body
	const { email } = req.body;

	// Find the user by their email in the database
	const user = await User.findOne({
		email,
	});

	// Define a variable to hold the server URL string
	let frontendUrlString = "http://localhost:4200"; //TODO Same as on register user

	// Send a verification email to the user
	await sendVerificationEmail({
		// Pass the user's email, verification token, and server URL to the email sending function
		email: user.email,
		verificationToken: user.verificationToken,
		url: frontendUrlString,
	});

	// Send a successful response (HTTP 200) with the user data
	return res.status(200).json({ data: { user } });
};

// CONTROLLER: Me
const me = async (req, res) => {
	const user = await User.findOne({ _id: req.user.userId }); // Find the user by id

	// If the user doesn't exist, send a 401 response
	if (!user) {
		return res.status(401).json({ message: "User not found" });
	}

	return res.status(200).json({
		data: {
			user: {
				id: user._id,
				email: user.email,
			},
		},
	}); // Send a 200 response with the user
};

// CONTROLLER: Delete User
const deleteUser = async (req, res) => {
	// get the user id
	const { id } = req.params;

	// if no id the return res.status().json
	if (!id) {
		return res.status(400).json({ message: "No user id provided" });
	}

	// if no user found then return error
	if (!User.findOne({ _id: id })) {
		return res.status(400).json({ message: "User not found" });
	}

	// find the user by id and delete it from the database
	const deletedUser = await User.findOneAndDelete({ _id: id }); // Find the user by id

	// return the deleted user
	return res.status(200).json({ data: { user: deletedUser } }); // Send a 200 response
};

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	if (!users) {
		// If no users are found, send a 400 response
		return res.status(400).json({ message: "No users found" });
	}
	res.status(200).json({ data: { users } }); // Send a 200 response with the users
};

// * EXPORTS
module.exports = {
	registerUser,
	loginUser,
	logoutUser,
	forgotPass,
	resetPass,
	verifyEmail,
	resendVerification,
	me,
	deleteUser,
	getAllUsers,
};
