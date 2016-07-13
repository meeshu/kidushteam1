angular.module('Heart.controllers', [])

    .controller('LoginCtrl', function (Backand, $state, $rootScope, LoginService) {
        var login = this;

        function signin() {
            LoginService.signin(login.email, login.password)
                .then(function () {
                    onLogin();
                }, function (error) {
                    console.log(error)
                })
        }

        function anonymousLogin(){
            LoginService.anonymousLogin();
            onLogin();
        }

        function onLogin(){
            $rootScope.$broadcast('authorized');
            $state.go('tab.videos');
        }

        function signout() {
            LoginService.signout()
                .then(function () {
                    //$state.go('tab.login');
                    $rootScope.$broadcast('logout');
                    $state.go($state.current, {}, {reload: true});
                })

        }

        login.signin = signin;
        login.signout = signout;
        login.anonymousLogin = anonymousLogin;
    })

    .controller('VideosCtrl', function (VideosModel, $rootScope, $scope,$state) {
       $scope.videos=[];
        $scope.video=[];
        
        $scope.changeView = function(videoId){
            
            $state.go('details',{'id': videoId});
        }
        function goToBackand() {
            window.location = 'http://docs.backand.com';
        }

        VideosModel.GetAll()
                .then(function (result) {
                    $scope.videos = result;
                    console.log('$scope.videos')
                    console.log($scope.videos);
                });

        $rootScope.$on('authorized', function () {
           
            VideosModel.GetAll()
                .then(function (result) {
                    $scope.videos = result;
                    console.log($scope.videos);
                });
        });

        $rootScope.$on('logout', function () {
            clearData();
        });    

    })

.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}])
.controller('detailsCtrl',function($stateParams,$scope,VideosModel,$sce){
    $scope.video=[];
    
    var videoId = $stateParams.id;
    console.log(VideosModel.GetVideobyId(videoId));     
    $scope.video=VideosModel.GetVideobyId(videoId);   
    
});

