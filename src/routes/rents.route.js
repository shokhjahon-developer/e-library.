const { Router } = require("express");
const { get, post, remove } = require("../controllers/rents.controller");
const isAuthedMiddleware = require("../middlewares/is_auth");

const router = Router();

router.get("/", isAuthedMiddleware, get);
router.post("/", isAuthedMiddleware, post);
router.delete("/", isAuthedMiddleware, remove);

module.exports = router;
