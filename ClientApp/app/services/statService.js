'use strict';
app.factory('statService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};
    var statAPI = serviceBaseAPI;
    statAPI = "https://fleet.caspianairlines.com/airpocketexternal/";

    var API = $rootScope.apiUrl;
    API = 'https://fleet.caspianairlines.com/fbservicea/api/';
    var _getFlightTimePastMonth = function (cid,m) {

        var deferred = $q.defer();
        $http.get(statAPI + "api/flighttime/crew/past/month/" +cid+"/"+m ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getFlightTimeYear = function (cid, y) {

        var deferred = $q.defer();
        $http.get(statAPI + "api/flighttime/crew/year/" + cid + "/" +y).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //api/ftl/crew/date/    GetAppFTLCrew(DateTime df, int crew)
    var _getFTL = function (cid, df) {

        var deferred = $q.defer();
        $http.get(statAPI + "api/ftl/crew/date/?df=" + df + "&crew=" + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getFTL = _getFTL;

    //api/ftl/crew/date/range/    GetAppFTLCrewRange(DateTime df, DateTime dt, int crew)
    var _getFTLRange = function (cid, df,dt) {

        var deferred = $q.defer();
        $http.get(statAPI + "api/ftl/crew/date/range/?df=" + df +"&dt="+dt+ "&crew=" + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getFTLRange = _getFTLRange;
    //api/ftl/crew/date/range/exceed   public IHttpActionResult GetAppFTLCrewRangeExceed(DateTime? df, DateTime? dt, int crew)
    var _getFTLExceed = function (cid, df, dt) {
        if (!df)
            df = 'null';
        if (!dt)
            dt = 'null';
        var deferred = $q.defer();
        $http.get(statAPI + "api/ftl/crew/date/range/exceed/?df=" + df + "&dt=" + dt + "&crew=" + cid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getFTLExceed = _getFTLExceed;

    var _getFlights = function (qry) {

        var deferred = $q.defer();
        $http.get(API + "crew/flights/query?"+qry).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getFlights = _getFlights;

    var _runQuery = function (qry) {

        var deferred = $q.defer();
        $http.get(API + "crew/flights/query?" + qry).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.runQuery = _runQuery;


    serviceFactory.getFlightTimePastMonth = _getFlightTimePastMonth;
    serviceFactory.getFlightTimeYear = _getFlightTimeYear;

    return serviceFactory;

}]);