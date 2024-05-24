const {
	createMember,
	getAllMembers,
	getMemberById,
	deleteMember,
	updateMember,
} = require("../controllers/member.controller");

const router = require("express").Router();

router.post("/new", createMember);
router.get("/", getAllMembers);
router.get("/:id", getMemberById);
router.delete("/:id", deleteMember);
router.patch("/:id", updateMember);

module.exports = router;
