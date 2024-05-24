const Team = require("../models/Team.model");
const Member = require("../models/Member.model");

const createTeam = async (req, res) => {
	const { name, members: memberIds } = req.body;
	if (!name || !memberIds) {
		return res
			.status(400)
			.json({ message: "Please provide a name and members" });
	}
	memberIds.forEach(async (member) => {
		const foundMember = await Member.findById(member);
		if (!foundMember) {
			return res.status(404).json({ message: "Member not found" });
		}
	});
	const newTeam = await Team.create({ name, members: memberIds });
	res.status(201).json({ newTeam });
};

const getTeams = async (req, res) => {
	const teams = await Team.find();
	if (!teams) {
		return res.status(404).json({ message: "No teams found" });
	}
	res.status(200).json({ teams });
};

const getTeamById = async (req, res) => {
	const { id } = req.params;
	const team = await Team.findById(id);
	if (!team) {
		return res.status(404).json({ message: "No team found" });
	}
	res.status(200).json({ team });
};

const getTeamByName = async (req, res) => {
	const name = req.query.name;
	const team = await Team.findOne({ name });
	if (!team) {
		return res.status(404).json({ message: "No team found" });
	}
	res.status(200).json({ team });
};

const updateTeam = async (req, res) => {
	const { id } = req.params;
	const { name, members: memberIds } = req.body;
	const team = await Team.findByIdAndUpdate(
		id,
		{ name, members: memberIds },
		{ new: true, runValidators: true }
	);
	if (!team) {
		return res.status(404).json({ message: "No team found" });
	}
	memberIds.forEach(async (member) => {
		const foundMember = await Member.findById(member);
		if (!foundMember) {
			return res.status(404).json({ message: "Member not found" });
		}
	});
	res.status(200).json({ team });
};

const deleteTeam = async (req, res) => {
	const { id } = req.params;
	const team = await Team.findByIdAndDelete(id);
	if (!team) {
		return res.status(404).json({ message: "No team found" });
	}
	res.status(200).json({ message: "Team deleted" });
};

module.exports = {
	createTeam,
	getTeams,
	getTeamById,
	getTeamByName,
	updateTeam,
	deleteTeam,
};
