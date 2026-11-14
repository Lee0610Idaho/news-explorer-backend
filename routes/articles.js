const router = require("express").Router();

const {
  validateCreateArticle,
  validateDeleteArticle,
} = require("../middlewares/validators");

const {
  createArticle,
  getArticles,
  removeArticle,
} = require("../controllers/articles");

router.post("/", validateCreateArticle, createArticle);
router.get("/", getArticles);
router.delete("/:articleId", validateDeleteArticle, removeArticle);

module.exports = router;
