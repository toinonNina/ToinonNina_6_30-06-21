const mysql = require('mysql2');


const Post = function(post) {
    this.post_id = post.post_id;
    this.content_text = post.content_text;
    this.titre = post.titre;
    this.image = post.image;
};

module.exports = Post;