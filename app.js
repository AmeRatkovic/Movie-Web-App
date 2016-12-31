'use strict';

var myApp = angular.module('MyApp', ['ui.router']);

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
        .state("home", {
            url: "/",
            template: '<p> nesto </p>'
        })
        .state("movies", {
            url: "/movies",
            templateUrl: 'movies.html',
            controller: 'movieController'
        })

    .state("shows", {
            url: "/shows",
            templateUrl: 'shows.html',
            controller: 'showController'
        })
        .state("shows.detail", {
            url: "^/show/:id",
            views: {
                'detail': {
                    templateUrl: 'shows.detail.html',
                    controller: 'showDetailController'
                }
            },
        })
        .state("movies.detail", {
            url: "^/movie/:id",
            views: {
                'detail': {
                    templateUrl: 'movies.detail.html',
                    controller: 'movieDetailController'
                }
            },
        });


});


myApp.controller('btnController', ['$scope', '$rootScope', function($scope, $rootScope) {

    $scope.$on('child', function(event, data) {

        $scope.amer1x = !$scope.amer1x;
        
       
    });



    $scope.toogle = function() {
        $scope.$broadcast('parent', 'Some data');

    }
}]);

myApp.service('PaginationService', function() {
    var service = {};
    service.currentPageNumber = 1;
    service.currentText = null;
    service.setNewPageNumber = function(newPageNumber) {
        service.currentPageNumber = newPageNumber;
    };
    service.setNewText = function(newText) {
        service.currentText = newText;
    };
    return service;
});
myApp.controller('movieController', function($scope, $rootScope, $http, $location, PaginationService) {
    $location.path('/movies');
    $scope.currentPage = PaginationService.currentPageNumber;
    $scope.page = $scope.currentPage;



    $scope.currentT = PaginationService.currentText;
    $scope.searchText = $scope.currentT;
    $scope.setPage = function(pageNo) {
        $scope.currentPage = pageNo;
    };
    $scope.setPage(1);
    $scope.$watch('currentPage', function() {
        PaginationService.setNewPageNumber($scope.currentPage);
    });

    if ($scope.searchText != null && $scope.searchText != "")

    {
        var tmp = $scope.searchText;
        $scope.currentT = $scope.searchText;
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=6205d4c9b91b07a79aa1d847976c2901&query=' + tmp).then(function(result) {
                $scope.moviess = result.data.results;
            })
            .catch(function(response) {
                console.error('Error', response.status, response.data);
            })
            .finally(function() {
                console.log("Movies SEARCH successful.");
            });


    };




    $scope.setText = function(text) {

        $scope.currentT = text;
    };

    $scope.$on('parent', function(event, data) {
        $scope.setText("");
    });

    $scope.$watch('currentT', function() {
        PaginationService.setNewText($scope.currentT);
    });




    $scope.change = function(text) {

        var tmp = $scope.searchText;
        $scope.currentT = $scope.searchText;
        if ($scope.searchText.length >= 3) {
            $http.get('https://api.themoviedb.org/3/search/movie?api_key=6205d4c9b91b07a79aa1d847976c2901&query=' + tmp)
                .then(function(result) {
                    $scope.moviess = result.data.results;
                })
                .catch(function(response) {
                    console.error('Error', response.status, response.data);
                })
                .finally(function() {
                    console.log("Movies SEARCH successful.");
                });
        }

    };




    $scope.amer = false;
    var loc = $location.url();

    $rootScope.countResult = 1;



    function loadPage(page) {
        $http.get("https://api.themoviedb.org/3/movie/top_rated", {
                params: {
                    api_key: '6205d4c9b91b07a79aa1d847976c2901',
                    page: page
                }
            })
            .then(function(response) {
                $scope.movies = response.data.results;
            })
            .catch(function(response) {
                console.error('Error', response.status, response.data);
            })
            .finally(function() {
                console.log("Movies GET successful.");
            });

    }
    loadPage($scope.page);

    $scope.open2 = function(id,page) {
        $scope.currentPage = $scope.page;
        $scope.movie = id;
        $scope.amer = true;
        $scope.$emit('child', 'Some data'); 

    };
    $scope.open3 = function(id) {
     
        $scope.mov = true;

        $scope.movie = id;
        $scope.amer = true;
        $scope.myVar4 = !$scope.myVar4;

        $scope.mov = true;
        $scope.$emit('child', 'Some data'); 

    };

    $scope.next = function() {
        loadPage(++$scope.page);
        $scope.currentPage = $scope.page;
        $location.path('/movies');


    }
    $scope.prev = function() {

        if ($scope.page - 1 > 0) {
            loadPage(--$scope.page);
            $scope.currentPage = $scope.page;
        }
        $location.path('/movies');


    }

});



