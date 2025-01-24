const Article = require('./../models/articleModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

exports.create = async (req, res, next) => {
  const { description, descriptionAr } = req.body;
  const image = req.file.filename;
  const filetype = req.file.mimetype.split('/')[0];
  await Article.create({ description, descriptionAr, image, filetype });

  res.send('Article created successfully!');
};

exports.getAll = async (req, res, next) => {
  let articles = [];
  if (req.headers.authorization) {
    const userId = req.ID;
    articles = await Article.aggregate([
      {
        $project: {
          description: 1,
          descriptionAr: 1,
          filetype: 1,
          image: 1,
          createdAt: 1,
          likeCount: 1,
          shareCount: 1,
          isLiked: { $in: [userId, '$likes'] },
        },
      },
    ]);
  } else {
    articles = await Article.find().select('-likes');
  }

  res.status(200).send(articles);
};

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const article = await Article.findById(id);
  if (!article) return res.status(404).send('Article Not Found!');
  res.status(200).json(article);
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    {
      description: req.body.description,
      descriptionAr: req.body.descriptionAr,
      image: req.file?.filename,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.send('updated successfully!');
});

exports.deleteArticle = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (req.body.pass === process.env.PASS_DELETE) {
    await Article.findByIdAndDelete(id);
    return res.status(200).send('Article deleted successfully!');
  }
  return next(new AppError('This process has been registered', 400));
});

exports.like = catchAsync(async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.user.id;
  const article = await Article.findById(articleId);
  if (!article) {
    return next(new AppError('invalid id', 400));
  }

  const index = article.likes.indexOf(userId);
  if (index === -1) {
    // User is liking the article
    article.likes.push(userId);
    article.likeCount++;
  } else {
    // User is unliking the article
    article.likes.splice(index, 1);
    article.likeCount--;
  }

  await article.save();
  return res.send(article);
});
