function init() {
	window.init();
}
// 
// Here is how to define your module
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [ 'ngRoute' ]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'albumes.html',
		reloadOnSearch : false
	});
	$routeProvider.when('/contacto', {
		templateUrl : 'contacto.html',
		reloadOnSearch : false
	});
	$routeProvider.when('/acerca', {
		templateUrl : 'acerca.html',
		reloadOnSearch : false
	});
	$routeProvider.when('/subir', {
		templateUrl : 'subir.html',
		reloadOnSearch : false
	});
	$routeProvider.when('/alb', {
		templateUrl : 'alb.html',
		reloadOnSearch : false
	});
	$routeProvider.when('/login', {
		templateUrl : 'login.html',
		reloadOnSearch : false
	});
});

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function($rootScope, $scope, $http, $window) {

	// Needed for the loading screen
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.loading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function() {
		$rootScope.loading = false;
	});

	$window.init = function() {
		$scope.$apply($scope.load_album_lib());
	};

	$scope.load_album_lib = function() {
		gapi.client.load('albumApi', 'v1', function() {
			$scope.is_backend_ready = true;
			$scope.listAlbums();
		}, '/_ah/api');
	};

	$scope.listAlbums = function() {
		gapi.client.albumApi.obtenerAlbumes().execute(function(resp) {
			$scope.albums = resp.items;
			$scope.$apply();
		});
	};
	$scope.deleteAlbum = function(nom) {
		if ($window.confirm('Confirmas eliminar?')) {
			message = {
				"nombre" : nom
			};
			gapi.client.albumApi.eliminarAlbum(message).execute(function() {
				$scope.listAlbums();
			});
		}

	}
	$scope.newAlbum = function() {
		message = {
			"nombre" : $scope.txtNombreAlbum
		};
		gapi.client.albumApi.nuevoAlbum(message).execute(function(resp) {
			$scope.listAlbums();
			console.log(resp);
		});
	}
});

app.controller('AppController', ['$scope', 'FileUploader', function($scope, FileUploader) {
    var uploader = $scope.uploader = new FileUploader({
        url: 'upload.php'
    });

    // FILTERS

    uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
}]);