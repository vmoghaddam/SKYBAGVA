'use strict';
app.factory('mbService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};

    var _calLoadSheet = function (entity, flightId) {
        var deferred = $q.defer();

        $http.post(mbService + 'save/loadsheet/' + entity.FlightId, entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getLimitation = function (registerId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'get/limitation/'+ registerId).then(function (response)
        {
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
        entity.IsSynced = 1;
        console.log(entity);
       // entity.DateUpdate = momentUtcNowString();
        db.Put('Loadsheet', entity.FlightId, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {

                _checkInternet(function (st) {
                    if (st) {
                        entity.OccurrenceDate = moment(new Date(entity.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        //$http.post($rootScope.apiUrl + 'save/loadsheet/' + entity.FlightId, entity).then(function (response) {
                        //    if (response.data.IsSuccess) {
                        //        //deferred.resolve(response.data);
                        //        var item = response.data.Data;
                        //        item.IsSynced = 1;
                        //        db.Delete('Loadsheet', pk, function () {
                        //            db.Put('Loadsheet', item.FlightId, item, function (dbitem) {
                        //                deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                        //            });
                        //        });

                        //    }
                        //    else
                        //        deferred.resolve(response.data);

                        //}, function (err, status) {

                        //    deferred.reject(Exceptions.getMessage(err));
                        //});
                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        row.IsSynced = 0;
                        db.deSyncedItem('Loadsheet', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });


            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('Loadsheet', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;


    };



    serviceFactory.calLoadSheet = _calLoadSheet;
    serviceFactory.getLimitation = _getLimitation;
    serviceFactory.getLoadsheet = _getLoadsheet;
    serviceFactory.saveLoadsheet = _saveLoadsheet;

    return serviceFactory;

}]);