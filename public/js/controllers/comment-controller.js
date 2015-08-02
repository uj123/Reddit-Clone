app.controller('commentCtrl',['$scope','$http','$routeParams','CommentService' ,'AuthService',
	function($scope,$http,$routeParams,CommentService,AuthService){
		$scope.isLoggedIn = AuthService.isLoggedIn;
		id = $routeParams.id;
		console.log(id);
		CommentService.getCommentByPostId(id).then(function(response){
			$scope.comments = response.data.comments;
			$scope.title = response.data.title;
			$scope.link = response.data.link;

			console.log(response.data);
		});

		$scope.incrementVote = function(comment){
			CommentService.incrementVote(comment._id).then(function(response){
				comment.upvotes = response.data.upvotes;
				console.log(comment.upvotes);
			});
		}

		$scope.addComment = function(){
			if(!$scope.body ) return;
			comment = {
				"body": $scope.body,
				"author": AuthService.currentUser()
			};

			CommentService.createComment(id,comment).then(function(response){
				res = response.data;
				$scope.comments.push(res);
				console.log(res);
			});
			$scope.body = '';
		}

		//console.log($scope.posts);
}]);
