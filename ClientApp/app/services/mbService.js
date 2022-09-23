'use strict';
app.factory('mbService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    var internetUrl = "https://api.sbvaresh.ir/api/online";

    var _checkInternet = function (callback) {

        var config = {
            method: "GET",
            url: internetUrl,


            timeout: 7 * 1000
        };

        //var deferred = $q.defer();
        $http(config).then(function (response) {
            callback(true);
        }, function (err, status) {

            callback(false);
        });

        //return deferred.promise;
    };



    //var _calLoadSheet = function (entity) {
    //    var deferred = $q.defer();

    //    $http.post($rootScope.apiUrl + 'save/loadsheet/' + entity.FlightId, entity).then(function (response) {
    //        deferred.resolve(response.data);
    //    }, function (err, status) {

    //        deferred.reject(Exceptions.getMessage(err));
    //    });

    //    return deferred.promise;
    //};



    var _getLocalLoadSheet = function (flightId) {

        var deferred = $q.defer();
        db.GetLoadsheet(flightId).then(function (flt) {
            var data = {};
            data.IsSuccess = 0;
            if (flt)
                data.IsSuccess = 1;
            data.Data = flt;

            deferred.resolve(data);
        });


        return deferred.promise;
    };

    var _getLimitation = function (registerId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'get/limitation/' + registerId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }

    var _getLoadsheet = function (flightId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'get/loadsheet/' + flightId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            deferred.reject(Exceptions.getMessage(err));
        })

        return deferred.promise;
    }


    var _saveLoadsheet = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
            if ($rootScope.getOnlineStatus()) {

                _checkInternet(function (st) {
                    if (st) {
                        $http.post($rootScope.apiUrl + 'save/loadsheet/' + entity.FlightId, entity).then(function (response) {
                            if (response.data.Result.IsSuccess) {
                                var item = response.data.Result.Data;
                                db.Put('Loadsheet', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                        console.log('dbitem', dbitem);
                                    });
                                
                            }
                            else
                                deferred.resolve(response.data);

                        }, function (err, status) {

                            deferred.reject(Exceptions.getMessage(err));
                        });
                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        //db.deSyncedItem('Loadsheet', entity.FlightId, function () {
                        //    deferred.resolve({ Data: row, IsSuccess: 1 });
                        //});
                    }
                });


            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('Loadsheet', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        
        return deferred.promise;


    };



    //serviceFactory.calLoadSheet = _calLoadSheet;
    serviceFactory.getLimitation = _getLimitation;
    serviceFactory.getLoadsheet = _getLoadsheet;
    serviceFactory.saveLoadsheet = _saveLoadsheet;
    serviceFactory.getLocalLoadSheet = _getLocalLoadSheet;

    return serviceFactory;

}]);