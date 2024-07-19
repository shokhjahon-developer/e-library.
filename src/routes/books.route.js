const { Router } = require("express");
const isAuthedMiddleware = require("../middlewares/is_auth");
const { get, post, put, remove } = require("../controllers/books.controller");
const isAdmin = require("../middlewares/is_admin");

const router = Router();

router.get("/", isAuthedMiddleware, get);
router.post("/", isAdmin, post);
router.put("/:id", isAdmin, put);
router.delete("/:id", isAdmin, remove);

module.exports = router;