myApp.service('PaginationService2', function() {
    var service = {};
    service.currentPageNumber2 = 1;
    service.currentText = null;
    service.setNewPageNumber = function(newPageNumber) {
        service.currentPageNumber2 = newPageNumber;
    };
    service.setNewText = function(newText) {
        service.currentText = newText;
    };
    return service;
});
myApp.controller('showController', function($scope, $state, $stateParams, $http, PaginationService2, $location) {

    $location.path('/shows');
     $scope.currentPage2=PaginationService2.currentPageNumber2;
    $scope.page2 = $scope.currentPage2;


    $scope.currentT = PaginationService2.currentText;
    $scope.searchText2 = $scope.currentT;
    $scope.setPage2 = function(pageNo) {
        $scope.currentPage2 = pageNo;
    };

    $scope.$watch('currentPage2', function() {
        PaginationService2.setNewPageNumber($scope.currentPage2);
    });
    $scope.setPage2(1);
    if ($scope.searchText2 != null && $scope.searchText2 != "")

    {
        var tmp = $scope.searchText2;
        $scope.currentT = $scope.searchText2;

        $http.get('https://api.themoviedb.org/3/search/tv?api_key=6205d4c9b91b07a79aa1d847976c2901&query=' + tmp).then(function(result) {
                $scope.showss = result.data.results;
                
            })
            .catch(function(response) {
                console.error('Error', response.status, response.data);
            })
            .finally(function() {
                console.log("Tv SEARCH successful.");
            });


    };




    $scope.setText = function(text) {
        $scope.currentT = text;
    };

    $scope.$watch('currentT', function() {
        PaginationService2.setNewText($scope.currentT);
    });


    $scope.$on('parent', function(event, data) {
        $scope.setText("");
    });

    $scope.change2 = function(text) {

        var tmp = $scope.searchText2;
        $scope.currentT = $scope.searchText2;
        if ($scope.searchText2.length >= 3) {
            $http.get('https://api.themoviedb.org/3/search/tv?api_key=6205d4c9b91b07a79aa1d847976c2901&query=' + tmp).then(function(result) {
                    $scope.showss = result.data.results;

                }).catch(function(response) {
                    console.error('Error', response.status, response.data);
                })
                .finally(function() {
                    console.log("Tv SEARCH successful.");
                });
        }




    };



    function loadPage2(page) {
        $http.get("https://api.themoviedb.org/3/tv/top_rated", {
                params: {
                    api_key: '6205d4c9b91b07a79aa1d847976c2901',
                    page: page
                }
            })
            .then(function(response) {
                $scope.myVar3 = true;

                $scope.shows = response.data.results;
             
            })
            .catch(function(response) {
                console.error('Error', response.status, response.data);
            })
            .finally(function() {
                console.log("Tv GET successful.");
            });


    };


    loadPage2($scope.page2);




    $scope.open2 = function(id) {
      
        $scope.mov = true;

 $scope.currentPage2 = $scope.page2;
        $scope.movie = id;
        $scope.amer2 = true;
        $scope.myVar4 = !$scope.myVar4;

        $scope.mov = true;
        $scope.$emit('child', 'Some data'); 

    };
    $scope.open3 = function(id) {
       
        $scope.mov = true;

        $scope.movie = id;
        $scope.amer2 = true;
        $scope.myVar4 = !$scope.myVar4;

        $scope.mov = true;
        $scope.$emit('child', 'Some data'); 

    };

    $scope.next2 = function() {
        loadPage2(++$scope.page2);
        $scope.currentPage2 = $scope.page2;
        $location.path('/shows');


    }
    $scope.prev2 = function() {

        if ($scope.page2 - 1 > 0) {
            loadPage2(--$scope.page2);
            $scope.currentPage2 = $scope.page2;
        }
        $location.path('/shows');


    }




});




myApp.controller('showDetailController', function($scope, $state, $stateParams, $http, $location) {


    $scope.amer = true;
    var x = $location.absUrl();
    var y = x.slice(0, 30) + 's';
    $scope.mov = true;
    $scope.reloadRoute = function(path) {
        var x = $location.absUrl();

        var y = x.slice(0, 30) + 's';

        $scope.$emit('child', 'Some data'); 

        $state.reload();

    }


    
    var x = $stateParams.id;

    $http.get("https://api.themoviedb.org/3/tv/" + x, {
            params: {
                api_key: '6205d4c9b91b07a79aa1d847976c2901'

            }
        })
        .then(function(response) {
            $scope.show = response.data;


        })
        .catch(function(response) {
            console.error('Error', response.status, response.data);
        })
        .finally(function() {
            console.log("Tv GET successful.");
        });




});

myApp.controller('movieDetailController', function($scope, $state, $stateParams, $http, $location, $window, PaginationService) {

    $scope.amer = true;
    var x = $location.absUrl();
    var y = x.slice(0, 30) + 's';
    $scope.mov = true;
    $scope.reloadRoute2 = function(path) {
        var x = $location.absUrl();

        var y = x.slice(0, 30) + 's';

        $scope.$emit('child', 'Some data'); 

        $state.reload();

    }

    var page = 1;

    
    var x = $stateParams.id;

    $http.get("https://api.themoviedb.org/3/movie/" + x, {
            params: {
                api_key: '6205d4c9b91b07a79aa1d847976c2901'

            }
        })
        .then(function(response) {


            $scope.movie = response.data;



        })
        .catch(function(response) {
            console.error('Error', response.status, response.data);
        })
        .finally(function() {
            console.log("Movie GET successful.");
        });




});