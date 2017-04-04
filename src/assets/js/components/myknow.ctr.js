(function (){
	"use strict";

	angular
	  .module('MyKnow')
	  .controller('MyKnowCtrl', function($scope, $http){
	  	$scope.title = 'MyKnow App';
  		$scope.msg = "stamo a un livello esagerato";
      //$scope.db = 'assets/data/movielist.json';
      $scope.db = 'https://dl.dropboxusercontent.com/s/jq00d8q688bua1b/movielist.json';

  		$http.get($scope.db).then(function (movies){
  			$scope.movies = movies.data;
  			$scope.genres = getGenres($scope.movies);
  		})


  		function getGenres(movies) {
  			var genres = [];

  			angular.forEach(movies, function(item){
  				angular.forEach(item.genres, function(genre) {
  					genres.push(genre);
  				})
  			});

			return _.uniq(genres);
  		};

	  });
})();
