const {
	createTeam,
	getTeams,
	getTeamById,
	getTeamByName,
	updateTeam,
	deleteTeam,
} = require("../controllers/team.controller");

const router = require("express").Router();

router.post("/new", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeamById);
router.get("/name", getTeamByName);
router.patch("/:id", updateTeam);
router.delete("/:id", deleteTeam);

module.exports = router;
