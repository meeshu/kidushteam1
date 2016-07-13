angular.module('Heart.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })

    .service('VideosModel', function ($http, Backand) {
         var service = this,
      baseUrl = '/1/objects/',
      objectName = 'videos/';
        var videos = []; 

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

       
         return {
        GetAll: function(){ 
            return $http.get(getUrl()).then(function(response){
                videos = response.data.data;
                console.log('getall');
                console.log(videos);
                return response.data.data;
            });
        },
        GetVideobyId: function(videoId){
            console.log('getid');
            console.log(videos.length);
            for(i=0;i<videos.length;i++){
                console.log('pitb');
                if(videos[i].id == videoId){
                    console.log('pitb');
                    return videos[i];
                    }
                }
            }
         }
        //service.all = function () {
           // console.log($http.get(getUrl()));
          //  return $http.get(getUrl());
      //  };

       // service.fetch = function (id) {
      //      console.log('Inside s');
           // console.log($http.get(getUrlForId(id)).data);
        //    return $http.get(getUrlForId(id));
            
        //};  
    })

    .service('LoginService', function (Backand) {
        var service = this;

        service.signin = function (email, password, appName) {
            //call Backand for sign in
            return Backand.signin(email, password);
        };

        service.anonymousLogin= function(){
            // don't have to do anything here,
            // because we set app token att app.js
        }

        service.signout = function () {
            return Backand.signout();
        };
    });
