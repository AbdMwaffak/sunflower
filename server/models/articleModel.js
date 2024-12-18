const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  descriptionAr: {
    type: String,
    // require: true,
  },
  image: String,
  //
  filetype: {
    type: String,
    enum: ['image', 'video'],
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  shareCount: {
    type: Number,
    default: 0,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Article = mongoose.model('Article', articleSchema);

articleSchema.statics.toggleLike = async function (articleId, userId) {
  const article = await this.findById(articleId);
  if (!article) {
    throw new Error('Article not found.');
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
};

module.exports = Article;

/*
 

*/
