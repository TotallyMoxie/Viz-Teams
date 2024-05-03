// * IMPORTS
const { model, Schema, Types } = require("mongoose");

// * SCHEMA
const TokenSchema = new Schema(
	{
		refreshToken: { type: String, required: true },
		ip: { type: String, required: true },
		userAgent: { type: String, required: true },
		isValid: { type: Boolean, default: true },
		user: {
			type: Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true }
);

// * MODEL
const Token = model("Token", TokenSchema);

// * EXPORTS
module.exports = Token;
