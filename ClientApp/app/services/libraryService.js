'use strict';
app.factory('libraryService', ['$http', '$q', 'ngAuthSettings', '$rootScope', function ($http, $q, ngAuthSettings, $rootScope) {



    var serviceFactory = {};


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


    var _getKeywords = function () {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/keywords'  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getBook = function (id) {

         
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/book/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
var _getEmployeeBook = function (id,itemId) {

         
        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/employees/library/item/' + id+"/"+itemId).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getBookApplicableEmployees = function (id) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/books/applicable/employees/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getPersonLibrary = function (id, type) {

        var deferred = $q.defer();
        if ($rootScope.online) {
            $http.get($rootScope.apiUrl + 'employees/library/' + id + '/' + Config.CustomerId + (type ? '/' + type : '')).then(function (response) {
                //if ($rootScope.isServerMode)
                deferred.resolve(response.data);
                //else if (response.data.IsSuccess)
                //    db.sync.SyncFlightCrews(flightId, response.data.Data, function (syncResult) {

                //        deferred.resolve(syncResult);
                //    });
            }, function (err, status) {

                deferred.reject(Exceptions.getMessage(err));
            });
        }
        else if (!$rootScope.isServerMode) {
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }


        return deferred.promise;
        //////////////////////////
         
        //var deferred = $q.defer();
        //$http.get(serviceBase + 'odata/employees/library/' + id+'/'+Config.CustomerId+(type?'/'+type:'')).then(function (response) {
        //    deferred.resolve(response.data);
        //}, function (err, status) {

        //    deferred.reject(Exceptions.getMessage(err));
        //});

        //return deferred.promise;
    };

    var _visitFile = function (eid, fid) {
        var entity = { employeeId: eid, fileId:fid};
        var deferred = $q.defer();
        $http.post($rootScope.apiUrl + 'file/visit/', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //05-22
    var _pifbase = "https://fleet.caspianairlines.com/apinetplan/";
    var _getCrewPIFs = function (id) {

        var deferred = $q.defer();
        $http.get(_pifbase + 'odata/pifs/' + id  ).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getCrewMemos = function (id) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/memos/' + id).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _getLastExposed = function (cid,   top) {

        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/library/exposed/' + cid +'?orderby=DateExposure desc&top='+top).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _exposeBook = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/library/book/expose', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _save = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/library/book/save', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    //var _delete = function (entity) {
    //    var deferred = $q.defer();
    //    $http.post($rootScope.serviceUrl + 'odata/locations/delete', entity).then(function (response) {
    //        deferred.resolve(response.data);
    //    }, function (err, status) {

    //        deferred.reject(Exceptions.getMessage(err));
    //    });

    //    return deferred.promise;
    //};

    //serviceFactory.getEmployee = _getEmployee;


    var _getFoldersItems_ = function (uid, fid,pid) {

        var deferred = $q.defer();
        if ($rootScope.online) {
            $http.get($rootScope.apiUrl + 'base/library/employee/folder/' + uid + '/' + fid + '/' + pid + '/' + Config.CustomerId).then(function (response) {
                
                    deferred.resolve(response.data);
                 
            }, function (err, status) {

                deferred.reject(Exceptions.getMessage(err));
            });
        }
        else if (!$rootScope.isServerMode) {
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }
        

        return deferred.promise;
    };

    var _getFoldersItems = function (uid, fid, pid) {

        var deferred = $q.defer();

        /*
        if ($rootScope.online) {
            $http.get($rootScope.apiUrl + 'base/library/employee/folder/' + uid + '/' + fid + '/' + pid + '/' + Config.CustomerId).then(function (response) {

                deferred.resolve(response.data);

            }, function (err, status) {

                deferred.reject(Exceptions.getMessage(err));
            });
        }
        else if (!$rootScope.isServerMode) {
        }
        else {
            deferred.resolve({ Data: [], IsSuccess: 0 });
        }*/

        if ($rootScope.getOnlineStatus()) {
            _checkInternet(function (st) {
                if (st) {
                    $http.get($rootScope.apiUrl + 'base/library/employee/folder/' + uid + '/' + fid + '/' + pid + '/' + Config.CustomerId).then(function (response) {

                        // deferred.resolve(response.data);
                        var data = response.data.Data;
                        console.log(data);
                        db.ClearLib(function () {
                            
                            db.PutLib(data.foldersAll, data.itemsAll, data.filesAll, function () {
                                db.GetLib(pid,fid,function (result) {
                                    
                                    deferred.resolve({ IsSuccess: true, Data: result });
                                });
                            });
                        });

                    }, function (err, status) {

                        deferred.reject(Exceptions.getMessage(err));
                    });
                }
                else {
                    db.GetLib(pid, fid,function (result) { deferred.resolve({ IsSuccess:true,Data: result }); });
                }
            });
        }
        else {
            //getonlinestatus
            db.GetLib(pid, fid,function (result) { deferred.resolve({ IsSuccess: true, Data: result }); });
        }


        return deferred.promise;
    };



    serviceFactory.save = _save;
    serviceFactory.visitFile = _visitFile;
    serviceFactory.exposeBook = _exposeBook;
    serviceFactory.getBook = _getBook;
    serviceFactory.getEmployeeBook=_getEmployeeBook;
    serviceFactory.getPersonLibrary = _getPersonLibrary;
    serviceFactory.getCrewPIFs = _getCrewPIFs;
    serviceFactory.getCrewMemos = _getCrewMemos;
    serviceFactory.getKeywords = _getKeywords;
    serviceFactory.getBookApplicableEmployees = _getBookApplicableEmployees;
    serviceFactory.getLastExposed = _getLastExposed;
    serviceFactory.getFoldersItems = _getFoldersItems;
    //serviceFactory.delete = _delete;
    return serviceFactory;

}]);