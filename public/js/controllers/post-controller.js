app.controller('postCtrl',['$scope','$http','PostService' , 'AuthService',
	function($scope,$http,PostService,AuthService){
		$scope.isLoggedIn = AuthService.isLoggedIn;
		PostService.getPosts().then(function(response){
			$scope.posts = response.data;
			console.log($scope.posts);
		});

		$scope.incrementVote = function(post){
			PostService.incrementVote(post._id).then(function(response){
				post.upvotes = response.data.upvotes;
				console.log(post.upvotes);
			});
		}

		$scope.addPost = function(){
			if(!$scope.title || !$scope.link) return;
			post = {
				"title": $scope.title,
				"link": $scope.link
			};

			PostService.createPost(post).then(function(response){
				res = response.data;
				$scope.posts.push(res);
				console.log(res);
			});
			$scope.title = '';
  			$scope.link = '';
		}

		//console.log($scope.posts);
}]);
