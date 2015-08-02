app.service('CommentService',function($http,AuthService){
	var BASE = "http://localhost:3000";
	var posts = null;

	this.getCommentByPostId = function(id){
		comments = $http.get('/posts/posts/' + id)
		.success(function(data){
			var x = data;
			return x;
		})
		.error(function(data){
			console.log("Failed request");
			console.log(JSON.stringify(data));
		});
		return comments;
	}
	this.incrementVote = function(id){
		console.log(id);
		var headers = { Authorization: 'Bearer ' + AuthService.getToken()};
		comment = $http.put('/posts/comment/' + id + '/upvote',null,{ headers: headers } )
		.success(function(data){
			return data;
		})
		.error(function(data){
			console.log("Error Occurred");
		});
		return comment;
	}

	this.createComment = function(post_id,comment){

		var headers = { Authorization: 'Bearer ' + AuthService.getToken()};
		res = $http.post('/posts/' + post_id + '/comment',comment,{ headers: headers } )
		.success(function(data){
			return data;
		})
		.error(function(data){
			console.log("Error Occurred");
		});
		return res;
	}
});
