const Article = require('../models/article');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => res.send({ data: articles }))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.send({ data: article }))
    .catch(next);
};

const deleteArticle = (req, res, next) => {
  Article.findByIdAndRemove(req.params.articleId)
    .then((article) => res.send({ data: article }))
    .catch(next);
};

module.exports = {
  getAllArticles,
  createArticle,
  deleteArticle,
};
