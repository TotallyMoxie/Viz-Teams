const { model, Schema, Types } = require("mongoose");

const MemberSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		unique: true,
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
