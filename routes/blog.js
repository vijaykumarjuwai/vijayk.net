const express = require('express');
const blog = express.Router();
const Blog = require('../models/Blog');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');

blog.get('/', (req, res, next) => {
    Blog.find()
        .then((blogData) => {
            res.json(blogData);
        })
        .catch((err) => {
            return next(err);
        });
});

blog.get('/:id', (req, res, next) => {
    Blog.findById(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(err);
        })
});

blog.post('/', (req, res, next) => {
    Blog.create(req.body)
        .then((blogData) => {
            res.json(blogData);
        })
        .catch((err) => {
            return next(err);
        })
});

blog.delete('/:id', (req, res, next) => {
    Blog.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
    })
    .catch((err) => {
        return next(err);
    });
});

blog.patch('/:id', (req, res, next) => {
    Blog.findByIdAndUpdate(req.params.id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            return next(err);
        });
});

module.exports = blog;