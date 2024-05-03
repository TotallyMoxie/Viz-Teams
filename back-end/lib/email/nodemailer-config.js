// * Nodemailer Config
const nodemailerConfig = {
	host: process.env.NODEMAILER_HOST, // Host
	port: process.env.NODEMAILER_PORT, // Port
	auth: {
		user: process.env.NODEMAILER_USER, // User
		pass: process.env.NODEMAILER_PASSWORD, // Password
	},
};

// * EXPORTS
module.exports = nodemailerConfig;
