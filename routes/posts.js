var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = require('../models/Posts.js');
var Comment = require('../models/Comments.js');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET all posts */
router.get('/', function(req, res, next) {
  Post.find(function(err,posts){
  	if(err) return next(err);
  	res.json(posts);
  });
});

//create new post
router.post('/', auth,function(req, res, next) {
  var post = new Post(req.body);
  post.author = req.payload.username;
  post.save(function(err,post){
  	console.log(req.body);
  	if(err) return next(err);
  	res.json(post);
  });
});


//get post by id
router.get('/:id',function(req,res,next){
	Post.findById(req.params.id,function(err,post){
		if(err) return next(err);
		res.json(post);
	});

});

//upvote a particular post
router.put('/:id/upvote',auth ,function(req,res,next){

  Post.findById(req.params.id,function(err,post){
		if(err) return next(err);
		post.upvotes = post.upvotes + 1;
		post.save(function(err){
			if(err) return next(err);
		})
		res.json(post);
	});

});

//create comment and add to post
router.post('/:id/comment', auth , function(req,res,next){
	var comment = new Comment(req.body);
	comment.post = req.params.id;
  comment.author = req.payload.username;
	comment.save(function(err,comment){
		if(err) return next(err);
		Post.findById(req.params.id,function(err,post){
			if(err) return next(err);
			post.comments.push(comment);
			post.save(function(err,post){
				if(err) return next(err);
				res.json(comment);
			})

		});

	})

});


//retrieve posts alongwith comments
router.get('/posts/:id', function(req, res, next) {
  Post.findById(req.params.id,function(err,post){
  	console.log(post);
  	post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
  })
});

//upvote a comment
router.put('/comment/:com/upvote',auth,function(req,res,next){
	Comment.findById(req.params.com , function(err,com){
		console.log(req.params.com);
		if(err) return next(err);
		com.upvotes = com.upvotes + 1;
		com.save(function(err){
			if(err) return next(err);
		})
		res.json(com);
	});

});


module.exports = router;
