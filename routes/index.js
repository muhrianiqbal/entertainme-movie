const router = require("express").Router();
const MovieController = require("../controllers/movie");

router.get("/", MovieController.read);
router.post("/add", MovieController.create);
router.put("/update/:id", MovieController.update);
router.delete("/delete/:id", MovieController.delete);

module.exports = router;