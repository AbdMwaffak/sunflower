/*
1)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for articles
const articleSchema = new Schema({
    // Your existing fields
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Pre-save hook to update likeCount and likes array
articleSchema.pre('save', async function(next) {
    if (this.isModified('likes')) {
        this.likeCount = this.likes.length;
    }
    next();
});

// Custom method to toggle like status for a user
articleSchema.methods.toggleLike = async function(userId) {
    const index = this.likes.indexOf(userId);
    if (index === -1) {
        // User is liking the article
        this.likes.push(userId);
        this.likeCount++;
    } else {
        // User is unliking the article
        this.likes.splice(index, 1);
        this.likeCount--;
    }
    await this.save();
};

// Define model
const Article = mongoose.model('Article', articleSchema);

// Assuming you have a User model

// When fetching all articles, populate the 'likes' field for the user
async function getAllArticles(userId) {
    const articles = await Article.find().populate('likes').exec();
    // Modify articles to include a field indicating if the user has liked each article
    const modifiedArticles = articles.map(article => {
        const isLiked = article.likes.some(like => like._id.equals(userId));
        return { ...article.toObject(), isLiked };
    });
    return modifiedArticles;
}

// Example usage
const userId = 'user_id_here'; // User ID of the current user
getAllArticles(userId)
    .then(articles => {
        console.log(articles);
    })
    .catch(error => {
        console.error(error);
    });

// Example usage to toggle like status for an article
const articleId = 'article_id_here'; // ID of the article
const article = await Article.findById(articleId);
if (article) {
    await article.toggleLike(userId);
    console.log('Like toggled successfully.');
} else {
    console.log('Article not found.');
}

*/


/*
2) 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for articles
const articleSchema = new Schema({
    // Your existing fields
    likeCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

// Define model
const Article = mongoose.model('Article', articleSchema);

// Custom method to toggle like status for a user
articleSchema.statics.toggleLike = async function(articleId, userId) {
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

// When fetching all articles, include a field indicating if the user has liked each article
articleSchema.statics.getAllArticles = async function(userId) {
    const articles = await this.aggregate([
        {
            $project: {
                title: 1, // Add other fields you want to retrieve
                likeCount: 1,
                shareCount: 1,
                likes: 1,
                isLiked: { $in: [mongoose.Types.ObjectId(userId), '$likes'] }
            }
        }
    ]);

    return articles;
};

// Example usage
const userId = 'user_id_here'; // User ID of the current user

// Fetch all articles and include the 'isLiked' field
Article.getAllArticles(userId)
    .then(articles => {
        console.log(articles);
    })
    .catch(error => {
        console.error(error);
    });

// Example usage to toggle like status for an article
const articleId = 'article_id_here'; // ID of the article
Article.toggleLike(articleId, userId)
    .then(() => {
        console.log('Like toggled successfully.');
    })
    .catch(error => {
        console.error(error);
    })
*/