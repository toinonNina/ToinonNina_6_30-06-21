const mysql = require('mysql2');


const Post = function (post) {
    this.id = post.post_id;
    this.content_text = post.content_text;
    this.titre = post.titre;
    this.image = post.image;
    this.user_id = comment.user_id;
};

module.exports = Post;