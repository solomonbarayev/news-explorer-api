const router = require('express').Router();
const {
  createArticle,
  getAllArticles,
  deleteArticle,
} = require('../controllers/article');
const {
  validateArticle,
  validateArticleId,
} = require('../middleware/validation');

router.get('/', getAllArticles);
router.post('/', validateArticle, createArticle);
router.delete('/:articleId', validateArticleId, deleteArticle);

module.exports = router;
