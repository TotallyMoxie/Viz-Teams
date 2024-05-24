const { model, Schema, Types } = require("mongoose");

const TeamSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required"],
		unique: true,
		trim: true,
	},
	members: [
		{
			type: Types.ObjectId,
			ref: "Member",
		},
	],
});

const Team = model("Team", TeamSchema);

module.exports = Team;
