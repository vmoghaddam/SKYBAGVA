﻿'use strict';
app.factory('flightService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {
    var serviceFactory = {};


    var ShowNotify2 = function (str, t) {
        //'info' | 'warning' | 'error' | 'success' | 'custom'
        DevExpress.ui.notify({
            message: str,
            position: {
                my: "center bottom",
                at: "center bottom"
            }, 
            type: t,
            displayTime: 5000,
        });
    };
    var internetUrl = "https://api.sbvaresh.ir/api/online";
   // var internetUrl = "https://localhost:5001/api/online";
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

    var _checkInternetloop = function (callback) {

        var config = {
            method: "GET",
            url: internetUrl,


            timeout: 3 * 1000
        };

        //var deferred = $q.defer();
        $http(config).then(function (response) {
            callback(true);
        }, function (err, status) {

            callback(false);
        });

        //return deferred.promise;
    };
    serviceFactory.checkInternetloop = _checkInternetloop;
    //"odata/fdp/crew/dates"
    var _getCrewFDPs = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/fdp/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsDuties = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/duties/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsFlights = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/flights/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDPsFTL = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/ftl/crew/dates/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFDP = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/fdp/crew/single/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getCrewFlights = function (id, df, dt) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/flights/app/' + id + '?from=' + _df + '&to=' + _dt).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //[Route("odata/crew/flights/crew/fdp/{crewid}/{fdpid}")]
    var _getCrewFlightsByFDP = function (cid, fid) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/flights/crew/fdp/' + cid + '/' + fid).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFlightsReport = function (id, df, dt, airline, fromapt, toapt, status) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        //public async Task<IHttpActionResult> GetCrewFlightsReportApp2(DateTime from, DateTime to, int id,int? airline=null,int? status=null,int? fromAirport=null,int? toAirport=null)
        var deferred = $q.defer();
        var url = serviceBase + 'odata/crew/report/flights/app2/' + id + '?from=' + _df + '&to=' + _dt;
        if (airline)
            url += '&airline=' + airline;
        if (status)
            url += '&status=' + status;
        if (fromapt)
            url += '&fromAirport=' + fromapt;
        if (toapt)
            url += '&toAirport=' + toapt;
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewFlightsGrouped = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/crew/report/flights/app/grouped/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getFlightCrews = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/flight/crews/new/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/create', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveDuty = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/duty/create', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _addFlightToFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/add', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateCPFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/update', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightFDPDirect = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/update/direct', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _removeFlightFromFDP = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/remove', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _updateFlightStatus = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/flight/status', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _updateFDPTimes = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/cp/fdp/rt', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getFlight = function (id) {
        var offset = -1 * (new Date()).getTimezoneOffset();
        var url = serviceBase + 'odata/cp/flight/' + id + '/' + offset;

        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _getSun = function () {
        var offset = -1 * (new Date()).getTimezoneOffset();
        var url = 'https://api.sunrise-sunset.org/json?lat=35.715298&lng=51.404343';

        var deferred = $q.defer();
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _getSunFlight = function (df, dt, fid, tid) {
        var _df = moment(df).format('YYYY-MM-DDTHH:mm:ss');
        var _dt = moment(dt).format('YYYY-MM-DDTHH:mm:ss');
        //public async Task<IHttpActionResult> GetCrewFlightsReportApp2(DateTime from, DateTime to, int id,int? airline=null,int? status=null,int? fromAirport=null,int? toAirport=null)
        var deferred = $q.defer();
        var url = serviceBase + 'odata/time/sunflight/' + '?dep=' + _df + '&arr=' + _dt + '&fid=' + fid + '&tid=' + tid;
        //public async Task<IHttpActionResult> GetSunFlight (DateTime dep, DateTime arr,string fid,string tid)
        $http.get(url).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    ///////////////////////////////

    var _epGetCrewFlights = function (df, dt) {
        //mool
         
        var deferred = $q.defer();
        if ($rootScope.online) {
            _checkInternet(function (st) {
                if (st) {
                    //if ($rootScope.employeeId == 3529) {
                    //    alert('dates');
                    //    alert(df);
                    //    alert(dt);
                    //}
                    $http.get($rootScope.apiUrl + 'crew/flights/' + df + '/' + dt /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                         
                       
                        if ($rootScope.isServerMode)
                            deferred.resolve(response.data);
                        else if (response.data.IsSuccess) {
                            //if ($rootScope.employeeId == 3529) {
                            //    alert('flt count');
                            //    alert(response.data.Data.length);

                            //}
                            db.sync.SyncAppCrewFlightsByDateRange(df, dt, response.data.Data, function (syncResult) {

                                 
                                deferred.resolve(syncResult);
                            });
                        }
                        // deferred.resolve(response.data);



                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    ShowNotify2("The application cannot connect to the Server. Please check your internet connection.", 'error');
                    db.GetAppCrewFlightsByDates(df, dt, function (results) {

                        var response = {};
                        response.Data = results;
                        response.IsSuccess = 1;
                        console.log('fetch offline-flights', response);
                        deferred.resolve(response);
                    });
                }
            });

        }
        else if (!$rootScope.isServerMode) {
            db.GetAppCrewFlightsByDates(df, dt, function (results) {

                var response = {};
                response.Data = results;
                response.IsSuccess = 1;
                console.log('fetch offline-flights', response);
                deferred.resolve(response);
            });
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }


        return deferred.promise;





    };

    var _epGetCrewCalendar = function (cid, from, to) {

        var deferred = $q.defer();
        if ($rootScope.online) {
            $http.get($rootScope.apiUrl + 'crew/calendar/' + cid + '/' + from + '/' + to /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                //alert('y');

                if ($rootScope.isServerMode)
                    deferred.resolve(response.data);
                else if (response.data.IsSuccess)
                    db.sync.SyncCalendar(from, to, response.data.Data, function (syncResult) {

                        deferred.resolve(syncResult);
                    });



            }, function (err, status) {

                deferred.reject(Exceptions.getMessage(err));
            });
        }
        else if (!$rootScope.isServerMode) {
            db.GetCalendar(from, to, function (results) {
                console.log('fetch offline');
                var response = {};
                response.Data = results;
                response.IsSuccess = 1;
                deferred.resolve(response);
            });
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }


        return deferred.promise;





    };

    var _epGetCrewDuties = function (cid, from, to) {

        var deferred = $q.defer();
        if ($rootScope.online) {
            _checkInternet(function (st) {
                if (st) {
                    $http.get($rootScope.apiUrl + 'crew/duties/' + cid + '/' + from + '/' + to + '/1' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                        //alert('y');

                        if ($rootScope.isServerMode)
                            deferred.resolve(response.data);
                        else if (response.data.IsSuccess)
                            db.sync.SyncDuties(from, to, response.data.Data, function (syncResult) {

                                deferred.resolve(syncResult);
                            });



                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    db.GetDuties(from, to, function (results) {

                        var response = {};
                        response.Data = results;
                        response.IsSuccess = 1;
                        deferred.resolve(response);
                    });
                }
            });

        }
        else if (!$rootScope.isServerMode) {
            db.GetDuties(from, to, function (results) {

                var response = {};
                response.Data = results;
                response.IsSuccess = 1;
                deferred.resolve(response);
            });
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }


        return deferred.promise;





    };

    var _epGetFlightCommanders = function (flightId) {
        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'flight/commanders/' + flightId).then(function (response) {

            deferred.resolve(response.data);


        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });
        return deferred.promise;
    };
    var _epGetFlightCrews = function (flightId) {
        //db.sync.SyncFlightCrews
        var deferred = $q.defer();
        //$http.get($rootScope.apiUrl + 'flight/crews/' + flightId ).then(function (response) {
        //    deferred.resolve(response.data);
        //}, function (err, status) {

        //    deferred.reject(Exceptions.getMessage(err));
        //});

        if ($rootScope.online) {
            _checkInternet(function (st) {
                if (st) {
                    $http.get($rootScope.apiUrl + 'flight/crews/' + flightId).then(function (response) {
                        if ($rootScope.isServerMode)
                            deferred.resolve(response.data);
                        else if (response.data.IsSuccess)
                            db.sync.SyncFlightCrews(flightId, response.data.Data, function (syncResult) {

                                deferred.resolve(syncResult);
                            });



                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    db.GetFlightCrews(flightId, function (results) {

                        var response = {};
                        response.Data = results;
                        response.IsSuccess = 1;
                        deferred.resolve(response);
                    });
                }

            });

        }
        else if (!$rootScope.isServerMode) {
            db.GetFlightCrews(flightId, function (results) {

                var response = {};
                response.Data = results;
                response.IsSuccess = 1;
                deferred.resolve(response);
            });
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }

        return deferred.promise;
    };

    var _epGetFlight = function (flightId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _epGetFlightLocal = function (flightId) {

        var deferred = $q.defer();
        db.GetAppFlightCrew(flightId).then(function (flt) {
            var data = {};
            data.IsSuccess = 0;
            if (flt)
                data.IsSuccess = 1;
            data.Data = flt;

            deferred.resolve(data);
        });


        return deferred.promise;
    };

    var _calculateFlight = function (flt) {
        flt.BlockTime = null;
        flt.FlightTime = null;
        flt.DelayBlockOff = null;
        if (flt.BlockOff && flt.BlockOn)
            flt.BlockTime = getMinutesDiff(flt.BlockOff, flt.BlockOn);
        if (flt.TakeOff && flt.Landing)
            flt.FlightTime = getMinutesDiff(flt.TakeOff, flt.Landing);
        if (flt.BlockOff)
            flt.DelayBlockOff = getMinutesDiff(flt.STD, flt.BlockOff);

    };
    var _epGetFlightDelays = function (flightId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'flight/delays/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };


    var _epSaveLogOverwriteServer = function (entity) {
        var deferred = $q.defer();
        var changes = {

            JLDate: momentFromatLocalUTC(entity.JLDate),
            JLUserId: $rootScope.employeeId,
            IsSynced: 1,
        };
        if ($rootScope.getOnlineStatus()) {
            $http.post($rootScope.apiUrl + 'flight/log/save', entity).then(function (response) {
                changes.JLDate = momentFromatLocalUTC(response.data.Data);
                // alert(entity.FlightId);

                db.Update('AppCrewFlights', entity.FlightId, changes, function (row2) {
                    deferred.resolve({ Data: row2, IsSuccess: 1 });
                });

            }, function (err, status) {
                deferred.resolve({ Data: err, IsSuccess: 0 });

            });
        }
        else {
            deferred.resolve({ Data: 'Operation Failed. Check your Network Connection.', IsSuccess: 0 });
        }

        return deferred.promise;


    };
    var _signDoc = function (entity) {
        var deferred = $q.defer();

        $http.post($rootScope.apiUrl + 'flight/sign', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _signDocJL = function (entity) {
        var deferred = $q.defer();

        $http.post($rootScope.apiUrl + 'flight/sign/jl', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _signDocLocal = function (entity, doc) {
        var deferred = $q.defer();
        var table = '';
        var fid = entity.FlightId;
        switch (doc) {
            case 'log':
                table = 'AppCrewFlights';
                fid = entity.ID;
                break;
            case 'vr':
                table = 'VR';
                break;
            case 'dr':
                table = 'DR';
                break;
            case 'asr':
                table = 'ASR';
                break;
            case 'ofp':
                table = 'OFP';
                break;
            //tolnd
            case 'tolnd':
                table = 'TOLND';
            default:
                deferred.reject('wrong document type');
                return;
        }
        var _db = db.getDb();
        _db[table]
            .filter(function (rec) {

                return rec.FlightId == fid
            }).first(function (item) {
                if (!item) {
                    deferred.reject('no record found');
                    return;
                }
                 
                item.PICId = entity.PICId;
                item.PIC = entity.PIC;
                item.JLSignedBy = entity.JLSignedBy;
                item.JLDatePICApproved = entity.JLDatePICApproved;
                _db[table].put(item).then(
                    function (suc) { deferred.resolve(suc); },
                    function (err) { deferred.reject('update failed'); }
                );

            });



        return deferred.promise;
    };
   
  

    var _signDocLocalJL = function (entity, doc) {
        var deferred = $q.defer();
        var table = '';
        var fid = entity.ID;

        var _db = db.getDb();
        _db["AppCrewFlights"]
            .filter(function (rec) {

                return fid.indexOf(rec.FlightId) != -1;
            }).toArray(function (items) {

                if (!items || items.length == 0) {
                    deferred.reject('no record found');
                    return;
                }
                $.each(items, function (_i, item) {
                    item.PICId = entity.PICId;
                    item.PIC = entity.PIC;
                    item.JLSignedBy = entity.JLSignedBy;
                    item.JLDatePICApproved = entity.JLDatePICApproved;
                });


                _db["AppCrewFlights"].bulkPut(items).then(
                    function (suc) { deferred.resolve(suc); },
                    function (err) { deferred.reject('update failed'); }
                );

            });



        return deferred.promise;
    };


    var _epSaveLog = function (entity) {
        var deferred = $q.defer();
        var changes = {
            //BlockOff: toIsoDateTime(entity.BlockOff),
            //BlockOn: toIsoDateTime(entity.BlockOn),
            //TakeOff: toIsoDateTime(entity.TakeOff),
            //Landing: toIsoDateTime(entity.Landing),
            BlockOff: momentFromatLocalUTC(entity.BlockOffDate),
            BlockOn: momentFromatLocalUTC(entity.BlockOnDate),
            TakeOff: momentFromatLocalUTC(entity.TakeOffDate),
            Landing: momentFromatLocalUTC(entity.LandingDate),

            FuelRemaining: entity.FuelRemaining,
            FuelUplift: entity.FuelUplift,
            FuelUsed: entity.FuelUsed,
            FuelDensity: entity.FuelDensity,
            FuelTotal: entity.FuelTotal,

            PaxAdult: entity.PaxAdult,
            PaxChild: entity.PaxChild,
            PaxInfant: entity.PaxInfant,
            PaxTotal: entity.PaxTotal,

            BaggageWeight: entity.BaggageWeight,
            CargoWeight: entity.CargoWeight,

            SerialNo: entity.SerialNo,
            LTR: entity.LTR,
            PF: entity.PF,

            RVSM_GND_CPT: entity.RVSM_GND_CPT,
            RVSM_GND_STBY: entity.RVSM_GND_STBY,
            RVSM_GND_FO: entity.RVSM_GND_FO,

            RVSM_FLT_CPT: entity.RVSM_FLT_CPT,
            RVSM_FLT_STBY: entity.RVSM_FLT_STBY,
            RVSM_FLT_FO: entity.RVSM_FLT_FO,

            CommanderNote: entity.CommanderNote,

            AttRepositioning1: entity.AttRepositioning1,
            AttRepositioning2: entity.AttRepositioning2,

            Version: entity.Version,
            JLDate: momentFromatLocalUTC(entity.JLDate),

            DelayBlockOff: entity.DelayBlockOff,
            BlockTime: entity.BlockTime,
            FlightTime: entity.FlightTime,
            IsSynced: 1,

            JLUserId: $rootScope.employeeId,
        };
        //var row = db.Update('AppCrewFlights', entity.FlightId, changes, function () { });
        //console.log('row',row);
        db.Update('AppCrewFlights', entity.FlightId, changes, function (row) {
            // _calculateFlight(row);

            if ($rootScope.getOnlineStatus() && entity.Server) {
                $http.post($rootScope.apiUrl + 'flight/log/save', entity).then(function (response) {

                    var dateChanges = { JLDate: momentFromatLocalUTC(response.data.Data) };
                    db.Update('AppCrewFlights', entity.FlightId, dateChanges, function (row2) {
                        deferred.resolve({ Data: row2, IsSuccess: 1 });
                    });

                }, function (err, status) {
                    //desynced
                    row.IsSynced = 0;
                    db.deSyncedItem('AppCrewFlights', entity.FlightId, function () {
                        deferred.resolve({ Data: row, IsSuccess: 1 });
                    });

                });
            }
            else {
                //desynced
                row.IsSynced = 0;
                db.deSyncedItem('AppCrewFlights', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });

            }
        });





        return deferred.promise;
    };


    //nool2
    var _epSaveLogNew = function (entity) {
        var deferred = $q.defer();
        //var changes = {

        //    BlockOff: momentFromatLocalUTC(entity.BlockOffDate),

        //    BlockOn: momentFromatLocalUTC(entity.BlockOnDate),
        //    TakeOff: momentFromatLocalUTC(entity.TakeOffDate),
        //    Landing: momentFromatLocalUTC(entity.LandingDate),

        //    FuelRemaining: entity.FuelRemaining,
        //    FuelUplift: entity.FuelUplift,
        //    FuelUsed: entity.FuelUsed,
        //    FuelDensity: entity.FuelDensity,
        //    FuelTotal: entity.FuelTotal,

        //    PaxAdult: entity.PaxAdult,
        //    PaxChild: entity.PaxChild,
        //    PaxInfant: entity.PaxInfant,
        //    PaxTotal: entity.PaxTotal,

        //    BaggageWeight: entity.BaggageWeight,
        //    CargoWeight: entity.CargoWeight,

        //    SerialNo: entity.SerialNo,
        //    LTR: entity.LTR,
        //    PF: entity.PF,

        //    RVSM_GND_CPT: entity.RVSM_GND_CPT,
        //    RVSM_GND_STBY: entity.RVSM_GND_STBY,
        //    RVSM_GND_FO: entity.RVSM_GND_FO,

        //    RVSM_FLT_CPT: entity.RVSM_FLT_CPT,
        //    RVSM_FLT_STBY: entity.RVSM_FLT_STBY,
        //    RVSM_FLT_FO: entity.RVSM_FLT_FO,

        //    CommanderNote: entity.CommanderNote,

        //    AttRepositioning1: entity.AttRepositioning1,
        //    AttRepositioning2: entity.AttRepositioning2,

        //    Version: entity.Version,
        //    JLDate: momentFromatLocalUTC(entity.JLDate),

        //    DelayBlockOff: entity.DelayBlockOff,
        //    BlockTime: entity.BlockTime,
        //    FlightTime: entity.FlightTime,
        //    IsSynced: 1,

        //    JLUserId: $rootScope.employeeId,
        //};
        var changes = {

            FuelTotal: entity.FuelTotal,

            PaxTotal: entity.PaxTotal,


            Version: entity.Version,
            JLDate: momentFromatLocalUTC(entity.JLDate),

            DelayBlockOff: entity.DelayBlockOff,
            BlockTime: entity.BlockTime,
            FlightTime: entity.FlightTime,
            IsSynced: 1,

            JLUserId: $rootScope.employeeId,
        };
        if (entity.BlockOffDateDt) {
            //goodi
            var boffdt = momentFromatLocalUTCObj(entity.BlockOffDate);
            if (boffdt.result) {
                changes.BlockOff = boffdt.result;
            }
            else {
                changes.BlockOff = null;
                alert('Error in converting BLOCKOFF date. Please report the error value to the application administrator. ERROR VALUE: (fservice) ' + boffdt.err);
            }

            if (!changes.BlockOff) {
                entity.BlockOffDate = null;
            }
            changes.BlockOffDateDt = entity.BlockOffDateDt;
        }

        if (entity.BlockOnDateDt) {
            var boffdt = momentFromatLocalUTCObj(entity.BlockOnDate);
            if (boffdt.result) {
                changes.BlockOn = boffdt.result;
            }
            else {
                changes.BlockOn = null;
                alert('Error in converting BLOCKON date. Please report the error value to the application administrator. ERROR VALUE: (fservice) ' + boffdt.err);
            }

            if (!changes.BlockOn) {
                entity.BlockOnDate = null;
            }
            changes.BlockOnDateDt = entity.BlockOnDateDt;



            //changes.BlockOn = momentFromatLocalUTC(entity.BlockOnDate);
            //if (!changes.BlockOn) {
            //    entity.BlockOnDate = null;
            //}
            //changes.BlockOnDateDt = entity.BlockOnDateDt;
        }

        if (entity.TakeOffDateDt) {
            var boffdt = momentFromatLocalUTCObj(entity.TakeOffDate);
            if (boffdt.result) {
                changes.TakeOff = boffdt.result;
            }
            else {
                changes.TakeOff = null;
                alert('Error in converting TAKEOFF date. Please report the error value to the application administrator. ERROR VALUE: (fservice) ' + boffdt.err);
            }

            if (!changes.TakeOff) {
                entity.TakeOffDate = null;
            }
            changes.TakeOffDateDt = entity.TakeOffDateDt;



            //changes.TakeOff = momentFromatLocalUTC(entity.TakeOffDate);
            //if (!changes.TakeOff) {
            //    entity.TakeOffDate = null;
            //}
            //changes.TakeOffDateDt = entity.TakeOffDateDt;
        }

        if (entity.LandingDateDt) {
            var boffdt = momentFromatLocalUTCObj(entity.LandingDate);
            if (boffdt.result) {
                changes.Landing = boffdt.result;
            }
            else {
                changes.Landing = null;
                alert('Error in converting LANDING date. Please report the error value to the application administrator. ERROR VALUE: (fservice) ' + boffdt.err);
            }

            if (!changes.Landing) {
                entity.LandingDate = null;
            }
            changes.LandingDateDt = entity.LandingDateDt;


            //changes.Landing = momentFromatLocalUTC(entity.LandingDate);
            //if (!changes.Landing) {
            //    entity.LandingDate = null;
            //}
            //changes.LandingDateDt = entity.LandingDateDt;
        }

        if (entity.FuelRemainingDt) {
            changes.FuelRemaining = entity.FuelRemaining;
            changes.FuelRemainingDt = entity.FuelRemainingDt;
        }

        if (entity.FuelUpliftDt) {
            changes.FuelUplift = entity.FuelUplift;
            changes.FuelUpliftDt = entity.FuelUpliftDt;
        }

        if (entity.FuelUsedDt) {
            changes.FuelUsed = entity.FuelUsed;
            changes.FuelUsedDt = entity.FuelUsedDt;
        }

        if (entity.FuelDensityDt) {
            changes.FuelDensity = entity.FuelDensity;
            changes.FuelDensityDt = entity.FuelDensityDt;
        }


        if (entity.PaxAdultDt) {
            changes.PaxAdult = entity.PaxAdult;
            changes.PaxAdultDt = entity.PaxAdultDt;
        }

        if (entity.PaxChildDt) {
            changes.PaxChild = entity.PaxChild;
            changes.PaxChildDt = entity.PaxChildDt;
        }

        if (entity.PaxInfantDt) {
            changes.PaxInfant = entity.PaxInfant;
            changes.PaxInfantDt = entity.PaxInfantDt;
        }


        if (entity.BaggageWeightDt) {
            changes.BaggageWeight = entity.BaggageWeight;
            changes.BaggageWeightDt = entity.BaggageWeightDt;
        }
        if (entity.CargoWeightDt) {
            changes.CargoWeight = entity.CargoWeight;
            changes.CargoWeightDt = entity.CargoWeightDt;
        }

        if (entity.SerialNoDt) {
            changes.SerialNo = entity.SerialNo;
            changes.SerialNoDt = entity.SerialNoDt;
        }
        if (entity.LTRDt) {
            changes.LTR = entity.LTR;
            changes.LTRDt = entity.LTRDt;
        }
        if (entity.PFDt) {
            changes.PF = entity.PF;
            changes.PFDt = entity.PFDt;
        }

        if (entity.RVSM_GND_CPTDt) {
            changes.RVSM_GND_CPT = entity.RVSM_GND_CPT;
            changes.RVSM_GND_CPTDt = entity.RVSM_GND_CPTDt;
        }

        if (entity.RVSM_GND_STBYDt) {
            changes.RVSM_GND_STBY = entity.RVSM_GND_STBY;
            changes.RVSM_GND_STBYDt = entity.RVSM_GND_STBYDt;
        }
        if (entity.RVSM_GND_FODt) {
            changes.RVSM_GND_FO = entity.RVSM_GND_FO;
            changes.RVSM_GND_FODt = entity.RVSM_GND_FODt;
        }

        if (entity.RVSM_FLT_CPTDt) {
            changes.RVSM_FLT_CPT = entity.RVSM_FLT_CPT;
            changes.RVSM_FLT_CPTDt = entity.RVSM_FLT_CPTDt;
        }

        if (entity.RVSM_FLT_STBYDt) {
            changes.RVSM_FLT_STBY = entity.RVSM_FLT_STBY;
            changes.RVSM_FLT_STBYDt = entity.RVSM_FLT_STBYDt;
        }
        if (entity.RVSM_FLT_FODt) {
            changes.RVSM_FLT_FO = entity.RVSM_FLT_FO;
            changes.RVSM_FLT_FODt = entity.RVSM_FLT_FODt;
        }

        if (entity.CommanderNoteDt) {
            changes.CommanderNote = entity.CommanderNote;
            changes.CommanderNoteDt = entity.CommanderNoteDt;
        }

        if (entity.AttRepositioning1Dt) {
            changes.AttRepositioning1 = entity.AttRepositioning1;
            changes.AttRepositioning1Dt = entity.AttRepositioning1Dt;
        }
        if (entity.AttRepositioning2Dt) {
            changes.AttRepositioning2 = entity.AttRepositioning2;
            changes.AttRepositioning2Dt = entity.AttRepositioning2Dt;
        }

      
         

        db.Update('AppCrewFlights', entity.FlightId, changes, function (row) {
             

            if ($rootScope.getOnlineStatus() && entity.Server) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.post($rootScope.apiUrl + 'flight/log/save2', entity).then(function (response) {
                            //alert('ok');
                            var _flt = response.data.Data.flight;
                            _flt.JLDate = momentFromatLocalUTC(_flt.JLDate);
                            _flt.IsSynced = 1;
                            _flt.JLUserId = $rootScope.employeeId; 
                            db.Put('AppCrewFlights', entity.FlightId, _flt, function (row2) { deferred.resolve({ Data: row2, IsSuccess: 1 }); });
                            //db.Update('AppCrewFlights', entity.FlightId, dateChanges, function (row2) {
                            //    deferred.resolve({ Data: row2, IsSuccess: 1 });
                            //});


                        }, function (err, status) {

                            //desynced
                            ShowNotify2("The application cannot connect to the Server. Please check your internet connection.", 'error');
                            row.IsSynced = 0;
                            db.deSyncedItem('AppCrewFlights', entity.FlightId, function () {
                                try {
                                    db.AddErrorLog($rootScope.employeeId, '_epSaveLogNew', 'online', function (_eres) { });
                                }
                                catch (e) {
                                }
                                deferred.resolve({ Data: row, IsSuccess: 1 });
                            });

                        });
                    }
                    else {
                        ShowNotify2("The application cannot connect to the Server. Please check your internet connection.", 'error');
                        row.IsSynced = 0;
                        db.deSyncedItem('AppCrewFlights', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });

            }
            else {
                //desynced
                row.IsSynced = 0;
                db.deSyncedItem('AppCrewFlights', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });

            }
        });





        return deferred.promise;
    };

    var _epSyncFlight = function (entity) {

        entity.IsSynced = 1;
        var deferred = $q.defer();
        entity.JLDate = momentFromatLocalUTC(entity.JLDate);
        db.sync.SyncCrewFlight(entity, function (row) {
            deferred.resolve({ Data: row, IsSuccess: 1 });
        });
        return deferred.promise;
    };

    var _updateTAFs = function (fdpId) {
        var deferred = $q.defer();
        $http.get($rootScope.apiUrlExt + 'weather/taf/adds/archive/FDP/' + fdpId).then(function (response) {
            if (!response.data.IsSuccess) { deferred.reject("TAF ERROR"); alert('error2'); }
            db.sync.SyncTAF(fdpId, response.data.Data, function (dbData) {
                deferred.resolve(dbData);
            });

        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });
        return deferred.promise;
    };
    var _updateMETARs = function (fdpId) {
        var deferred = $q.defer();
        $http.get($rootScope.apiUrlExt + 'weather/metar/adds/archive/FDP/' + fdpId).then(function (response) {
            if (!response.data.IsSuccess)
                deferred.reject("METAR ERROR");
            db.sync.SyncMETAR(fdpId, response.data.Data, function (dbData) {
                deferred.resolve(dbData);
            });

        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });
        return deferred.promise;
    };
    var _updateNOTAMs = function (fdpId) {
        var deferred = $q.defer();
        $http.get($rootScope.apiUrlExt + 'airport/notam/archive/FDP/' + fdpId).then(function (response) {
            if (!response.data.IsSuccess)
                deferred.reject("NOTAM ERROR");
            db.sync.SyncNOTAM(fdpId, response.data.Data, function (dbData) {
                deferred.resolve(dbData);
            });

        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });
        return deferred.promise;
    };
    var _getTAFs = function (fdpId, flag) {
        var deferred = $q.defer();
        db.GetTAFs(fdpId, function (data) {

            var result = { IsSuccess: 1, Data: data };
            if ((!data || data.length == 0) && flag) {
                result.IsSuccess = 0;

                if ($rootScope.getOnlineStatus()) {
                    $http.get($rootScope.apiUrlExt + 'weather/taf/adds/archive/FDP/' + fdpId).then(function (response) {
                        if (!response.data.IsSuccess) { deferred.reject("TAF ERROR"); alert('error2'); }
                        db.sync.SyncTAF(fdpId, response.data.Data, function (dbData) {
                            deferred.resolve(dbData);
                        });

                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else
                    deferred.resolve(result);



            }
            else {

                deferred.resolve(result);
            }

        });
        return deferred.promise;

    };


    var _getMETARs = function (fdpId, flag) {
        var deferred = $q.defer();
        db.GetMETARs(fdpId, function (data) {
            var result = { IsSuccess: 1, Data: data };
            if ((!data || data.length == 0) && flag) {
                result.IsSuccess = 0;

                if ($rootScope.getOnlineStatus()) {
                    $http.get($rootScope.apiUrlExt + 'weather/metar/adds/archive/FDP/' + fdpId).then(function (response) {
                        if (!response.data.IsSuccess)
                            deferred.reject("METAR ERROR");
                        db.sync.SyncMETAR(fdpId, response.data.Data, function (dbData) {
                            deferred.resolve(dbData);
                        });

                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else
                    deferred.resolve(result);


            }
            else {

                deferred.resolve(result);
            }

        });
        return deferred.promise;
        //var deferred = $q.defer();
        //$http.get($rootScope.apiUrl + 'weather/metar/adds/FDP/' + fdpId).then(function (response) {
        //    if (!response.data.IsSuccess)
        //        deferred.reject("METAR ERROR");
        //    db.sync.SyncMETAR(fdpId, response.data.Data, function (dbData) {
        //        deferred.resolve(dbData);
        //    });

        //}, function (err, status) {

        //    deferred.reject(Exceptions.getMessage(err));
        //});

        //return deferred.promise;
    };


    var _getNOTAMs = function (fdpId, flag) {
        var deferred = $q.defer();
        db.GetNOTAMs(fdpId, function (data) {
            var result = { IsSuccess: 1, Data: data };
            if ((!data || data.length == 0) && flag) {
                result.IsSuccess = 0;

                if ($rootScope.getOnlineStatus()) {
                    $http.get($rootScope.apiUrlExt + 'airport/notam/archive/FDP/' + fdpId).then(function (response) {
                        if (!response.data.IsSuccess)
                            deferred.reject("NOTAM ERROR");
                        db.sync.SyncNOTAM(fdpId, response.data.Data, function (dbData) {
                            deferred.resolve(dbData);
                        });

                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else
                    deferred.resolve(result);



            }
            else {

                deferred.resolve(result);
            }

        });
        return deferred.promise;
        //var deferred = $q.defer();


        //return deferred.promise;
    };

    var _epReplaceASR = function (item) {
        var deferred = $q.defer();
        //db.Clear("ASR", function () {
        db.DeleteAsr(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('ASR', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    //tolnd
    var _epReplaceTOLND = function (item) {
        var deferred = $q.defer();
        //db.Clear("ASR", function () {
        db.DeleteTOLND(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('TOLND', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    var _epReplaceTOLND2 = function (item) {
        var deferred = $q.defer();
        //db.Clear("ASR", function () {
        db.DeleteTOLND2(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('TOLND2', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };



    var _epReplaceDR = function (item) {
        var deferred = $q.defer();
        //db.Clear("ASR", function () {
        db.DeleteDr(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('DR', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    var _epReplaceOFP = function (item) {
        var deferred = $q.defer();
        //db.Clear("ASR", function () {
        db.DeleteOFP(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('OFP', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    var _epReplaceOFPProp = function (item) {
        var deferred = $q.defer();

        db.DeleteOFPPropById(item.Id, function () {
            item.IsSynced = 1;

            db.PutOFPPropById(item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    var _epGetASRByFlight = function (flightId) {
        var deferred = $q.defer();

        db.GetASRsByFlightId(flightId, function (_dbitem) {
            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.get($rootScope.apiUrl + 'asr/flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data) {
                                var _dbdate = !dbitem ? 0 : Number(dbitem.DateUpdate);
                                var _serverdate = Number(response.data.Data.DateUpdate);
                                //alert(dbitem.IsSynced + '   ' + _serverdate + '   ' + _dbdate);
                                if (!dbitem || (dbitem.IsSynced == 1 && _serverdate >= _dbdate)) {
                                    //update local

                                    //db.Clear("ASR", function () {

                                    db.DeleteAsr(flightId, function () {

                                        response.data.Data.IsSynced = 1;
                                        db.Put('ASR', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                                            deferred.resolve(response.data);
                                        });
                                    });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate > _dbdate) {
                                    //alert('x  ' + response.data.Data.User);
                                    dbitem.Alert = response.data.Data.User;
                                    dbitem.server = response.data.Data;
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate <= _dbdate) {
                                    //alert('y');
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else {

                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                //alert(_dbdate + '    ' + _serverdate);
                                //deferred.resolve({ IsSuccess: 1, Data: dbitem });
                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });
                        });

                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });



            }
            else {
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    var _epGetASRByFlight2 = function (flightId) {
        var deferred = $q.defer();
        db.GetASRsByFlightId(flightId, function (_dbitem) {
            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            console.log('asr get bd', dbitem);
            if ((dbitem && dbitem.IsSynced == 0) || !$rootScope.getOnlineStatus()) {
                var data = { IsSuccess: 1, Data: dbitem };
                console.log('asr local', data);
                deferred.resolve(data);
            }
            else {
                if ($rootScope.getOnlineStatus()) {
                    $http.get($rootScope.apiUrl + 'asr/flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                        if (response.data.IsSuccess && response.data.Data) {
                            db.Clear("ASR", function () {
                                response.data.Data.IsSynced = 1;
                                db.Put('ASR', response.data.Data.Id, response.data.Data, function (dbitem) {
                                    deferred.resolve(response.data);
                                });
                            });
                        }
                        else
                            deferred.resolve(response.data);


                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    var data = { IsSuccess: 1, Data: dbitem };
                    deferred.resolve(data);
                }

            }
        });



        return deferred.promise;
    };

    //tolnd
    var _epGetTOLNDByFlight = function (flightId) {
        var deferred = $q.defer();

        db.GetTOLNDsByFlightId(flightId, function (_dbitem) {
            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.get($rootScope.apiUrl + 'tocard/flight/' + flightId+'/TO' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data) {
                                var _dbdate = !dbitem ? 0 : Number(dbitem.DateUpdate);
                                var _serverdate = Number(response.data.Data.DateUpdate);
                                //alert(dbitem.IsSynced + '   ' + _serverdate + '   ' + _dbdate);
                                if (!dbitem || (dbitem.IsSynced == 1 && _serverdate >= _dbdate)) {
                                    //update local

                                   

                                    db.DeleteTOLND(flightId, function () {

                                        response.data.Data.IsSynced = 1;
                                        db.Put('TOLND', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                                            deferred.resolve(response.data);
                                        });
                                    });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate > _dbdate) {
                                    //alert('x  ' + response.data.Data.User);
                                    dbitem.Alert = response.data.Data.User;
                                    dbitem.server = response.data.Data;
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate <= _dbdate) {
                                    //alert('y');
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else {

                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                //alert(_dbdate + '    ' + _serverdate);
                                //deferred.resolve({ IsSuccess: 1, Data: dbitem });
                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });
                        });

                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });



            }
            else {
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    //tolnd
    var _epGetTOLND2ByFlight  = function (flightId) {
        var deferred = $q.defer();
        db.GetTOLND2sByFlightId(flightId, function (_dbitem) {
            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            
            if ((dbitem && dbitem.IsSynced == 0) || !$rootScope.getOnlineStatus()) {
                var data = { IsSuccess: 1, Data: dbitem };
                 
                deferred.resolve(data);
            }
            else {
                if ($rootScope.getOnlineStatus()) {
                    $http.get($rootScope.apiUrl + 'tocard/flight/' + flightId+'/LND' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                        if (response.data.IsSuccess && response.data.Data) {
                            db.Clear("TOLND2", function () {
                                response.data.Data.IsSynced = 1;
                                db.Put('TOLND2', response.data.Data.Id, response.data.Data, function (dbitem) {
                                    deferred.resolve(response.data);
                                });
                            });
                        }
                        else
                            deferred.resolve(response.data);


                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    var data = { IsSuccess: 1, Data: dbitem };
                    deferred.resolve(data);
                }

            }
        });



        return deferred.promise;
    };
    var momentUtcNowString = function () {
        return moment.utc().format('YYYYMMDDHHmm');
    };
    var momentUtcNowStringSecond = function () {
        return moment.utc().format('YYYYMMDDHHmmss');
    };
    var _saveASR = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
        entity.IsSynced = 1;

        entity.DateUpdate = momentUtcNowString();
        db.Put('ASR', entity.FlightId, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {

                _checkInternet(function (st) {
                    if (st) {
                        entity.OccurrenceDate = moment(new Date(entity.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'asr/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {
                                //deferred.resolve(response.data);
                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.Delete('ASR', pk, function () {
                                    db.Put('ASR', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
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

                        row.IsSynced = 0;
                        db.deSyncedItem('ASR', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });


            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('ASR', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;

        //var deferred = $q.defer();
        //$http.post($rootScope.apiUrl + 'asr/save', entity).then(function (response) {
        //    deferred.resolve(response.data);
        //}, function (err, status) {

        //    deferred.reject(Exceptions.getMessage(err));
        //});

        //return deferred.promise;
    };

    //tolnd
    var _saveTOLND = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
        entity.IsSynced = 1;

        entity.DateUpdate = momentUtcNowString();
        db.Put('TOLND', entity.FlightId, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {

                _checkInternet(function (st) {
                    if (st) {
                        entity.OccurrenceDate = moment(new Date(entity.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'tocard/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {
                                //deferred.resolve(response.data);
                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.Delete('TOLND', pk, function () {
                                    db.Put('TOLND', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
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

                        row.IsSynced = 0;
                        db.deSyncedItem('TOLND', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });


            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('TOLND', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;

         
    };
    var _saveTOLND2 = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
        entity.IsSynced = 1;

        entity.DateUpdate = momentUtcNowString();
        db.Put('TOLND2', entity.FlightId, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {

                _checkInternet(function (st) {
                    if (st) {
                        entity.OccurrenceDate = moment(new Date(entity.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'tocard/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {
                                //deferred.resolve(response.data);
                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.Delete('TOLND2', pk, function () {
                                    db.Put('TOLND2', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
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

                        row.IsSynced = 0;
                        db.deSyncedItem('TOLND2', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });


            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('TOLND2', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;


    };

    var _saveDR = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
        entity.IsSynced = 1;

        entity.DateUpdate = momentUtcNowString();
        db.Put('DR', entity.FlightId, entity, function (row) {

            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        entity.OccurrenceDate = moment(new Date(entity.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'dr/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {
                                //deferred.resolve(response.data);
                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.Delete('DR', pk, function () {
                                    db.Put('DR', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
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
                        row.IsSynced = 0;
                        db.deSyncedItem('DR', entity.FlightId, function () {

                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });

            }
            else {

                row.IsSynced = 0;
                db.deSyncedItem('DR', entity.FlightId, function () {

                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;


    };



  //doolu
    var _saveOFPProp = function (entity) {
        console.log('save ofp prop - propname', entity );
        
        var pk = entity.OFPId;
        var deferred = $q.defer();
        entity.IsSynced = 1;
        var t1 = performance.now();
        db.GetOFPPropByName(entity.OFPId, entity.PropName, function (_result) {
            var t2 = performance.now();
            console.log('save ofp prop - getbyname',t2 - t1);
            if (!_result) {
                deferred.reject("no property found in local db  prop:" + entity.PropName);
                return;
            }
            entity.Id = _result.Id;
            entity.DateUpdate = momentUtcNowStringSecond();
            t1 = performance.now();
            db.PutOFPProp2(entity.OFPId, entity.PropName, entity, function (row) {
                t2 = performance.now();
                console.log('save ofp prop - put', t2 - t1);

                t1 = performance.now();
                if ($rootScope.getOnlineStatus()) {

                    $http.post($rootScope.apiUrl + 'ofp/prop/save', entity).then(function (response) {
                        t2 = performance.now();
                        console.log('save ofp prop - post', t2 - t1);
                        if (response.data.IsSuccess) {
                            //deferred.resolve(response.data);
                            var item = response.data.Data;
                            item.IsSynced = 1;

                            t1 = performance.now();
                            //db.DeleteOFPProp(item.OFPId, item.PropName, function () {
                            //    db.PutOFPProp2(item.OFPId, item.PropName, item, function (dbitem) {
                            //        t2 = performance.now();
                            //        console.log('save ofp prop - delete & put', t2 - t1);
                            //        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                            //    });
                           // });
                            db.PutOFPProp2(item.OFPId, item.PropName, item, function (dbitem) {
                                t2 = performance.now();
                                console.log('save ofp prop - delete & put', t2 - t1);
                                console.log('save ofp prop item ', dbitem);
                                   deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                            });

                        }
                        else
                            deferred.resolve(response.data);

                    }, function (err, status) {
                        ShowNotify2("The application cannot connect to the Server. Please check your internet connection.", 'error');
                        row.IsSynced = 0
                        //nool2     
                        db.deSyncedOFPProp(entity.OFPId, entity.PropName, function () {

                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                        //deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {

                    row.IsSynced = 0

                    db.deSyncedOFPProp(entity.OFPId, entity.PropName, function () {

                        deferred.resolve({ Data: row, IsSuccess: 1 });
                    });
                }
            });


        });



        return deferred.promise;


    };

    //doolu
    var _saveOFPPropBulk =async function (objs,_ofpId) {
        var deferred = $q.defer();
        var _db = db.getDb();
        var _names = Enumerable.From(objs).Select('$.PropName').ToArray();
        var _props = await _db.OFPProp.where("OFPId").equals(_ofpId).toArray();
        _props = Enumerable.From(_props).Where(function (x) { return _names.indexOf(x.PropName) != -1; }).ToArray();
       // console.log('props', _props);
      //  console.log(' buk saved start');
        $.each(objs, function (_w, entity) {
            entity.IsSynced = 1;
            db.GetOFPPropByName2(entity.OFPId, entity.PropName,_props, function (_result) {
               // console.log('got',_result);
                if (!_result) {
                    deferred.reject("no property found in local db :" + entity.PropName);
                    return;
                }
                entity.Id = _result.Id;
                entity.DateUpdate = momentUtcNowStringSecond();
                db.PutOFPProp(entity.OFPId, entity.PropName, entity, function (row) {
                   
                    if ($rootScope.getOnlineStatus()) {
                        console.log('     sending server');
                        $http.post($rootScope.apiUrl + 'ofp/prop/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {
                                //deferred.resolve(response.data);
                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.DeleteOFPProp(item.OFPId, item.PropName, function () {
                                    db.PutOFPProp2(item.OFPId, item.PropName, item, function (dbitem) {
                                        console.log('     sending server done');
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
                                });

                            }
                            else
                                deferred.resolve(response.data);

                        }, function (err, status) {

                            deferred.reject(Exceptions.getMessage(err));
                        });
                    }
                    else {

                        row.IsSynced = 0
                        
                        db.deSyncedOFPProp(entity.OFPId, entity.PropName, function () {
                             
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });


            });
        });

        //var pk = entity.OFPId;

        //entity.IsSynced = 1;





        return deferred.promise;


    };
    ////////////////////////////////////////
    var _epGetDRByFlight = function (flightId) {
        var deferred = $q.defer();

        db.GetDRsByFlightId(flightId, function (_dbitem) {
            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.get($rootScope.apiUrl + 'dr/flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data) {
                                var _dbdate = !dbitem ? 0 : Number(dbitem.DateUpdate);
                                var _serverdate = Number(response.data.Data.DateUpdate);
                                //alert(dbitem.IsSynced + '   ' + _serverdate + '   ' + _dbdate);
                                if (!dbitem || (dbitem.IsSynced == 1 && _serverdate >= _dbdate)) {
                                    //update local

                                    //db.Clear("ASR", function () {

                                    db.DeleteDr(flightId, function () {

                                        response.data.Data.IsSynced = 1;
                                        db.Put('DR', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                                            deferred.resolve(response.data);
                                        });
                                    });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate > _dbdate) {
                                    //alert('x  ' + response.data.Data.User);
                                    dbitem.Alert = response.data.Data.User;
                                    dbitem.server = response.data.Data;
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate <= _dbdate) {
                                    //alert('y');
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else {

                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                //alert(_dbdate + '    ' + _serverdate);
                                //deferred.resolve({ IsSuccess: 1, Data: dbitem });
                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });
                        });
                    }
                    else {
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });





            }
            else {
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    //gool
    var _epGetDRsByFlights = async function (dto) {
        var deferred = $q.defer();
        $http.post($rootScope.apiUrl + 'drs', dto).then(sr => {
            if (sr.data.IsSuccess) {
                var serverProps = sr.data.Data;
                var _db = db.getDb();
                _db.DR
                    .filter(function (asr) {

                        return dto.ids.indexOf(Number(asr.FlightId)) != -1;
                    }).toArray(function (localProps) {
                        var _deletedKeys = [];
                        var _putList = [];
                        $.each(serverProps, function (_i, serverProp) {

                            var localProp = Enumerable.From(localProps).Where('$.FlightId==' + serverProp.FlightId).FirstOrDefault();

                            var _localDate = localProp ? Number(localProp.DateUpdate) : -1;
                            var _serverDate = Number(serverProp.DateUpdate);
                            // if (serverProp.Id == 136) {
                            //alert('local: ' + _localDate + '   server:' + _serverDate);
                            // }
                            if (localProp && localProp.IsSynced == 0 && _localDate >= _serverDate) {

                            }
                            else if (_serverDate > _localDate) {
                                //if (serverProp.Id == 136) {
                                //alert('replace 136');
                                //}
                                serverProp.IsSynced = 1;
                                //_epReplaceOFPProp(serverProp).then(rp => { });
                                _deletedKeys.push(serverProp.Id);
                                _putList.push(serverProp);
                            }

                        });

                        if (_deletedKeys.length > 0)
                            db.DeleteDrByIds(_deletedKeys, function () {
                                _db.DR.bulkPut(_putList).then(bpres => { });
                            });
                        deferred.resolve(sr.data);
                    });
                //////////////////////////////
            }
            else {
                deferred.reject('error in getting drs from server');
            }
        });
         


        return deferred.promise;
    };
    //10-09
    var _epGetOFPByFlights = async function (dto, fnc) {
        var deferred = $q.defer();
        // var dto = { ids: flightIds };
        var _db = db.getDb();
        _db.OFP.filter(function (rec) {
            return dto.ids.indexOf(rec.FlightId) != -1;
        }).toArray(function (recs) {
            var recIds = Enumerable.From(recs).Select('$.FlightId').ToArray();

            var newIds = Enumerable.From(dto.ids).Where(function (x) { return recIds.indexOf(x) == -1; }).ToArray();
            dto.ids = newIds;

            if (!dto.ids || dto.ids.length == 0) {

                deferred.resolve(dto.ids);
            }
            else {
                if (fnc)
                    fnc();
                /////////////////////// 
                $http.post($rootScope.apiUrl + 'ofp/flights', dto).then(sr => {
                    var serverOFPs = sr.data.Data.ofps;
                    var serverProps = sr.data.Data.ofpProps;
                    $.each(serverOFPs, function (_i, serverOFP) {
                        db.DeleteOFP(serverOFP.FlightId, function () {

                            serverOFP.IsSynced = 1;
                            db.Put('OFP', serverOFP.FlightId, serverOFP, function (dbitem) {
                                //deferred.resolve(response.data);
                            });



                        });


                    });

                    ////PROPS
                    var pids = Enumerable.From(serverProps).Select('Number($.Id)').ToArray();
                    console.log('PROP IDS:', pids);

                    _db.OFPProp
                        .filter(function (asr) {

                            return pids.indexOf(Number(asr.Id)) != -1;
                        }).toArray(function (localProps) {
                            var _deletedKeys = [];
                            var _putList = [];
                            $.each(serverProps, function (_i, serverProp) {

                                var localProp = Enumerable.From(localProps).Where('$.Id==' + serverProp.Id).FirstOrDefault();

                                var _localDate = localProp ? Number(localProp.DateUpdate) : -1;
                                var _serverDate = Number(serverProp.DateUpdate);
                                // if (serverProp.Id == 136) {
                                //alert('local: ' + _localDate + '   server:' + _serverDate);
                                // }
                                if (localProp && localProp.IsSynced == 0 && _localDate >= _serverDate) {

                                }
                                else if (_serverDate > _localDate) {
                                    //if (serverProp.Id == 136) {
                                    //alert('replace 136');
                                    //}
                                    serverProp.IsSynced = 1;
                                    //_epReplaceOFPProp(serverProp).then(rp => { });
                                    _deletedKeys.push(serverProp.Id);
                                    _putList.push(serverProp);
                                }

                            });

                            if (_deletedKeys.length > 0)
                                db.DeleteOFPPropByIds(_deletedKeys, function () {
                                    _db.OFPProp.bulkPut(_putList).then(bpres => { });
                                });
                            deferred.resolve(sr.data);
                        });




                });
                /////////////////////////
                /////////////////////////

            }


        });



        return deferred.promise;
    };
    //10-09
    var _epCheckOFBVersion = function (flightId, ofpId) {
        var deferred = $q.defer();
        if ($rootScope.getOnlineStatus()) {
            _checkInternet(function (st) {
                if (st) {
                    $http.get($rootScope.apiUrl + 'ofp/flight/' + flightId).then(function (response) {

                        if (response.data.IsSuccess && response.data.Data) {
                             
                            if (Number(response.data.Data.Id) != Number(ofpId)) {
                                deferred.resolve({ IsSuccess: 1, Data: response.data.Data });
                            } 
                            else {
                                deferred.resolve({ IsSuccess: 1, Data: null });
                            }
                            //response.data.Data.IsSynced = 1;
                            //db.DeleteOFP(flightId, function () {

                            //    response.data.Data.IsSynced = 1;
                            //    db.Put('OFP', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                            //        deferred.resolve(response.data);
                            //    });
                            //});


                        }
                        else
                            deferred.resolve({ IsSuccess: 1, Data: null });
                    });
                }
                else {
                    var data = { IsSuccess: 1, Data: null };
                    deferred.resolve(data);
                }
            });
        }
        else {
            var data = { IsSuccess: 1, Data: null };
            deferred.resolve(data);
        };
        return deferred.promise;
    };
    serviceFactory.epCheckOFBVersion = _epCheckOFBVersion;

    //10-10
    var _deleteOFP = function (flightId, callback) {
        db.DeleteOFP(flightId, function () {
            callback();
        });
    };
    serviceFactory.deleteOFP = _deleteOFP;
    var _epGetOFPByFlight = function (flightId) {
        var deferred = $q.defer();

        db.GetOFPsByFlightId(flightId, function (_dbitem) {
           
            //var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            var dbitem = _dbitem;
              
            
            if (!dbitem && $rootScope.getOnlineStatus()) {
                
                _checkInternet(function (st) { 
                    if (st) { 
                        $http.get($rootScope.apiUrl + 'ofp/flight/' + flightId).then(function (response) {
                             
                            if (response.data.IsSuccess && response.data.Data) {
                                response.data.Data.IsSynced = 1;
                                db.DeleteOFP(flightId, function () {

                                    response.data.Data.IsSynced = 1;
                                    db.Put('OFP', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                                        deferred.resolve(response.data);
                                    });
                                });


                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });
                        });
                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });
                



            }
            else {
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    //10-10
    //12-04

    var _transferOPFProps = function (flights) {
        var deferred = $q.defer();
        var _db = db.getDb();
        _db.OFP.where('FlightId').anyOf(flights).toArray(function (ofps) {
            var ofpIds = Enumerable.From(ofps).Select('$.Id').ToArray();
            console.log('transfer - ofps', ofps);
            _db.OFPProp.where('OFPId').anyOf(ofpIds).toArray(function (props) {

                console.log('transfer - props', props);
                $.each(ofps, function (_i, _d) {
                    var _props = Enumerable.From(props).Where('$.OFPId==' + _d.Id).ToArray();
                    _d.Props = _props;
                });
                console.log('transfer - ofps-props', ofps);
                _db.OFP.bulkPut(ofps).then(function (lastKey) {
                    console.log('transfer - transfered');
                }).catch(Dexie.BulkError, function (e) {
                    console.log('error',e);
                });
            });
        });

        return deferred.promise;
    };
    serviceFactory.transferOPFProps = _transferOPFProps;


    var _deleteSignedOPFProps = function () {
        var deferred = $q.defer();
        var _db = db.getDb();
        _db.OFP.where('FlightId').anyOf(flights).toArray(function (ofps) {
            var ofpIds = Enumerable.From(ofps).Select('$.Id').ToArray();
            console.log('transfer - ofps', ofps);
            _db.OFPProp.where('OFPId').anyOf(ofpIds).toArray(function (props) {

                console.log('transfer - props', props);
                $.each(ofps, function (_i, _d) {
                    var _props = Enumerable.From(props).Where('$.OFPId==' + _d.Id).ToArray();
                    _d.Props = _props;
                });
                console.log('transfer - ofps-props', ofps);
                _db.OFP.bulkPut(ofps).then(function (lastKey) {
                    console.log('transfer - transfered');
                }).catch(Dexie.BulkError, function (e) {
                    console.log('error', e);
                });
            });
        });

        return deferred.promise;
    };
    serviceFactory.deleteSignedOPFProps = _deleteSignedOPFProps;  

    var _epGetOFPProps = function (ofpId ) {   
        var _db = db.getDb();
        //_db.OFPProp.toArray(function (arg) {

        //    var arr = Enumerable.From(arg).ToArray();
        //    $.each(arr, function (_i, _d) {
        //        _d.Id = _d.Id + 4000000;
        //        _d.OFPId = 4000000;
        //    });
        //    _db.OFPProp.bulkPut(arr).then(xxx => { alert('done'); });
        //});


         
        var deferred = $q.defer();

        //var _isSigned=
        console.log('_p1'); 
        
        
        db.GetOFPProps(ofpId, function (_dbitem) {
            console.log('_p3 ' + _dbitem.length);
            //console.log('_p3_1', _dbitem);
            
            if ( $rootScope.getOnlineStatus()) {
                _checkInternet(function (st) { 
                    if (st) { 
                       
                         
                        $http.get($rootScope.apiUrl + 'ofp/props/' + ofpId).then(function (response) {
                            console.log('_p4');
                            if (response.data.IsSuccess && response.data.Data) {
                                //deferred.resolve({ IsSuccess: 1, Data: response.data.Data }); 
                                var dbRows = response.data.Data;

                                var output = [];
                                var upd = 1; 

                                //var _deleteList = [];
                                var _putList = [];

                                $.each(dbRows, function (_i, _dbRow) {
                                    var localRow = Enumerable.From(_dbitem).Where('$.Id==' + _dbRow.Id).FirstOrDefault();
                                    var _dbdate = !localRow ? 0 : Number(localRow.DateUpdate);
                                    var _serverdate = Number(_dbRow.DateUpdate);
                                    if (!localRow || _serverdate > _dbdate) { 
                                        _dbRow.IsSynced = 1;
                                        output.push(_dbRow);
                                        _putList.push(_dbRow);
                                        
                                    }

                                    else if (localRow.IsSynced == 0 && _serverdate <= _dbdate) {


                                        output.push(localRow);
                                        
                                    }
                                    else {


                                        output.push(localRow);
                                      
                                    }

                                });

                                if (_putList.length > 0) {
                                    var _keys = Enumerable.From(_putList).Select('$.Id').ToArray();
                                    //clear cache
                                    _db['OFPProp'].bulkDelete(_keys).then(res => {
                                        _db.OFPProp.bulkPut(_putList).then(bpres => {
                                            deferred.resolve({ IsSuccess: 1, Data: output });
                                        }).catch(function (dErr) {
                                             // Handle error PUTING
                                            alert('ERROR in OFP properties deleting. Please report the error code to the application administrator. CODE: OFP-100' );
                                            deferred.resolve({ IsSuccess: 1, Data: output });
                                        });
                                    }).catch(function (dErr) {
                                        // Handle error DELETING
                                        alert('ERROR in OFP properties inserting. Please report the error code to the application administrator. CODE: OFP-101');
                                        deferred.resolve({ IsSuccess: 1, Data: output });
                                    });
                                     
                                     
                                }
                                else

                                    deferred.resolve({ IsSuccess: 1, Data: output });
                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });


                        });

                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');

                        var data = { IsSuccess: 1, Data: _dbitem };

                        deferred.resolve(data);
                    }
                });
                





            }
            else {
                var data = { IsSuccess: 1, Data: _dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    ////////////////////////////////////////
    var _epReplaceVR = function (item) {
        var deferred = $q.defer();
        //db.Clear("VR", function () {
        db.DeleteVr(item.FlightId, function () {
            item.IsSynced = 1;
            item.Alert = null;
            item.server = null;
            db.Put('VR', item.Id, item, function (dbitem) {
                deferred.resolve(dbitem);
            });
        });
        return deferred.promise;
    };
    var _epGetVRByFlight = function (flightId) {
        var deferred = $q.defer();
        db.GetVRsByFlightId(flightId, function (_dbitem) {

            var dbitem = _dbitem && _dbitem.length > 0 ? _dbitem[0] : null;
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.get($rootScope.apiUrl + 'voyage/flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data) {
                                var _dbdate = !dbitem ? 0 : Number(dbitem.DateUpdate);
                                var _serverdate = Number(response.data.Data.DateUpdate);

                                if (!dbitem || (dbitem.IsSynced == 1 && _serverdate >= _dbdate)) {
                                    //update local

                                    //db.Clear("VRs", function () {
                                    db.DeleteVr(flightId, function () {
                                        response.data.Data.IsSynced = 1;
                                        db.Put('VR', response.data.Data.FlightId, response.data.Data, function (dbitem) {
                                            deferred.resolve(response.data);
                                        });
                                    });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate > _dbdate) {

                                    dbitem.Alert = response.data.Data.User;
                                    dbitem.server = response.data.Data;
                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else if (dbitem.IsSynced == 0 && _serverdate <= _dbdate) {

                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }
                                else {

                                    deferred.resolve({ IsSuccess: 1, Data: dbitem });
                                }

                                //alert(_dbdate + '    ' + _serverdate);
                                //deferred.resolve({ IsSuccess: 1, Data: dbitem });
                            }
                            else
                                deferred.resolve({ IsSuccess: 1, Data: dbitem });
                        });

                    }
                    else {
                        General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });

                


            }
            else {
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }
        });

        return deferred.promise;
    };
    var _saveVR = function (entity) {
        var pk = entity.FlightId;
        var deferred = $q.defer();
        entity.IsSynced = 1;
        entity.DateUpdate = momentUtcNowString();
        db.Put('VR', entity.FlightId, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        $http.post($rootScope.apiUrl + 'voyage/save', entity).then(function (response) {
                            if (response.data.IsSuccess) {

                                var item = response.data.Data;
                                item.IsSynced = 1;
                                db.Delete('VR', pk, function () {
                                    db.Put('VR', item.FlightId, item, function (dbitem) {
                                        deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                                    });
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
                        row.IsSynced = 0;
                        db.deSyncedItem('VR', entity.FlightId, function () {
                            deferred.resolve({ Data: row, IsSuccess: 1 });
                        });
                    }
                });
                
            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('VR', entity.FlightId, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;


    };
    //////////////////////////////////

    var _epGetVRByFlight2 = function (flightId) {

        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'voyage/flight/' + flightId /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _saveVR2 = function (entity) {
        var pk = entity.Id;
        var deferred = $q.defer();
        entity.IsSynced = 1;
        db.Put('VRs', entity.Id, entity, function (row) {
            if ($rootScope.getOnlineStatus()) {
                $http.post($rootScope.apiUrl + 'voyage/save', entity).then(function (response) {
                    if (response.data.IsSuccess) {
                        //deferred.resolve(response.data);
                        var item = response.data.Data;
                        db.Delete('VRs', pk, function () {
                            db.Put('VRs', item.Id, item, function (dbitem) {
                                deferred.resolve({ Data: dbitem, IsSuccess: 1 });
                            });
                        });

                    }
                    else
                        deferred.resolve(response.data);

                }, function (err, status) {

                    deferred.reject(Exceptions.getMessage(err));
                });
            }
            else {
                row.IsSynced = 0;
                db.deSyncedItem('VRs', entity.Id, function () {
                    deferred.resolve({ Data: row, IsSuccess: 1 });
                });
            }
        });
        return deferred.promise;
        //var deferred = $q.defer();
        //$http.post($rootScope.apiUrl + 'voyage/save', entity).then(function (response) {
        //    deferred.resolve(response.data);
        //}, function (err, status) {

        //    deferred.reject(Exceptions.getMessage(err));
        //});

        //return deferred.promise;
    };
    var _epCheckLog = function (dto) {
        var deferred = $q.defer();
        if ($rootScope.getOnlineStatus()) {
            $http.post($rootScope.apiUrl + 'flight/log/check', dto).then(function (response) {
                deferred.resolve(response.data);
            }, function (err, status) {

                //deferred.reject(Exceptions.getMessage(err));
                deferred.resolve(dto);
            });
        }
        else {
            deferred.resolve(dto);
        }
        return deferred.promise;
    };

    var _getSyncDto = function (flt) {

        var dto = { Server: true };
        dto.FlightId = flt.FlightId;
        dto.CrewId = flt.CrewId;
        dto.DelayBlockOff = null;
        dto.BlockTime = null;
        dto.FlightTime = null;
        if (flt.BlockOff)
            dto.BlockOffDate = momentFromatFroServerUTC(flt.BlockOff);
        if (flt.BlockOn)
            dto.BlockOnDate = momentFromatFroServerUTC(flt.BlockOn);
        if (flt.TakeOff)
            dto.TakeOffDate = momentFromatFroServerUTC(flt.TakeOff);
        if (flt.Landing)
            dto.LandingDate = momentFromatFroServerUTC(flt.Landing);

        dto.FuelRemaining = flt.FuelRemaining;
        dto.FuelUplift = flt.FuelUplift;
        dto.FuelUsed = flt.FuelUsed;
        dto.FuelDensity = flt.FuelDensity;
        dto.FuelTotal = flt.FuelTotal;
        ////////////
        dto.PaxAdult = flt.PaxAdult;
        dto.PaxChild = flt.PaxChild;
        dto.PaxInfant = flt.PaxInfant;
        dto.PaxTotal = flt.PaxTotal;

        dto.BaggageWeight = flt.BaggageWeight;
        dto.CargoWeight = flt.CargoWeight;

        dto.SerialNo = flt.SerialNo;
        dto.LTR = flt.LTR;
        dto.PF = flt.PF;

        dto.RVSM_GND_CPT = flt.RVSM_GND_CPT;
        dto.RVSM_GND_STBY = flt.RVSM_GND_STBY;
        dto.RVSM_GND_FO = flt.RVSM_GND_FO;

        dto.RVSM_FLT_CPT = flt.RVSM_FLT_CPT;
        dto.RVSM_FLT_STBY = flt.RVSM_FLT_STBY;
        dto.RVSM_FLT_FO = flt.RVSM_FLT_FO;

        dto.CommanderNote = flt.CommanderNote;

        dto.AttRepositioning1 = flt.AttRepositioning1;
        dto.AttRepositioning2 = flt.AttRepositioning2;


        ///////////////
        //sook
        dto.JLUserId = flt.CrewId;
        dto.JLDate = momentUtcNow();
        dto.Version = flt.Version;

        //$scope.loadingVisible = true;
        //flightService.epSaveLogOverwriteServer($scope.dto).then(function (response) {
        //    $scope.loadingVisible = false;

        //    if (response.IsSuccess) {
        //        General.ShowNotify(Config.Text_SavedOk, 'success');
        //        $rootScope.$broadcast('onFlightLocgSaved', response.Data);

        //    }
        //    else {
        //        General.ShowNotify(response.Data, 'error');
        //    }
        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        return dto;
    };


    var _getSyncDtoNew = function (flt) {

        var dto = { Server: true };
        dto.FlightId = flt.FlightId;
        dto.CrewId = flt.CrewId;
        dto.DelayBlockOff = null;
        dto.BlockTime = null;
        dto.FlightTime = null;
        //CreateDate
        if (flt.BlockOff)
            //dto.BlockOffDate = momentFromatFroServerUTC(flt.BlockOff);
            // dto.BlockOffDate = CreateDate(flt.BlockOff);
            dto.BlockOffDate = momentFromatFroServerUTCObj(CreateDate(flt.BlockOff)).result;

        if (flt.BlockOn)
            dto.BlockOnDate = momentFromatFroServerUTCObj(CreateDate(flt.BlockOn)).result; //momentFromatFroServerUTC(flt.BlockOn);
           // dto.BlockOnDate = CreateDate(flt.BlockOn);
        if (flt.TakeOff)
            dto.TakeOffDate = momentFromatFroServerUTCObj(CreateDate(flt.TakeOff)).result; //momentFromatFroServerUTC(flt.TakeOff);
            //dto.TakeOffDate = CreateDate(flt.TakeOff);
        if (flt.Landing)
            dto.LandingDate = momentFromatFroServerUTCObj(CreateDate(flt.Landing)).result; //momentFromatFroServerUTC(flt.Landing);
            //dto.LandingDate = CreateDate(flt.Landing);

        dto.FuelRemaining = flt.FuelRemaining;
        dto.FuelUplift = flt.FuelUplift;
        dto.FuelUsed = flt.FuelUsed;
        dto.FuelDensity = flt.FuelDensity;
        dto.FuelTotal = flt.FuelTotal;
        ////////////
        dto.PaxAdult = flt.PaxAdult;
        dto.PaxChild = flt.PaxChild;
        dto.PaxInfant = flt.PaxInfant;
        dto.PaxTotal = flt.PaxTotal;

        dto.BaggageWeight = flt.BaggageWeight;
        dto.CargoWeight = flt.CargoWeight;

        dto.SerialNo = flt.SerialNo;
        dto.LTR = flt.LTR;
        dto.PF = flt.PF;

        dto.RVSM_GND_CPT = flt.RVSM_GND_CPT;
        dto.RVSM_GND_STBY = flt.RVSM_GND_STBY;
        dto.RVSM_GND_FO = flt.RVSM_GND_FO;

        dto.RVSM_FLT_CPT = flt.RVSM_FLT_CPT;
        dto.RVSM_FLT_STBY = flt.RVSM_FLT_STBY;
        dto.RVSM_FLT_FO = flt.RVSM_FLT_FO;

        dto.CommanderNote = flt.CommanderNote;

        dto.AttRepositioning1 = flt.AttRepositioning1;
        dto.AttRepositioning2 = flt.AttRepositioning2;

        ///////////////////////
        dto.BlockOffDateDt = flt.BlockOffDateDt;
        dto.BlockOnDateDt = flt.BlockOnDateDt;
        dto.TakeOffDateDt = flt.TakeOffDateDt;
        dto.LandingDateDt = flt.LandingDateDt;

        dto.FuelRemainingDt = flt.FuelRemainingDt;
        dto.FuelUpliftDt = flt.FuelUpliftDt;
        dto.FuelUsedDt = flt.FuelUsedDt;
        dto.FuelDensityDt = flt.FuelDensityDt;


        dto.PaxAdultDt = flt.PaxAdultDt;
        dto.PaxChildDt = flt.PaxChildDt;
        dto.PaxInfantDt = flt.PaxInfantDt;


        dto.BaggageWeightDt = flt.BaggageWeightDt;
        dto.CargoWeightDt = flt.CargoWeightDt;

        dto.SerialNoDt = flt.SerialNoDt;
        dto.LTRDt = flt.LTRDt;
        dto.PFDt = flt.PFDt;

        dto.RVSM_GND_CPTDt = flt.RVSM_GND_CPTDt;
        dto.RVSM_GND_STBYDt = flt.RVSM_GND_STBYDt;
        dto.RVSM_GND_FODt = flt.RVSM_GND_FODt;

        dto.RVSM_FLT_CPTDt = flt.RVSM_FLT_CPTDt;
        dto.RVSM_FLT_STBYDt = flt.RVSM_FLT_STBYDt;
        dto.RVSM_FLT_FODt = flt.RVSM_FLT_FODt;

        dto.CommanderNoteDt = flt.CommanderNoteDt;

        dto.AttRepositioning1Dt = flt.AttRepositioning1Dt;
        dto.AttRepositioning2Dt = flt.AttRepositioning2Dt;
        ///////////////
        //sook
        dto.JLUserId = flt.CrewId;
        dto.JLDate = momentUtcNow();
        dto.Version = flt.Version;

        //$scope.loadingVisible = true;
        //flightService.epSaveLogOverwriteServer($scope.dto).then(function (response) {
        //    $scope.loadingVisible = false;

        //    if (response.IsSuccess) {
        //        General.ShowNotify(Config.Text_SavedOk, 'success');
        //        $rootScope.$broadcast('onFlightLocgSaved', response.Data);

        //    }
        //    else {
        //        General.ShowNotify(response.Data, 'error');
        //    }
        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

        return dto;
    };

    //noolu
    var _autoSyncLogsNew = async function (callback) {
        var _db = db.getDb();
        var flights = await _db.AppCrewFlights
            .filter(function (flight) {

                return flight.IsSynced == 0;
            }).toArray();

        if (!flights || flights.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no logs found',
            });
            return;
        }

        var syncedPromises = [];
        var resps = [];
        $.each(flights, function (_d, _flt) {
          
            syncedPromises.push($http.post($rootScope.apiUrl + 'flight/log/save2', _getSyncDtoNew(_flt)).then(resp => { resps.push({ id: _flt.FlightId, flight: resp.data.Data.flight }); }));
        });
        $q.all(syncedPromises).then(result => {
            var _cntr = 0;
            $.each(resps, function (_w, _item) {
                _item.flight.IsSynced = 1;
                _item.flight.JLDate = momentFromatLocalUTC(_item.flight.JLDate);
                db.Put('AppCrewFlights', _item.flight.FlightId, _item.flight, function (row2) {
                   
                    console.log('SYN NEWW  WWW W ', row2);
                    _cntr++;
                    if (_cntr >= resps.length) {

                        $rootScope.$broadcast('COMMAND', { title: 'BIND_FLIGHTS' });
                        logResult.synced = resps.length;
                        logResult.remark = '';
                        callback(logResult);
                    }
                });
            });
        });

    };

    var _autoSyncLogs = async function (callback) {
        var _db = db.getDb();
        var flights = await _db.AppCrewFlights
            .filter(function (flight) {

                return flight.IsSynced == 0;
            }).toArray();

        if (!flights || flights.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no logs found',
            });
            return;
        }
        var logResult = { total: flights.length };

        var promises = [];
        var checkResults = [];
        $.each(flights, function (_i, flight) {
            var dto = { JLDate: flight.JLDate, CrewId: flight.CrewId, FlightId: flight.FlightId };
            promises.push($http.post($rootScope.apiUrl + 'flight/log/check', dto).then(cr => { checkResults.push({ flt: flight, result: cr }); }));
        });


        $q.all(promises).then(result => {

            var passed = [];
            $.each(checkResults, function (_i, _d) {
                var flt = _d.flt;
                if (_d.result.data.IsSuccess) {

                    var checkResult = _d.result.data.Data;

                    if (!checkResult) { passed.push(_getSyncDto(flt)); }
                    else {

                        if ((checkResult.JLUserId && checkResult.JLUserId != flt.JLUserId)
                            || (checkResult.JLUserId && getTimeForSync(checkResult.JLDate) > getTimeForSync(flt.JLDate))
                        ) {
                            console.log('Cant Sync ', checkResult);
                        }
                        else {

                            passed.push(_getSyncDto(flt));

                        }
                    }

                }
            });

            if (passed.length > 0) {
                var syncedPromises = [];
                var resps = [];
                $.each(passed, function (_i, _dto) {

                    syncedPromises.push($http.post($rootScope.apiUrl + 'flight/log/save', _dto).then(resp => { resps.push({ id: _dto.FlightId, dt: resp.data.Data }); }));
                });
                var jlDate = null;
                $q.all(syncedPromises).then(result => {

                    var _cntr = 0;
                    $.each(resps, function (_w, _item) {
                        var _flt = Enumerable.From(flights).Where('$.FlightId==' + _item.id).FirstOrDefault();
                        if (_flt) {
                            var changes = {
                                JLDate: momentFromatLocalUTC(_item.dt),
                                JLUserId: $rootScope.employeeId,
                                IsSynced: 1,
                            };
                            db.Update('AppCrewFlights', _item.id, changes, function (_obj) {

                                _cntr++;
                                if (_cntr >= resps.length) {

                                    $rootScope.$broadcast('COMMAND', { title: 'BIND_FLIGHTS' });
                                    logResult.synced = passed.length;
                                    logResult.remark = (logResult.total - passed.length) + ' flight(s) cant sync';
                                    callback(logResult);
                                }
                            });
                        }

                    });
                });

            }
            else {
                logResult.synced = 0;
                logResult.remark = logResult.total + ' flight(s) cant sync';
                callback(logResult);
                return;
            }

        });

        //callback(flights);
    };

    var _autoSyncASR = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.ASR
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no asrs found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'asr/flights', dto).then(sr => {
            console.log('asr server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle
                    _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                    $http.post($rootScope.apiUrl + 'asr/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('ASR', _local.FlightId, function () {
                                db.Put('ASR', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceASR(_server).then(rp => { });
                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'asr/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('ASR', _local.FlightId, function () {
                                    db.Put('ASR', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });

        //var promises = [];
        //var checkResults = [];
        //$.each(asrs, function (_i, asr) {
        //    var dto = { JLDate: flight.JLDate, CrewId: flight.CrewId, FlightId: flight.FlightId };
        //    promises.push($http.post($rootScope.apiUrl + 'flight/log/check', dto).then(cr => { checkResults.push({ flt: flight, result: cr }); }));
        //});



    };

    //tolnd
    var _autoSyncTOLND = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.TOLND
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no tolnds found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'tocard/flights', dto).then(sr => {
            console.log('tolnd server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle
                    _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                    $http.post($rootScope.apiUrl + 'tocard/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('TOLND', _local.FlightId, function () {
                                db.Put('TOLND', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceTOLND(_server).then(rp => { });
                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'tolnd/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('TOLND', _local.FlightId, function () {
                                    db.Put('TOLND', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });

       



    };

    var _autoSyncTOLND2 = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.TOLND2
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no tolnds2 found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'tocard/flights', dto).then(sr => {
            console.log('tolnd2 server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle
                    _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                    $http.post($rootScope.apiUrl + 'tocard/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('TOLND2', _local.FlightId, function () {
                                db.Put('TOLND2', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceTOLND2(_server).then(rp => { });
                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'tolnd/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('TOLND2', _local.FlightId, function () {
                                    db.Put('TOLND2', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });





    };

    var _autoSyncVR = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.VR
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no vrs found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'vr/flights', dto).then(sr => {
            console.log('vr server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle
                    _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                    $http.post($rootScope.apiUrl + 'voyage/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('VR', _local.FlightId, function () {
                                db.Put('VR', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceVR(_server).then(rp => { });

                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'voyage/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('VR', _local.FlightId, function () {
                                    db.Put('VR', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });




    };



    var _autoSyncDR = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.DR
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no drs found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'dr/flights', dto).then(sr => {
            console.log('dr server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle

                    $http.post($rootScope.apiUrl + 'dr/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('DR', _local.FlightId, function () {
                                db.Put('DR', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceDR(_server).then(rp => { });

                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'dr/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('DR', _local.FlightId, function () {
                                    db.Put('DR', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });




    };


    var _autoSyncOFP = async function (callback) {
        var _db = db.getDb();
        var asrs = await _db.OFP
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {
            callback({
                total: 0,
                synced: 0,
                remark: 'no ofps found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.FlightId').ToArray();
        var dto = { ids: flightIds };
        $http.post($rootScope.apiUrl + 'ofp/flights', dto).then(sr => {
            console.log('ofp server result', sr);
            var resps = sr.data.Data;

            $.each(asrs, function (_i, _local) {
                var _server = Enumerable.From(resps).Where('$.FlightId==' + _local.FlightId).FirstOrDefault();
                if (!_server) {
                    console.log('update server 0 ' + _local.FlightId);
                    ////// UPDATE SERVER /////////////////////
                    _local.User = $rootScope.userTitle

                    $http.post($rootScope.apiUrl + 'ofp/save', _local).then(function (response1) {
                        if (response1.data.IsSuccess) {

                            var item = response1.data.Data;
                            item.IsSynced = 1;
                            db.Delete('OFP', _local.FlightId, function () {
                                db.Put('OFP', item.FlightId, item, function (dbitem) { });
                            });

                        }


                    });
                    /////////END UPDATE SERVER ////////////////////////////


                } else {
                    var _localDate = Number(_local.DateUpdate);
                    var _serverDate = Number(_server.DateUpdate);
                    if (_serverDate >= _localDate) {
                        console.log('update local ' + _local.FlightId);
                        ///////////////// UPDATE LOCAL ///////////////////
                        _epReplaceOFP(_server).then(rp => { });

                        ////////////////END UPDATE LOCAL //////////////////
                    }
                    else {
                        console.log(_serverDate + '   local: ' + _localDate);
                        console.log('update server 1 ' + _local.FlightId);
                        /////////////////UPDATE SERVER //////////////////////////
                        _local.User = $rootScope.userTitle
                        _local.OccurrenceDate = moment(new Date(_local.OccurrenceDate)).format('YYYY-MM-DD-HH-mm');
                        $http.post($rootScope.apiUrl + 'ofp/save', _local).then(function (response1) {
                            if (response1.data.IsSuccess) {

                                var item = response1.data.Data;
                                item.IsSynced = 1;
                                db.Delete('OFP', _local.FlightId, function () {
                                    db.Put('OFP', item.FlightId, item, function (dbitem) { });
                                });

                            }


                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }
                }

            });


        });




    };



    //10-03
    var _autoSyncOFPProp = async function (callback) {

        var _db = db.getDb();
        var asrs = await _db.OFPProp
            .filter(function (asr) {

                return asr.IsSynced == 0;
            }).toArray();

        if (!asrs || asrs.length == 0) {

            callback({
                total: 0,
                synced: 0,
                remark: 'no ofp props found',
            });
            return;
        }
        var logResult = { total: asrs.length };
        var flightIds = Enumerable.From(asrs).Select('$.Id').ToArray();

        var dto = { ids: flightIds };

        //////9-29 ///////
        var serverUpdates = [];
        $.each(asrs, function (_i, _local) {
            _local.User = $rootScope.userTitle
            serverUpdates.push(_local);
        });
        if (serverUpdates.length > 0) {
            /////////////////UPDATE SERVER //////////////////////////
            $http.post($rootScope.apiUrl + 'ofp/props/save', serverUpdates).then(function (response1) {
                if (response1.data.IsSuccess && response1.data.Data && response1.data.Data.length > 0) {
                    $.each(response1.data.Data, function (_i, _r) {
                        _r.IsSynced = 1;
                        db.DeleteOFPPropById(_r.Id, function () {
                            db.PutOFPPropById(_r.Id, _r, function (dbitem) { });
                        });
                    });
                }
            });
            ////////////////END UPDATE SERVER //////////////////////
        }
        /////////////////
        /////////////////
        ////////END OF 9-29/////////


        //$http.post($rootScope.apiUrl + 'ofp/props/ids', dto).then(sr => {

        //    var resps = sr.data.Data;
        //    var serverUpdates = [];
        //    $.each(asrs, function (_i, _local) {
        //        var _server = Enumerable.From(resps).Where('$.Id==' + _local.Id).FirstOrDefault();
        //        if (_server) {
        //            var _localDate = Number(_local.DateUpdate);
        //            var _serverDate = Number(_server.DateUpdate);
        //            if (_serverDate >= _localDate) {
        //                ///////////////// UPDATE LOCAL ///////////////////
        //                _epReplaceOFPProp(_server).then(rp => { });
        //                ////////////////END UPDATE LOCAL //////////////////
        //            }
        //            else {


        //                _local.User = $rootScope.userTitle
        //                serverUpdates.push(_local);


        //            }




        //        }

        //    });

        //    if (serverUpdates.length > 0) {
        //        /////////////////UPDATE SERVER //////////////////////////
        //        $http.post($rootScope.apiUrl + 'ofp/props/save', serverUpdates).then(function (response1) {
        //            if (response1.data.IsSuccess && response1.data.Data && response1.data.Data.length > 0) {
        //                $.each(response1.data.Data, function (_i, _r) {
        //                    _r.IsSynced = 1;
        //                    db.DeleteOFPPropById(_r.Id, function () {
        //                        db.PutOFPPropById(_r.Id, _r, function (dbitem) { });
        //                    });
        //                });
        //            }
        //        });
        //        ////////////////END UPDATE SERVER //////////////////////
        //    }



        //});






    };
    //10-03
    //12-03-changed
    var _syncUnsignedOFPS = function (callback) {

          
        var _db = db.getDb();
        _db.OFP
            .filter(function (asr) {
                var diff = Math.abs((new Date()).getTime() - (new Date(asr.DateCreate)).getTime()) / 3600000;
                 
                var condition = !asr.JLSignedBy && (diff <= 24 * 3);
                return condition;
            }).toArray(function (ofps) {
                
                console.log('unsigned ofps   ', ofps);
                if (!ofps || ofps.length == 0) {
                    callback({
                        total: 0,
                        synced: 0,
                        remark: 'no ofps found',
                    });
                    return;
                }
                else {
                    var ofpIds = Enumerable.From(ofps).Select('$.Id').ToArray();
                    var tick = performance.now();
                    //_db.OFPProp.filter(function (asr) {
                    //    return ofpIds.indexOf(asr.OFPId) != -1 && (asr.PropValue || asr.PropValue===0);
                    //})
                    _db.OFPProp.where('OFPId').anyOf(ofpIds)
                    .toArray(function (asrs) {
                        var tock = performance.now();
                        asrs = Enumerable.From(asrs).Where(function (x) { return x.PropValue || x.PropValue === 0;}).ToArray();
                        console.log('unsigned ofps props   ', asrs.length);
                        console.log(tock - tick);
                        if (!asrs || asrs.length == 0) {

                            callback({
                                total: 0,
                                synced: 0,
                                remark: 'no ofp props found',
                            });
                            return;
                        }
                        var logResult = { total: asrs.length };
                        var flightIds = Enumerable.From(asrs).Select('$.Id').ToArray();

                        var dto = { ids: flightIds };

                        $http.post($rootScope.apiUrl + 'ofp/props/ids', dto).then(sr => {

                            var resps = sr.data.Data;
                            var serverUpdates = [];
                            $.each(asrs, function (_i, _local) {
                                var _server = Enumerable.From(resps).Where('$.Id==' + _local.Id).FirstOrDefault();
                                if (_server) {
                                    var _localDate = Number(_local.DateUpdate);
                                    var _serverDate = Number(_server.DateUpdate);
                                    if (_serverDate >= _localDate && false) {
                                        ///////////////// UPDATE LOCAL ///////////////////
                                        _epReplaceOFPProp(_server).then(rp => { });
                                        ////////////////END UPDATE LOCAL //////////////////
                                    }
                                    else {


                                        _local.User = $rootScope.userTitle
                                        serverUpdates.push(_local);


                                    }




                                }

                            });

                            if (serverUpdates.length > 0) {
                                /////////////////UPDATE SERVER //////////////////////////
                                $http.post($rootScope.apiUrl + 'ofp/props/save', serverUpdates).then(function (response1) {
                                    if (response1.data.IsSuccess && response1.data.Data && response1.data.Data.length > 0) {
                                        $.each(response1.data.Data, function (_i, _r) {
                                            _r.IsSynced = 1;
                                            db.DeleteOFPPropById(_r.Id, function () {
                                                db.PutOFPPropById(_r.Id, _r, function (dbitem) { });
                                            });
                                        });
                                    }
                                });
                                ////////////////END UPDATE SERVER //////////////////////
                            }



                        });

                         ////////////////// END UPDATE //////////////////////////
                    });

                }

            });

    };
    var _syncOFPProps = function (ofpId, overwrite, callback) {

        var _db = db.getDb();
        _db.OFPProp
            .filter(function (asr) {

                return asr.OFPId == ofpId;
            }).toArray(function (asrs) {
                /////// BEGIN ///////////////////
                if (!asrs || asrs.length == 0) {

                    callback({
                        total: 0,
                        synced: 0,
                        remark: 'no ofp props found',
                    });
                    return;
                }
                var logResult = { total: asrs.length };
                var flightIds = Enumerable.From(asrs).Select('$.Id').ToArray();

                var dto = { ids: flightIds };

                $http.post($rootScope.apiUrl + 'ofp/props/ids', dto).then(sr => {

                    var resps = sr.data.Data;
                    var serverUpdates = [];
                    $.each(asrs, function (_i, _local) {
                        var _server = Enumerable.From(resps).Where('$.Id==' + _local.Id).FirstOrDefault();
                        if (_server) {
                            var _localDate = Number(_local.DateUpdate);
                            var _serverDate = Number(_server.DateUpdate);
                            if (_serverDate >= _localDate && !overwrite) {
                                ///////////////// UPDATE LOCAL ///////////////////
                                _epReplaceOFPProp(_server).then(rp => { });
                                ////////////////END UPDATE LOCAL //////////////////
                            }
                            else {


                                _local.User = $rootScope.userTitle
                                serverUpdates.push(_local);


                            }




                        }

                    });

                    if (serverUpdates.length > 0) {
                        /////////////////UPDATE SERVER //////////////////////////
                        $http.post($rootScope.apiUrl + 'ofp/props/save', serverUpdates).then(function (response1) {
                            if (response1.data.IsSuccess && response1.data.Data && response1.data.Data.length > 0) {
                                $.each(response1.data.Data, function (_i, _r) {
                                    _r.IsSynced = 1;
                                    db.DeleteOFPPropById(_r.Id, function () {
                                        db.PutOFPPropById(_r.Id, _r, function (dbitem) { });
                                    });
                                });
                            }
                        });
                        ////////////////END UPDATE SERVER //////////////////////
                    }



                });



                /////// END  ///////////////////////
            });






    };

    var _checkLock = function (flightId, doc) {

        var deferred = $q.defer();

        $http.get($rootScope.apiUrl + 'check/lock/' + flightId + '/' + doc).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            //deferred.reject(Exceptions.getMessage(err));
            deferred.resolve("error");
        });

        return deferred.promise;
    };


    var _getJL = function (fid) {
        var _api = serviceBaseAPI;
       // _api = 'http://fleet.caspianairlines.com/airpocketexternal/';
        var deferred = $q.defer();
        $http.get( _api + "api/jl/" + fid /*'http://fleet.caspianairlines.com/airpocketexternal/api/jl/71952'*/).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {
            alert(JSON.stringify(err));
            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.getJL = _getJL;

    //12-04
    var _getOFPCheckSign = function (ofpid) {
        // _api = 'http://fleet.caspianairlines.com/airpocketexternal/';
        var deferred = $q.defer();
        var _api = serviceBaseAPI;


        if ($rootScope.online) {
            _checkInternet(function (st) {
                if (st) {



                    $http.get(_api + "api/ofp/sign/check/" + ofpid /*'http://fleet.caspianairlines.com/airpocketexternal/api/jl/71952'*/).then(function (response) {
                        deferred.resolve(response.data.Data);
                    }, function (err, status) {
                         
                        deferred.reject(Exceptions.getMessage(err));
                    });



                }
                else {
                    deferred.resolve(null);
                }
            });
        }


      
        

        return deferred.promise;
    };
    serviceFactory.getOFPCheckSign = _getOFPCheckSign;

    var _signOFPLocal = function (id, entity) {
        console.log('_signOFPLocal');
        var deferred = $q.defer();
       
        var _db = db.getDb();
        _db['OFP'].get({ FlightId: id }).then(function (item) {
            if (!item) {
              
                deferred.reject('no record found');
                return;
            }
            item.PICId = entity.PICId;
            item.PIC = entity.PIC;
            item.JLSignedBy = entity.JLSignedBy;
            item.JLDatePICApproved = entity.JLDatePICApproved;
            _db['OFP'].put(item).then(
                function (suc) {   deferred.resolve(suc); },
                function (err) {   deferred.reject('update failed'); }
            );
        });
             

        return deferred.promise;
    };
    serviceFactory.signOFPLocal = _signOFPLocal;



    var _signOFPLocalGroup = function (dto) {
        
        dto = Enumerable.From(dto).Where('$').ToArray();
        console.log('_signOFPLocalGROUP', dto);
        var fltIds = Enumerable.From(dto).Select('$.FlightId').ToArray();
        

        var _db = db.getDb();
        _db.OFP.where('FlightId').anyOf(fltIds).toArray(function (items) {
            if (items && items.length > 0) {
                $.each(items, function (_i, _d) {
                    var res = Enumerable.From(dto).Where('$.Id==' + _d.Id).FirstOrDefault();
                    if (res) {
                        _d.PICId = res.PICId;
                        _d.PIC = res.PIC;
                        _d.JLSignedBy = res.JLSignedBy;
                        _d.JLDatePICApproved = res.JLDatePICApproved;
                    }
                });
                _db.OFP.bulkPut(items).then(function (lastKey) {

                    console.log("all ofp signed: " + lastKey); // Will be 100000.
                }).catch(Dexie.BulkError, function (e) {

                    console.error("error in  sign all ofp");
                });

            }
             
        });
         

         
    };
    serviceFactory.signOFPLocalGroup = _signOFPLocalGroup;


    var _checkUnsignedOFPs = function () {
        console.log('check unsigned ofps');
        // _api = 'http://fleet.caspianairlines.com/airpocketexternal/';
        
        var _api = serviceBaseAPI;
        var _db = db.getDb();
        _db.OFP
            .filter(function (ofp) {

                return !ofp.JLSignedBy;
            }).toArray().then(function (ofps) {

                if (ofps && ofps.length > 0) {

                    var Ids = Enumerable.From(ofps).Select('$.Id').ToArray();
                    var dto = { flightIds: [], ofpIds:Ids };
                    if ($rootScope.online) {

                        $http.post(_api + "api/ofp/sign/check/group/" ,dto /*'http://fleet.caspianairlines.com/airpocketexternal/api/jl/71952'*/).then(function (response) {
                            if (response.data.Data && response.data.Data.length > 0) {
                                var signed = [];
                                $.each(response.data.Data, function (_i, _d) {
                                    var item = Enumerable.From(ofps).Where('$.Id==' + _d.Id).FirstOrDefault();
                                    if (item) {
                                        item.PICId = _d.PICId;
                                        item.PIC = _d.PIC;
                                        item.JLSignedBy = _d.JLSignedBy;
                                        item.JLDatePICApproved = _d.JLDatePICApproved;
                                        signed.push(item);

                                    }
                                });
                                if (signed.length>0)
                                _db.OFP.bulkPut(signed).then(function (lastKey) {
                                    
                                    console.log("Last ofp's id was: " + lastKey); // Will be 100000.
                                }).catch(Dexie.BulkError, function (e) {
                                    
                                    console.error("error in chek sign group");
                                });

                            }

                        }, function (err, status) {

                           
                        });
                    }
                }

            });

         





        
    };
    serviceFactory.checkUnsignedOFPs = _checkUnsignedOFPs;


    var _epGetATL = function (fdp) {

        var deferred = $q.defer();
        db.GetDoc({ FDPId: fdp, FlightId: -1, Type: 'ATL' }, function (_dbitem) {
            var dbitem = _dbitem;
            var dbitemdate = dbitem ? DateTimeToNumber(new Date(dbitem.Date)) : -1;
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {



                        $http.get($rootScope.apiUrl + 'doc/-1/'+fdp+'/ATL' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data && DateTimeToNumber(new Date(response.data.Data.Date)) > dbitemdate) {
                                db.DeleteDoc(fdp, -1, 'ATL', function () {
                                    db.AddDoc({ FDPId: fdp, FlightId: -1, Type: 'ATL', Data: response.data.Data.Data, Date: moment(new Date(response.data.Data.Date)).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: true }, function () { });
                                });
                                deferred.resolve(response.data);
                            }
                            else if (response.data.IsSuccess && response.data.Data && DateTimeToNumber(new Date(response.data.Data.Date)) < dbitemdate) {
                                var dto = { FDPId: fdp, FlightId: -1, Data: dbitem.Data, Type: 'ATL', Date: new Date(dbitem.Date) };
                                _saveDoc(dto).then(function (response) {

                                }, function (err) { });

                                var _data = { IsSuccess: 1, Data: dbitem };

                                deferred.resolve(_data);

                            }
                            else {
                                var _data = { IsSuccess: 1, Data: dbitem };

                                deferred.resolve(_data);
                            }


                        }, function (err, status) {

                            deferred.reject(Exceptions.getMessage(err));
                        });


                    }
                    else {
                        //offline
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });
            }

            else {
                //offline
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }



        });



        return deferred.promise;


        ////////////////////////////////////
        ////////////////////////////////

        var deferred = $q.defer();
        db.GetDoc({ FDPId: fdp, FlightId: -1, Type: 'ATL' }, function (_dbitem) {
            var dbitem = _dbitem;

            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                        //$http.get($rootScope.apiUrl + 'tocard/flight/' + flightId + '/LND' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                        //    if (response.data.IsSuccess && response.data.Data) {
                        //        db.Clear("TOLND2", function () {
                        //            response.data.Data.IsSynced = 1;
                        //            db.Put('TOLND2', response.data.Data.Id, response.data.Data, function (dbitem) {
                        //                deferred.resolve(response.data);
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
                        //offline
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });
            }

            else {
                //offline
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }



        });



        return deferred.promise;
    };
    serviceFactory.epGetATL = _epGetATL;


    var _epGetLoadSheet = function (fdp) {

        var deferred = $q.defer();
        db.GetDoc({ FDPId: -1, FlightId: fdp, Type: 'LOADSHEET' }, function (_dbitem) {
            var dbitem = _dbitem;
            var dbitemdate =dbitem? DateTimeToNumber(new Date(dbitem.Date)):-1;
            //return DateToNumber(new Date(rec.DateStart)) >= _from && DateToNumber(new Date(rec.DateStart)) <= _to && rec.ConfirmedBy == GlobalUserId;
            //alert(DateTimeToNumber(new Date(dbitem.Date)));
            if ($rootScope.getOnlineStatus()) {
                _checkInternet(function (st) {
                    if (st) {
                        


                        $http.get($rootScope.apiUrl + 'doc/' + fdp + '/-1/LOADSHEET' /*+ '?from=' + _df + '&to=' + _dt*/).then(function (response) {
                            if (response.data.IsSuccess && response.data.Data && DateTimeToNumber(new Date(response.data.Data.Date)) > dbitemdate) {
                                db.DeleteDoc(-1, fdp, 'LOADSHEET', function () {
                                    db.AddDoc({ FDPId: -1, FlightId: fdp, Type: 'LOADSHEET', Data: response.data.Data.Data, Date: moment(new Date(response.data.Data.Date)).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: true }, function () {});
                                });
                                deferred.resolve(response.data);
                            }
                            else if (response.data.IsSuccess && response.data.Data && DateTimeToNumber(new Date(response.data.Data.Date)) < dbitemdate) {
                                var dto = { FDPId: -1, FlightId: fdp, Data: dbitem.Data, Type: 'LOADSHEET', Date: new Date(dbitem.Date)};
                                _saveDoc(dto).then(function (response) {
                                   
                                }, function (err) { });

                                 var _data = { IsSuccess: 1, Data: dbitem };

                                 deferred.resolve(_data); 

                            }
                            else {
                                var _data = { IsSuccess: 1, Data: dbitem };

                                deferred.resolve(_data); 
                            }


                        }, function (err, status) {

                            deferred.reject(Exceptions.getMessage(err));
                        });


                    }
                    else {
                        //offline
                        var data = { IsSuccess: 1, Data: dbitem };

                        deferred.resolve(data);
                    }
                });
            }

            else {
                //offline
                var data = { IsSuccess: 1, Data: dbitem };

                deferred.resolve(data);
            }



        });



        return deferred.promise;
    };
    serviceFactory.epGetLoadSheet = _epGetLoadSheet;


    var _epGetVacationForms = function () {
        //mool
        
        var deferred = $q.defer();
        $http.get($rootScope.apiUrl + 'crew/forms/vacation/'  ).then(function (response) {
            deferred.resolve(response.data);

           


        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;





    };
    serviceFactory.epGetVacationForms = _epGetVacationForms;

    var _saveVacationForm = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.apiUrl + 'crew/forms/vacation/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.saveVacationForm = _saveVacationForm;




    var _saveDoc = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.apiUrl + 'doc/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    serviceFactory.saveDoc = _saveDoc;


    var _getFC = function (flt,dt) {
        //mool

        var deferred = $q.defer();
        $http.get(XAPI + 'api/fc/'+flt+'/'+dt).then(function (response) {
            deferred.resolve(response.data);
             
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;





    };
    serviceFactory.getFC = _getFC;




    //////////////////////////////////
    var _saveRequestedFuel = async function (entity) {

        var deferred = $q.defer();
        var _db = db.getDb();

        $http.post($rootScope.apiUrl + 'fuel/requested/save', entity).then(function (response) {

            _db.AppCrewFlights.update(entity.FlightId, { ALT3: entity.Due, FuelPlanned:entity.Fuel }).then(function (res) {
                console.log('req fuel',res);
            });


            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
        //var deferred = $q.defer();
        //var _db = db.getDb();
        //var _names = Enumerable.From(objs).Select('$.PropName').ToArray();
        //var _props = await _db.OFPProp.where("OFPId").equals(_ofpId).toArray();
        //_props = Enumerable.From(_props).Where(function (x) { return _names.indexOf(x.PropName) != -1; }).ToArray();
        
        //$.each(objs, function (_w, entity) {
        //    entity.IsSynced = 1;
        //    db.GetOFPPropByName2(entity.OFPId, entity.PropName, _props, function (_result) {
                
        //        if (!_result) {
        //            deferred.reject("no property found in local db :" + entity.PropName);
        //            return;
        //        }
        //        entity.Id = _result.Id;
        //        entity.DateUpdate = momentUtcNowStringSecond();
        //        db.PutOFPProp(entity.OFPId, entity.PropName, entity, function (row) {

        //            if ($rootScope.getOnlineStatus()) {
        //                console.log('     sending server');
        //                $http.post($rootScope.apiUrl + 'ofp/prop/save', entity).then(function (response) {
        //                    if (response.data.IsSuccess) {
                               
        //                        var item = response.data.Data;
        //                        item.IsSynced = 1;
        //                        db.DeleteOFPProp(item.OFPId, item.PropName, function () {
        //                            db.PutOFPProp2(item.OFPId, item.PropName, item, function (dbitem) {
        //                                console.log('     sending server done');
        //                                deferred.resolve({ Data: dbitem, IsSuccess: 1 });
        //                            });
        //                        });

        //                    }
        //                    else
        //                        deferred.resolve(response.data);

        //                }, function (err, status) {

        //                    deferred.reject(Exceptions.getMessage(err));
        //                });
        //            }
        //            else {

        //                row.IsSynced = 0

        //                db.deSyncedOFPProp(entity.OFPId, entity.PropName, function () {

        //                    deferred.resolve({ Data: row, IsSuccess: 1 });
        //                });
        //            }
        //        });


        //    });
        //});

        





        //return deferred.promise;


    };
    serviceFactory.saveRequestedFuel = _saveRequestedFuel;
    //////////////////////////////////
    serviceFactory.checkInternet = _checkInternet;
    serviceFactory.checkLock = _checkLock;
    serviceFactory.autoSyncLogs = _autoSyncLogs;
    serviceFactory.autoSyncLogsNew = _autoSyncLogsNew;
    serviceFactory.autoSyncASR = _autoSyncASR;
    serviceFactory.autoSyncVR = _autoSyncVR;
    serviceFactory.autoSyncDR = _autoSyncDR;
    serviceFactory.autoSyncOFP = _autoSyncOFP;
    serviceFactory.autoSyncOFPProp = _autoSyncOFPProp;
    serviceFactory.syncOFPProps = _syncOFPProps;
    serviceFactory.syncUnsignedOFPS = _syncUnsignedOFPS;
    serviceFactory.epGetDRByFlight = _epGetDRByFlight;
    serviceFactory.epGetDRsByFlights = _epGetDRsByFlights;
    serviceFactory.epGetOFPByFlight = _epGetOFPByFlight;
    serviceFactory.epGetOFPByFlights = _epGetOFPByFlights;
    serviceFactory.epGetOFPProps = _epGetOFPProps;
    serviceFactory.epGetASRByFlight = _epGetASRByFlight;
    serviceFactory.saveASR = _saveASR;
    serviceFactory.saveDR = _saveDR;
    serviceFactory.saveOFPProp = _saveOFPProp;
    serviceFactory.saveOFPPropBulk = _saveOFPPropBulk;
    serviceFactory.epGetVRByFlight = _epGetVRByFlight;
    serviceFactory.saveVR = _saveVR;
    serviceFactory.epReplaceASR = _epReplaceASR;
    serviceFactory.epReplaceVR = _epReplaceVR;
    serviceFactory.epReplaceDR = _epReplaceDR;
    serviceFactory.epReplaceOFP = _epReplaceOFP;
    serviceFactory.epReplaceOFPProp = _epReplaceOFPProp;

    serviceFactory.updateTAFs = _updateTAFs;
    serviceFactory.updateMETARs = _updateMETARs;
    serviceFactory.updateNOTAMs = _updateNOTAMs;
    serviceFactory.getTAFs = _getTAFs;
    serviceFactory.getMETARs = _getMETARs;
    serviceFactory.getNOTAMs = _getNOTAMs;
    serviceFactory.epGetCrewFlights = _epGetCrewFlights;

    serviceFactory.epGetFlightCrews = _epGetFlightCrews;
    serviceFactory.epGetFlightCommanders = _epGetFlightCommanders;
    serviceFactory.epGetFlight = _epGetFlight;
    serviceFactory.epGetFlightLocal = _epGetFlightLocal;
    serviceFactory.epGetFlightDelays = _epGetFlightDelays;
    serviceFactory.epSaveLog = _epSaveLog;
    serviceFactory.epSaveLogNew = _epSaveLogNew;
    serviceFactory.signDoc = _signDoc;
    serviceFactory.signDocJL = _signDocJL;
    serviceFactory.signDocLocal = _signDocLocal;
    serviceFactory.signDocLocalJL = _signDocLocalJL;
    serviceFactory.epCheckLog = _epCheckLog;
    serviceFactory.epSyncFlight = _epSyncFlight;
    serviceFactory.epSaveLogOverwriteServer = _epSaveLogOverwriteServer;

    serviceFactory.epGetCrewCalendar = _epGetCrewCalendar;
    serviceFactory.epGetCrewDuties = _epGetCrewDuties;

    ///////////////////////////////////

    serviceFactory.getSun = _getSun;
    serviceFactory.getSunFlight = _getSunFlight;
    serviceFactory.getFlight = _getFlight;
    serviceFactory.updateFDPTimes = _updateFDPTimes;
    serviceFactory.removeFlightFromFDP = _removeFlightFromFDP;
    serviceFactory.updateFlightStatus = _updateFlightStatus;
    serviceFactory.getCrewFDPs = _getCrewFDPs;
    serviceFactory.getCrewFDP = _getCrewFDP;
    serviceFactory.getCrewFlights = _getCrewFlights;
    serviceFactory.getCrewFlightsByFDP = _getCrewFlightsByFDP;
    serviceFactory.getCrewFlightsReport = _getCrewFlightsReport;
    serviceFactory.getCrewFlightsGrouped = _getCrewFlightsGrouped;
    serviceFactory.getFlightCrews = _getFlightCrews;
    serviceFactory.addFlightToFDP = _addFlightToFDP;
    serviceFactory.updateCPFDP = _updateCPFDP;
    serviceFactory.updateFlightFDP = _updateFlightFDP;
    serviceFactory.updateFlightFDPDirect = _updateFlightFDPDirect;
    serviceFactory.saveFDP = _saveFDP;
    serviceFactory.saveDuty = _saveDuty;
    serviceFactory.getCrewFDPsFTL = _getCrewFDPsFTL;
    serviceFactory.getCrewFDPsFlights = _getCrewFDPsFlights;
    serviceFactory.getCrewFDPsDuties = _getCrewFDPsDuties;



    //tolnd
    serviceFactory.autoSyncTOLND = _autoSyncTOLND;
    serviceFactory.epGetTOLNDByFlight = _epGetTOLNDByFlight;
    serviceFactory.saveTOLND = _saveTOLND;
    serviceFactory.epReplaceTOLND = _epReplaceTOLND;


    serviceFactory.autoSyncTOLND2 = _autoSyncTOLND2;
    serviceFactory.epGetTOLND2ByFlight = _epGetTOLND2ByFlight;
    serviceFactory.saveTOLND2 = _saveTOLND2;
    serviceFactory.epReplaceTOLND2 = _epReplaceTOLND2;

    return serviceFactory;

}]);