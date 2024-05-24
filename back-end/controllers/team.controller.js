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
	try {
		const teams = await Team.find();
		if (!teams || teams.length === 0) {
			return res.status(404).json({ message: "No teams found" });
		}

		const fixedTeams = await Promise.all(
			teams.map(async (team) => {
				const actualMembers = await Promise.all(
					team.members.map(async (memberId) => {
						const foundMember = await Member.findById(memberId);
						if (!foundMember) {
							throw new Error(`Member not found: ${memberId}`);
						}
						return foundMember;
					})
				);
				team.members = actualMembers;
				return team;
			})
		);

		res.status(200).json({ teams: fixedTeams });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTeamById = async (req, res) => {
	try {
		const { id } = req.params;
		const team = await Team.findById(id);
		if (!team) {
			return res.status(404).json({ message: "No team found" });
		}

		const actualMembers = await Promise.all(
			team.members.map(async (memberId) => {
				const foundMember = await Member.findById(memberId);
				if (!foundMember) {
					throw new Error(`Member not found: ${memberId}`);
				}
				return foundMember;
			})
		);

		team.members = actualMembers;
		res.status(200).json({ team });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getTeamByName = async (req, res) => {
	try {
		const { name } = req.query;
		const team = await Team.findOne({ name });
		if (!team) {
			return res.status(404).json({ message: "No team found" });
		}

		const actualMembers = await Promise.all(
			team.members.map(async (memberId) => {
				const foundMember = await Member.findById(memberId);
				if (!foundMember) {
					throw new Error(`Member not found: ${memberId}`);
				}
				return foundMember;
			})
		);

		team.members = actualMembers;
		res.status(200).json({ team });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const updateTeam = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, members: memberIds } = req.body;

		// Check if all member IDs are valid
		await Promise.all(
			memberIds.map(async (memberId) => {
				const foundMember = await Member.findById(memberId);
				if (!foundMember) {
					throw new Error(`Member not found: ${memberId}`);
				}
			})
		);

		// Update the team
		const team = await Team.findByIdAndUpdate(
			id,
			{ name, members: memberIds },
			{ new: true, runValidators: true }
		);

		if (!team) {
			return res.status(404).json({ message: "No team found" });
		}

		res.status(200).json({ team });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
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
