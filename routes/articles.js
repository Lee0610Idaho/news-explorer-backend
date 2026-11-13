const router = require("express").Router();

const {
  createArticle,
  getArticles,
  removeArticle,
} = require("../controllers/articles");

router.post("/", createArticle);
router.get("/", getArticles);
router.delete("/:articleId", removeArticle);

module.exports = router;
