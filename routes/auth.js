const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const { validateSignup, validateLogin } = require("../middlewares/validators");

router.post("/signin", validateLogin, login);
router.post("/signup", validateSignup, createUser);

module.exports = router;
