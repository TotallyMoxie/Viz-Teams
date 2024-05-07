// * IMPORTS
const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// * SCHEMA
const UserSchema = new Schema({
	email: {
		type: String,
		require: [true, "Email is required"],
		unique: true,
		trim: true,
		lowercase: true,
		match: [
			/^([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,})$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		require: [true, "Password is required"],
		minLength: 8,
	},
});

// * HOOKS
UserSchema.pre("save", async function () {
	if (!this.isModified("password")) return;
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

// * METHODS
UserSchema.methods.comparePass = async function (givenPass) {
	const isMatch = await bcrypt.compare(givenPass, this.password);
	return isMatch;
};

UserSchema.methods.generateToken = function () {
	const token = jwt.sign(
		{
			id: this._id,
			email: this.email,
		},
		process.env.JWT_SECRET,
		{ expiresIn: process.JWT_LIFETIME }
	);
	return token;
};

// * MODEL
const User = model("User", UserSchema);

// * EXPORTS
module.exports = User;
