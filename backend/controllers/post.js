const Post = require("../models/Post");
const { Sequelize } = require('../models/Post');
const { sequelize } = require('../models/Post');
const User = require("../models/User");
const fs = require("fs");


exports.createPost = (req, res, next) => {
    Post.create({
        creator_Id: req.body.id,
        content: req.body.content,
        Title: req.body.Title,
        //imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })
        .then(() => res.status(201).json({ message: 'Post crée' }))
        .catch(error => res.status(400).json({ error }));
};

exports.getOnePost = (req, res, next) => {
    Post.findAll({ where: { postId: req.params.id }, include: [{ model: User }] })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({ error }));
};
exports.getAllPost = (req, res, next) => {
    Post.findAll({
        order: sequelize.literal('(createdAt) DESC'),
        include: [{ model: User }]
    })
        .then(posts => res.status(200).json(posts))
        .catch(error => res.status(400).json({ error }));
};

exports.modifyOnePost = (req, res, next) => {
    let PostObject;
    console.log(req.params.id);
    if (req.file) {
        PostObject = {
            content: req.body.content,
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        };
        Post.findAll({ where: { id: req.params.id } })
            .then(post => {
                const filename = post[0].imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.update({
                        ...PostObject
                    },
                        {
                            where: {
                                postId: req.params.id
                            }
                        })
                        .then(() => res.status(200).json({ message: "Votre post a été modifié !" }))
                        .catch(error => res.status(400).json({ message: "Je n'ais pas pu modifier votre Post" + error }));
                });
            })
            .catch(error => console.log("Je n'ai pas pu trouvé votre Post", error));

    } else {
        Post.update({
            content: req.body.content
        },
            {
                where: {
                    id: req.params.id
                }
            })
            .then(() => res.status(200).json({ message: "Votre post a été modifié !" }))
            .catch(error => res.status(400).json({ message: "Je n'ais pas pu modifier votre Post" + error }));
    }
};

exports.deletePost = (req, res, next) => {
    Post.findAll({ where: { id: req.params.id } })
        .then(post => {
            const filename = post[0].imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Post.destroy({ where: { id: req.params.id } })
                    .then(() => res.status(200).json({ message: "Post supprimé ! " }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};

