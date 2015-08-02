app.service('PostService',function($http,AuthService){
	var BASE = "http://localhost:3000";
	var posts = null;

	this.getPosts = function(){
		posts = $http.get('/posts')
		.success(function(data){
			var x = data;
			return x;
		})
		.error(function(data){
			console.log("Failed request");
			console.log(JSON.stringify(data));
		});
		return posts;
	}
	this.incrementVote = function(id){
		console.log(id);
		var headers = { Authorization: 'Bearer ' + AuthService.getToken()};
		post = $http.put('/posts/' + id + '/upvote',null,{ headers: headers } )
		.success(function(data){
			return data;
		})
		.error(function(data){
			console.log("Error Occurred");
		});
		return post;
	}

	this.createPost = function(post){
		var headers = { Authorization: 'Bearer ' + AuthService.getToken()};
		res = $http.post('/posts',post,{ headers: headers } )
		.success(function(data){
			return data;
		})
		.error(function(data){
			console.log("Error Occurred");
		});
		return res;
	}
});
