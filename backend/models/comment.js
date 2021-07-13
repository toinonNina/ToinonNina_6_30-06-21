const mysql = require('mysql2');


const Comment = function (comment) {
    this.id = comment.post_id;
    this.content_com = comment.content_text;
    this.post_id = comment._post_id;
    this.date_creation = comment.date_creation;
    this.user_id = comment.user_id;
};

module.exports = Comment;