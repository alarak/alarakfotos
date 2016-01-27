function init() {
  window.init();
}
// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 
var app = angular.module('MobileAngularUiExamples', [
  'ngRoute'
]);

// 
// You can configure ngRoute as always, but to take advantage of SharedState location
// feature (i.e. close sidebar on backbutton) you should setup 'reloadOnSearch: false' 
// in order to avoid unwanted routing.
// 
app.config(function($routeProvider) {
  $routeProvider.when('/',              {templateUrl: 'albumes.html', reloadOnSearch: false});
  $routeProvider.when('/contacto',   {templateUrl: 'contacto.html', reloadOnSearch: false}); 
  $routeProvider.when('/acerca',   {templateUrl: 'acerca.html', reloadOnSearch: false});
  $routeProvider.when('/subir',   {templateUrl: 'subir.html', reloadOnSearch: false});
  $routeProvider.when('/alb',   {templateUrl: 'alb.html', reloadOnSearch: false});
  $routeProvider.when('/login',   {templateUrl: 'login.html', reloadOnSearch: false});
});

//
// For this trivial demo we have just a unique MainController 
// for everything
//
app.controller('MainController', function ($rootScope, $scope, $http, $window) {

    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });
    
    $window.init= function() {
    	  $scope.$apply($scope.load_album_lib());
    	};
    
    $scope.load_album_lib = function() {
    	  gapi.client.load('albumApi', 'v1', function() {
    	    $scope.is_backend_ready = true;
    	    $scope.listAlbums();
    	  }, '/_ah/api');
    	};

    // Fake text i used here and there.
    $scope.lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo, aliquid eaque soluta nihil eligendi adipisci error, illum corrupti nam fuga omnis quod quaerat mollitia expedita impedit dolores ipsam. Obcaecati.';
    $scope.timbresPorEntregar = 0;
    $scope.timbres24Hrs = 0;
    $scope.advertencias = 0;
    $scope.incidencias = 0;
    $scope.discos = "NA";
    $scope.HSM = "NA";
    $scope.resultado = "";
    $scope.consultaPAc = function (pac) {
        $scope.timbresPorEntregar = 0;
        $scope.timbres24Hrs = 0;
        $scope.advertencias = 0;
        $scope.incidencias = 0;
        $scope.discos = "NA";
        $scope.HSM = "NA";
        $scope.resultado = "";
        $rootScope.loading2 = true;
        $http.post('../Monitor.asmx/ObtenerDatosCFDI', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }
                    
                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaPacAzure = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosCFDIAzure', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaPacV4 = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosCFDIV4', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaDiferencias = function (pac) {

                $scope.resultadoDiferencias = null;
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosReloj', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null && data.d != null) {
                        $scope.resultadoDiferencias = data.d;
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

        $scope.consultaPacRetenciones = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosRetenciones', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaPacRetencionesAzure = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosRetencionesAzure', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaPacRetencionesV4 = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosRetencionesV4', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaNomina = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosNomina', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaBridge = function (pac) {
                $scope.timbresPorEntregar = 0;
                $scope.timbres24Hrs = 0;
                $scope.advertencias = 0;
                $scope.incidencias = 0;
                $scope.discos = "NA";
                $scope.HSM = "NA";
                $scope.resultado = "";
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerDatosBridge', '{"pac":"' + pac + '"}').
                success(function (data, status, headers, config) {
                    if (data != null) {
                        $scope.timbresPorEntregar = data.d.TimbresPorEntregar;
                        $scope.timbres24Hrs = data.d.Timbres24Hrs;
                        $scope.advertencias = data.d.TimbresConAdvertencia;
                        $scope.incidencias = data.d.TimbresConIncidencia;
                        $scope.discos = data.d.Discos;
                        $scope.HSM = data.d.HSM;
                        $scope.resultado = "Consulta Exitosa";
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };

            $scope.consultaServicios = function () {
                $scope.resultadoServicios = null;
                $rootScope.loading2 = true;
                $http.post('../Monitor.asmx/ObtenerErroresServicios', '{}').
                success(function (data, status, headers, config) {
                    if (data != null && data.d != null) {
                        $scope.resultadoServicios = data.d;
                        $rootScope.loading2 = false;
                    }
                    else {
                        $scope.resultado = "Error al consultar";
                        $rootScope.loading2 = false;
                    }

                }).
                error(function (data, status, headers, config) {
                    // log error
                    $rootScope.loading2 = false;
                });
            };
    // 
    // 'Scroll' screen
    // 
    var scrollItems = [];

    for (var i = 1; i <= 100; i++) {
        scrollItems.push('Item ' + i);
    }

    $scope.scrollItems = scrollItems;
    
    $scope.listAlbums = function(){
    	gapi.client.albumApi.obtenerAlbumes().execute(function(resp) {
    	    $scope.albums = resp.items;
    	    $scope.$apply();
    	  });
    };
    $scope.deleteAlbum = function(nom){
    	if($window.confirm('Confirmas eliminar?')){
    		message = { "nombre" : nom };
        	gapi.client.albumApi.eliminarAlbum(message).execute(function(){
        		$scope.listAlbums();
        		});
    	}
    	
    }
    
    $scope.newAlbum = function(){    	
    	message = { "nombre" : $scope.txtNombreAlbum};
    	gapi.client.albumApi.nuevoAlbum(message).execute(function(resp){
    		$scope.listAlbums();
    		console.log(resp);
    		});
    }

    $scope.bottomReached = function () {
        alert('Congrats you scrolled to the end of the list!');
    }

    //
    // 'Forms' screen
    //  
    $scope.rememberMe = true;
    $scope.email = 'me@example.com';

    $scope.login = function () {
        alert('You submitted the login form');
    };

    // 
    // 'Drag' screen
    // 
    $scope.notices = [];

    for (var j = 0; j < 10; j++) {
        $scope.notices.push({ icon: 'envelope', message: 'Notice ' + (j + 1) });
    }

    $scope.deleteNotice = function (notice) {
        var index = $scope.notices.indexOf(notice);
        if (index > -1) {
            $scope.notices.splice(index, 1);
        }
    };
    
});