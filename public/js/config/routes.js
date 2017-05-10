/*
Create Angular config in app.config module
*/
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', ($stateProvider, $urlRouterProvider, $locationProvider) => {
  'use strict'
    // Define prefix
    $locationProvider.hashPrefix('!');
    // For each url not found redirection to '/'
    $urlRouterProvider.otherwise('/posts/');
    /*
      Define a state with name 'app' this state is abstract and url is empty (root of application)
      template is ui-view it's used to display nested views
      */
      $stateProvider.state('app', {
        url: '',
        abstract: true,
        template: '<navbar /><div class="container"><ui-view></ui-view></div>'
      })
      .state('callback', {
        url: '/auth/callback/:token',
        template: '',
        controller: ['UsersService', '$stateParams', '$state', function(UsersService, $stateParams, $state) {
          if ($stateParams.token) {
            UsersService.setToken($stateParams.token).then((user) => {
              let toastContent = `Welcome ${user.name} !`
              Materialize.toast(toastContent, 4000, 'toast-success')
              $state.go('blog.list')
            })
          } else {
            $state.go('blog.list')
          }
        }]
      })

      .state("algo1", {
        url:'/algo1',
        templateUrl: 'views/algo1.html',
        controller: ['$scope', function($scope) {


          $scope.friends = ["Ryan", "Kieran", "Mark"];
          $scope.trueFriends = [];

          $scope.findTrueFriends = (friends) => {
            friends.forEach((friend) => {
              if (friend.length === 4) {
                $scope.trueFriends.push(friend);
              }
            })
          }

          $scope.findTrueFriends($scope.friends);
        }]

      })

      .state("algo2", {
        url:'/algo2',
        templateUrl: 'views/algo2.html',
        controller: ['$scope', function($scope) {
          $scope.result = 0;
          $scope.paper = 0.0001;
          $scope.fold= 0;
          $scope.foldTo = (distance) => {
            if ($scope.paper <= distance) {
             $scope.paper = $scope.paper * 2;
             $scope.fold ++;

             $scope.foldTo(distance);
           }
           else {
            $scope.result = $scope.fold;
          }
        }
        $scope.foldTo(14928418679754190000);

      }]

    })

    }]
