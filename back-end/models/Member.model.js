const { model, Schema, Types } = require("mongoose");

const MemberSchema = new Schema({
	firstName: {
		type: String,
		required: [true, "First name is required"],
		trim: true,
	},
	lastName: {
		type: String,
		required: [true, "Last name is required"],
		trim: true,
	},
	title: {
		type: String,
	},
	picture: {
		type: String,
	},
	team: {
		type: String,
	},
});

const Member = model("Member", MemberSchema);

module.exports = Member;
