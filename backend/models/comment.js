const mysql = require('mysql2');


const Comment = function(comment) {
    this.comments_id = comment.post_id;
    this.content_com = comment.content_text;
    this.post_post_id = comment.post_post_id;
};

module.exports = Comment;