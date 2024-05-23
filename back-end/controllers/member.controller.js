const Member = require("../models/Member.model");

const createMember = async (req, res) => {
	const { name, title, picture, team } = req.body;
	if (!name || !title || !picture || !team) {
		return res
			.status(400)
			.json({ message: "Please provide a name, title, picture, and team" });
	}
	const newMember = await Member.create({ name, title, picture, team });
	res.status(201).json({ newMember });
};

const getAllMembers = async (req, res) => {
	const members = await Member.find();
	if (!members) {
		return res.status(404).json({ message: "No members found" });
	}
	res.status(200).json({ members });
};

const getMemberById = async (req, res) => {
	const { id } = req.params;
	const member = await Member.findById(id);
	if (!member) {
		return res.status(404).json({ message: "No member found" });
	}
	res.status(200).json({ member });
};

const deleteMember = async (req, res) => {
	const { id } = req.params;
	const member = await Member.findByIdAndDelete(id);
	if (!member) {
		return res.status(404).json({ message: "No member found" });
	}
	res.status(200).json({ message: "Member deleted" });
};

const updateMember = async (req, res) => {
	const { id } = req.params;
	const { name, title, picture, team } = req.body;
	const member = await Member.findByIdAndUpdate(
		id,
		{ name, title, picture, team },
		{ new: true, runValidators: true }
	);
	if (!member) {
		return res.status(404).json({ message: "No member found" });
	}
	res.status(200).json({ member });
};

module.exports = {
	createMember,
	getAllMembers,
	getMemberById,
	deleteMember,
	updateMember,
};
