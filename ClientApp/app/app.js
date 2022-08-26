﻿/// <reference path="views/flight.html" />
//v83
var app = angular.module('GriffinClientApp', ['ngRoute', 'LocalStorageModule', 'angular-loading-bar', 'dx', 'ngSanitize', 'ngAnimate']).config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;

}])
//.factory("$exceptionHandler", function () {
//    return function (exception, cause) {
//        alert(cause);
//        alert(exception);
//    };
//});


var routePrefix = "app";
app.config(function ($routeProvider) {
    //console.log('route');
    //console.log($routeProvider);

    $routeProvider.when("/apps", {
        controller: "appsController",
        templateUrl: routePrefix + "/views/apps.html?v=20"
    });
    //$routeProvider.when("/home", {
    //    controller: "homeController",
    //    templateUrl: routePrefix + "/views/home.html"
    //});

    $routeProvider.when("/login", {
        controller: "loginController",
        templateUrl: routePrefix + "/views/login.html?vx=2"
    });

    $routeProvider.when("/password", {
        controller: "passwordChangeController",
        templateUrl: routePrefix + "/views/passwordChange.html?v=20"
    });

    $routeProvider.when("/register/1", {
        controller: "register1Controller",
        templateUrl: routePrefix + "/views/register1.html?v=20"
    });

    $routeProvider.when("/register/0", {
        controller: "register0Controller",
        templateUrl: routePrefix + "/views/register0.html?v=20"
    });

    $routeProvider.when("/signup", {
        controller: "signupController",
        templateUrl: routePrefix + "/views/signup.html?v=20"
    });



    $routeProvider.when("/refresh", {
        controller: "refreshController",
        templateUrl: routePrefix + "/views/refresh.html?v=20"
    });

    $routeProvider.when("/tokens", {
        controller: "tokensManagerController",
        templateUrl: routePrefix + "/views/tokens.html?v=20"
    });

    $routeProvider.when("/associate", {
        controller: "associateController",
        templateUrl: routePrefix + "/views/associate.html?v=20"
    });
    //$routeProvider.when("/appflight", {
    //    controller: "appFlightController",
    //    templateUrl: routePrefix + "/views/flights.html?v=20"

    //});
    $routeProvider.when("/appflight", {
        controller: "mbController",
        templateUrl: routePrefix + "/views/mb.html?vx=2"

    });
    $routeProvider.when("/appflight", {
        controller: "epLogBookController",
        templateUrl: routePrefix + "/views/flights.html?vx=2"

    });
    $routeProvider.when("/applibrary/:fid/:pid", {
        controller: "appLibraryController",
        templateUrl: routePrefix + "/views/library.html?v=20",
        //type:'all',
        type: 'book',
    });
    $routeProvider.when("/applibrary/books", {
        controller: "appLibraryController",
        templateUrl: routePrefix + "/views/library.html?v=20",
        type: 'book',
    });
    $routeProvider.when("/applibrary/papers", {
        controller: "appLibraryController",
        templateUrl: routePrefix + "/views/library.html?v=20",
        type: 'paper',
    });
    $routeProvider.when("/applibrary/videos", {
        controller: "appLibraryController",
        templateUrl: routePrefix + "/views/library.html?v=20",
        type: 'video',
    });
    $routeProvider.when("/applibrary/item/:id", {
        controller: "appLibraryItemController",
        templateUrl: routePrefix + "/views/libraryitem.html?v=20",

    });

    $routeProvider.when("/appcertificate/all", {
        controller: "appCertificateController",
        templateUrl: routePrefix + "/views/certificate.html?v=20",
        type: 'all',
    });
    $routeProvider.when("/appcertificate/last", {
        controller: "appCertificateController",
        templateUrl: routePrefix + "/views/certificate.html?vx=2",
        type: 'last',
    });

    $routeProvider.when("/appcourse/active", {
        controller: "appCourseController",
        templateUrl: routePrefix + "/views/course.html?v=20",
        type: 'active',
    });
    $routeProvider.when("/appcourse/archive", {
        controller: "appCourseController",
        templateUrl: routePrefix + "/views/course.html?v=20",
        type: 'archive',
    });
    $routeProvider.when("/appmessage", {
        controller: "appMessageController",
        templateUrl: routePrefix + "/views/message.html?v=20",

    });
    $routeProvider.when("/appdocument", {
        controller: "appDocumentController",
        templateUrl: routePrefix + "/views/document.html?v=20",

    });
    $routeProvider.when("/appdocument/item/:id", {
        controller: "appDocumentItemController",
        templateUrl: routePrefix + "/views/documentitem.html?v=20",

    });
    $routeProvider.when("/appmessage/item/:id", {
        controller: "appMessageItemController",
        templateUrl: routePrefix + "/views/messageitem.html?v=20",

    });

    $routeProvider.when("/pdfviewer/:url/:title/:id", {
        controller: "pdfViewerController",
        templateUrl: routePrefix + "/views/pdfviewer.html?v=20",

    });
    $routeProvider.when("/memoviewer/:url/:title/:id", {
        controller: "appDocumentItemController",
        templateUrl: routePrefix + "/views/appDocumentItem.html?v=20",

    });
    $routeProvider.when("/docviewer/:url/:title/:id/:bookId/:dateSigned", {
        controller: "docViewerController",
        templateUrl: routePrefix + "/views/docviewer.html?v=20",

    });



    $routeProvider.when("/appflightstatistics", {
        controller: "appFlightStatisticsController",
        templateUrl: routePrefix + "/views/flightstatistics.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/appflightlogbook", {
        controller: "appFlightLogBookController",
        templateUrl: routePrefix + "/views/flightlogbook.html?v=20",
        reloadOnSearch: false
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/appflightlogbook/:tab", {
        controller: "appFlightLogBookController",
        templateUrl: routePrefix + "/views/flightlogbook.html?v=20",
        reloadOnSearch: false,
        //type:'all',
        // type: 'book',
    });


    $routeProvider.when("/appflightnew", {
        controller: "appFlightNewController",
        //templateUrl: "/app/views/appflightnew.html",
        templateUrl: routePrefix + "/views/flightnew.html?v=20",

        //type:'all',
        // type: 'book',
    });


    $routeProvider.when("/appdocumentother", {
        controller: "appDocumentOtherController",
        templateUrl: routePrefix + "/views/DocumentOther.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/register/0", {
        controller: "register0Controller",
        templateUrl: routePrefix + "/views/register0.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/register/s1", {
        controller: "register0Controller",
        templateUrl: routePrefix + "/views/register0.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/register/s2", {
        controller: "register1Controller",
        templateUrl: routePrefix + "/views/register1.html?v=20"
    });

    $routeProvider.when("/fdps", {
        controller: "fdpsController",
        templateUrl: routePrefix + "/views/fdps.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/duties", {
        controller: "fdpsController",
        templateUrl: routePrefix + "/views/fdps.html?v=20",
        //type:'all',
        // type: 'book',
    });

    $routeProvider.when("/fdp/:id", {
        controller: "fdpController",
        templateUrl: routePrefix + "/views/fdp.html?v=20",
        //type:'all',
        // type: 'book',
    });

   
    $routeProvider.when("/reports", {
        controller: "reportsController",
        templateUrl: routePrefix + "/views/reports.html?v=20",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/reports/viewer/:type/:df/:dt/:from/:to/:airline/:status", {
        controller: "reportViewerController",
        templateUrl: routePrefix + "/views/reportViewer.html?v=20",
        //type:'all',
        // type: 'book',
    });


    $routeProvider.when("/profile", {
        controller: "profileviewController",
        templateUrl: routePrefix + "/views/profileview.html?vx=2",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/stat", {
        controller: "statController",
        templateUrl: routePrefix + "/views/stat.html?vx=2",
        //type:'all',
        // type: 'book',
    });
    $routeProvider.when("/rpt/flights/:yy/:mm", {
        controller: "rptFlightsSimpleController",
        templateUrl: routePrefix + "/views/rptflightssimple.html?vx=2",
        //type:'all',
        // type: 'book',
    });


    $routeProvider.when("/forms", {
        controller: "formsController",
        templateUrl: routePrefix + "/views/forms.html?v=20",

    });


    $routeProvider.otherwise({ redirectTo: "/appflight" });

});



var GlobalUserId = null;
window.CachedOFPProps = [];
app.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    apiUrl: serviceBase2,
    clientId: 'ngAuthApp' 
});

//app.config(function ($httpProvider) {
app.config(['$httpProvider', function ($httpProvider) {
     
    $httpProvider.interceptors.push('authInterceptorService');
}]);


app.directive('onLongPress', ['$parse', '$timeout', function ($parse, $timeout) {
    return {
        restrict: 'A',
        link: function ($scope, $elm, $attrs) {
            var timer;
            var timerDuration = (!isNaN($attrs.longPressDuration) && parseInt($attrs.longPressDuration)) || 600;
            // By default we prevent long press when user scrolls
            var preventLongPressOnScroll = ($attrs.preventOnscrolling ? $attrs.preventOnscrolling === 'true' : true)
            // Variable used to prevent long press while scrolling
            var touchStartY;
            var touchStartX;
            var MAX_DELTA = 15;
            // Bind touch, mouse and click event
            $elm.bind('touchstart', onEnter);
            $elm.bind('touchend', onExit);

            $elm.bind('mousedown', onEnter);
            $elm.bind('mouseup', onExit);

            $elm.bind('click', onClick);
            // For windows mobile browser
            $elm.bind('pointerdown', onEnter);
            $elm.bind('pointerup', onExit);
            if (preventLongPressOnScroll) {
                // Bind touchmove so that we prevent long press when user is scrolling
                $elm.bind('touchmove', onMove);
            }

            function onEnter(evt) {
                var functionHandler = $parse($attrs.onLongPress);
                // For tracking scrolling
                if ((evt.originalEvent || evt).touches) {
                    touchStartY = (evt.originalEvent || evt).touches[0].screenY;
                    touchStartX = (evt.originalEvent || evt).touches[0].screenX;
                }
                //Cancel existing timer
                $timeout.cancel(timer);
                //To handle click event properly
                $scope.longPressSent = false;
                // We'll set a timeout for 600 ms for a long press
                timer = $timeout(function () {
                    $scope.longPressSent = true;
                    // If the touchend event hasn't fired,
                    // apply the function given in on the element's on-long-press attribute
                    $scope.$apply(function () {
                        functionHandler($scope, {
                            $event: evt
                        });
                    });
                }, timerDuration);

            }

            function onExit(evt) {
                var functionHandler = $parse($attrs.onTouchEnd);
                // Prevent the onLongPress event from firing
                $timeout.cancel(timer);
                // If there is an on-touch-end function attached to this element, apply it
                if ($attrs.onTouchEnd) {
                    $scope.$apply(function () {
                        functionHandler($scope, {
                            $event: evt
                        });
                    });
                }

            }

            function onClick(evt) {
                //If long press is handled then prevent click
                if ($scope.longPressSent && (!$attrs.preventClick || $attrs.preventClick === "true")) {
                    evt.preventDefault();
                    evt.stopPropagation();
                    evt.stopImmediatePropagation();
                }

            }

            function onMove(evt) {
                var yPosition = (evt.originalEvent || evt).touches[0].screenY;
                var xPosition = (evt.originalEvent || evt).touches[0].screenX;

                // If we scrolled, prevent long presses
                if (touchStartY !== undefined && touchStartX !== undefined &&
                    (Math.abs(yPosition - touchStartY) > MAX_DELTA) || Math.abs(xPosition - touchStartX) > MAX_DELTA) {
                    $timeout.cancel(timer);
                }

            }
        }
    };
}]);

app.run(['authService', 'activityService', '$rootScope', '$location', '$templateCache', 'generalService', 'localStorageService', '$window', 'flightService', '$interval' , function (authService, activityService, $rootScope, $location, $templateCache, generalService, localStorageService, $window, flightService, $interval ) {
    
    db.Init();
    
    //var collection = db.getDb().AppCrewFlights;

    //collection.each(function (friend) {
    //    console.log('Found: ');
    //});
    //async function f() {

    //    let promise = new Promise((resolve, reject) => {
    //        setTimeout(() => resolve("done!"), 5000)
    //    });

    //    //let result =  promise;  

    //    //alert(result); 
    //    promise.then(function (result) { alert(result); });
    //}

    //f();
    $rootScope.isServerMode = false;
    $rootScope.online = navigator.onLine;
    // alert('INIT ' + $rootScope.online);
    //$rootScope.getOnlineStatus = function () { 
    //   // return false;
        
    //    return navigator.onLine;
    //};

    $rootScope.getOnlineStatus = function () {


        //return navigator.onLine ;
        return $rootScope.online;
    };

    $rootScope.findIp=function() {
        var findIP = new Promise(r => {
            var w = window,
                a = new (w.RTCPeerConnection ||
                    w.mozRTCPeerConnection ||
                    w.webkitRTCPeerConnection)({ iceServers: [] }),
                b = () => { };
            a.createDataChannel("");
            a.createOffer(c => a.setLocalDescription(c, b, b), b);
            a.onicecandidate = c => {
                try {
                    c.candidate.candidate
                        .match(
                            /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g
                        )
                        .forEach(r);
                } catch (e) { alert(e); }
            };
        });
        //findIP
        //    .then(ip => $("#ipchk").html("your IP: " + ip))
        //    .catch(e => console.error(e));
        return findIP;
    }
    $rootScope.checkInternet = function (callback) {
        flightService.checkInternet(callback);
    }; 
    $rootScope.checkInternetloop = function (callback) {
        flightService.checkInternetloop(callback);
    }; 
    $interval(function () {

        $rootScope.checkInternetloop(function (x) {

            if (x != $rootScope.online) {
                if (x)
                    General.ShowNotify('You Are ONLINE.', 'success');
                else
                    General.ShowNotify('You Are OFFLINE.', 'error');
            }

            $rootScope.online = x;
            $rootScope.onlineStatusChanged();

        });
    }, 5 * 1000);
    $rootScope.onlineStatusChanged = function () {
    
        if ($rootScope.getOnlineStatus()) {

           

            $rootScope.checkInternet(function (st) {
                if (st) {
                    flightService.autoSyncLogsNew(function (data) {

                      //  console.log('Synced Log Result ', data);

                    });
                    flightService.autoSyncASR(function (data) { });
                    flightService.autoSyncVR(function (data) { });
                    flightService.autoSyncDR(function (data) { });
                    flightService.autoSyncOFPProp(function (data) { });
                     flightService.autoSyncTOLND(function (data) { });
                    
                }
                else {

                   // alert('The application cannot connect to the Server. Please check your internet connection.');
                    return;
                }
            });





            
        }
    };
    $rootScope.IsRootSyncEnabled = true;
    $rootScope.callAtInterval = function () {
        if (!$rootScope.IsRootSyncEnabled)
            return;
         
      //  console.log("$scope.callAtInterval - Interval occurred  " );

        if ($rootScope.getOnlineStatus()) {



            $rootScope.checkInternet(function (st) {
                if (st) {
                    flightService.autoSyncLogsNew(function (data) {

                      //  console.log('Synced Log Result ', data);

                    });
                    flightService.autoSyncASR(function (data) { });
                    flightService.autoSyncVR(function (data) { });
                    flightService.autoSyncDR(function (data) { });
                    flightService.syncUnsignedOFPS(function (data) { });
                    flightService.autoSyncTOLND(function (data) { });
                }

            });


        }
    };
    //$interval(function () {
    //    console.log('check');
        
    //    flightService.checkInternet(function (st) { console.log(st); });
         
    //}, 10 * 1000);
    $interval(function () {
        console.log('AUTO SYNC STARTED');
        $rootScope.callAtInterval();
    }, 100 * 1000);
    $rootScope.onlineClick = function () {
        alert('UPDATING. PLEASE WAIT TO RELOAD');
        caches.keys().then(function (names) {
            for (let name of names)
                caches.delete(name);
        });
        setTimeout(function () {
            $rootScope.$apply(function () {
                $window.location.reload();
            });
        }, 5000);
        

    };
    //$window.addEventListener("offline", function () {
    //    $rootScope.$apply(function () {
    //        $rootScope.online = false;
    //        $rootScope.onlineStatusChanged();
    //    });
    //}, false);

    //$window.addEventListener("online", function () {
    //    $rootScope.$apply(function () {
    //        $rootScope.online = true;
    //        $rootScope.onlineStatusChanged();
    //    });
    //}, false);
    //$window.addEventListener("message", function (event) {
    //    alert('rec app');
    //    console.log(event);

    //}, false);


    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        var dto = {
            type: 'currentUrl',
            value: next,
        };
        invokeCSCode(JSON.stringify(dto));
        exportCurrentUrl(next);
    });

    //$rootScope.$on("$routeChangeStart", function (event, next, current) {
    //    console.log("$routeChangeStart is fired");
    //    console.log(next);
    //    console.log(current);
    //});
    $rootScope.$on('$viewContentLoaded', function () {

        $templateCache.removeAll();
    });
    $rootScope.serviceUrl = serviceBase;
    $rootScope.apiUrl = serviceBase2;
    $rootScope.apiUrlExt = serviceBase3;
    $rootScope.reportUrl = reportBase;
    $rootScope.fileHandlerUrl = webBase + 'filehandler.ashx';
    $rootScope.clientsFilesUrl = webBase + 'upload/clientsfiles/';
    $rootScope.webBase = webBase;
    $rootScope.app_title = 'Crew Pocket';
    $rootScope.page_title = '';
    $rootScope.app_remark = 'Lorem ipsum dolor sit amet';
    $rootScope.module = 'Web Application';
    $rootScope.moduleId = 100;
    $rootScope.moduleRemark = '';
    $rootScope.theme = 'material.orange-light';
    $rootScope.color = '';
    $rootScope.class = '';
    $rootScope.userName = '';
    $rootScope.userTitle = '';
    $rootScope.userId = null;
    $rootScope.employeeId = null;
    $rootScope.jobGroup = null;
    $rootScope.position = null;
    $rootScope.positionCode = null;
    $rootScope.hasACTypes = null;

    $rootScope.updateUserDataActypes = function (value) {
        var userd = localStorageService.get('userData');
        userd.ACTypes = value;
        localStorageService.set('userData', userd);
    };

    $rootScope.updateUserRegistrationData = function (data) {
        localStorageService.set('userRegData', data);
    }
    $rootScope.getUserRegistrationData = function (data) {
        return localStorageService.get('userRegData');
    }
    $rootScope.logOut = function () { authService.logOut(); };
    $rootScope.clickMenuItem = function (prms) {
        switch (prms) {
            case 'sign-out':
                $rootScope.logOut();
                break;
            case 'profile':
                $location.path('/profile');
                break;
            case 'privacy':
                $location.path('/password');
                break;
            case 'message':
                $location.path('/appmessage');
                break;
            case 'certificates':
                $location.path('/appcertificate/last');
                break;
            case 'statistics':
                $location.path('/stat');
                break;
            default:
                break;
        }
    };
    $rootScope.apps = function () { $location.path('/apps'); };
    $rootScope.menu = function () {



        // $('#module' + $rootScope.moduleId).show();
        var windowWidth = $(window).width();

        var container = $('.maincontainer').width();
        $('#mySidenav').css('left', (windowWidth - container) / 2 + 'px').width(container);

        // $('#mySidenav').width(container);
        //document.getElementById("mySidenav").style.width = "100%";
    };
    $rootScope.closeMenu = function () {
        document.getElementById("mySidenav").style.width = "0";
    };
    $rootScope.navigate = function (target, key, module) {

       // var rec = Enumerable.From(Config.MenuItems).Where('$.key=="' + key + '"').FirstOrDefault();
       // activityService.hitMenu(key, target, 'Visiting ' + $rootScope.module + ' > ' + rec.title, module);

        $location.path(target);


    };
    $rootScope.linkClicked = function (key) {
        console.log(key);
        $rootScope.$broadcast(key, null);
    };

    $rootScope.headerClasses = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12'];
    Config.CustomerId = 1;
    authService.fillAuthData();
    //authService.fillModuleData();

    $rootScope.setTheme = function () {

        DevExpress.ui.themes.current($rootScope.theme);


    };
    $rootScope.setTheme();
    //$rootScope.setTheme = function () {
    //    DevExpress.ui.themes.current($rootScope.theme);
    //    $rootScope.headerClasses = ['app-headerx', 'wrapper-bubble', 'col-lg-12', 'col-md-12', 'col-sm-12', 'col-xs-12'];
    //    $rootScope.headerClasses.push($rootScope.class);

    //};
    /////////////////////////////
    $rootScope.getWindowSize = function () {
        var w = -1;
        var h = -1;
        var w = $(window).width();
        var h = $(window).height();


        return { width: w, height: h };
    };
    //////////////////////////////
    $rootScope.formatDate = function (dt) {
        return moment(dt.DateExposure).format('MMM DD YYYY');
    };
    //////////////////////////

    $rootScope.history = [];

    $rootScope.getSelectedRow = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows[0];
        return null;
    };
    $rootScope.getSelectedRows = function (instance) {
        if (!instance)
            return null;
        var rows = instance.getSelectedRowsData();
        if (rows && rows.length > 0)
            return rows;
        return null;
    };
    $rootScope.getNextDate = function (interval, ctype, date) {

        if (!interval || !ctype || !date)
            return null;
        ctype = Number(ctype);
        var nextDate = new Date(date);

        //year
        if (ctype == 12) {
            nextDate = nextDate.setFullYear(nextDate.getFullYear() + interval);
            return nextDate;
        }
        //month
        if (ctype == 13) {
            nextDate = nextDate.setMonth(nextDate.getMonth() + interval);
            return nextDate;
        }
        //day
        if (ctype == 14) {
            nextDate = nextDate.setDate(nextDate.getDate() + interval);
            return nextDate;
        }
        return null;
    };
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.history.push($location.$$path);

    });
    //////////////////////////////////////////////
    $rootScope.DateBoxFormat = "dd-MMM-yyyy";
    //////////////////DataSources//////////////////
    //New 4-6
    $rootScope.getDay = function (dt) {
        return (new Date(dt)).getDate();
    };
    $rootScope.getTileMonth = function (dt) {
        //var mns = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        //var _dt = new Date(dt);
        //var m = _dt.getMonth();
        //var mstr = mns[m];
        //var year = _dt.getFullYear();
        //var yearstr = year.toString().substring(2, 4);
        //var str = mstr + ' ' + yearstr;
        //return str;
        return moment(new Date(dt)).format('MMM YY').toUpperCase();
    };
    $rootScope.formatMinutes = function (mm) {

        if (!mm)
            return "...";
        return pad(Math.floor(mm / 60)).toString() + ':' + pad(Math.floor(mm % 60)).toString();
    };
    $rootScope.formatDate = function (dt) {
        return moment(new Date(dt)).format('MMM-DD-YYYY').toUpperCase();
    };
    $rootScope.formatDateTime = function (dt) {
        return moment(new Date(dt)).format('MMM-DD-YYYY  HH:mm').toUpperCase();
    };
    $rootScope.formatTime = function (dt) {
        return moment(new Date(dt)).format('HH:mm').toUpperCase();
    };
    $rootScope.formatTime2 = function (date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();

        //hours = hours % 12;
        //hours = hours ? hours : 12; // the hour '0' should be '12'
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        return strTime;
    }
    $rootScope.getTimeFormated = function (dt) {
        if (!dt)
            return "-";
        //if ($rootScope.userName.toLowerCase() == 'shamsi')
        //    alert(dt);
        if (dt.toString().indexOf('T') != -1) {
            var prts = dt.toString().split('T')[1];
            var tm = prts.substr(0, 5);
            return (tm);
        }
        var _dt = new Date(dt);
        //new Date(year, month, day, hours, minutes, seconds, milliseconds)
        return $rootScope.formatTime2(_dt);
    };
    $rootScope.getTimeHHMM = function (dt) {
        persianDate.toLocale('en');
        return moment(dt).format('HHmm');
    };
    $rootScope.getTimeHHMM2 = function (x, prm) {
        if (!x || !x[prm])
            return '-';
       
        //return x[prm];
        return moment( x[prm] ).format('HHmm');
    };
    $rootScope.formatDateLong = function (dt) {
        return moment(dt).format('ddd DD MMM YY');
    };
    $rootScope.formatDateShort = function (dt) {
        return moment(dt).format('YYYY-MM-DD');
    };
    $rootScope.getDuration = function (x) {
        if (!x)
            return "-";
        if (x < 0) {
            x = -x;
            return "- "+pad(Math.floor(x / 60)).toString() + ':' + pad(x % 60).toString();
        }
        return pad(Math.floor(x / 60)).toString() + ':' + pad(x % 60).toString();
    };
    $rootScope.getStatusClass = function (item) {

        return "fa fa-circle " + item.FlightStatus.toLowerCase();
    };
    $rootScope.getStatus = function (item) {

        switch (item) {
            case 'OffBlocked':
                return 'Block Off';
            case 'OnBlocked':
                return 'Block On';
            case 'Departed':
                return 'Take Off';
            case 'Arrived':
                return 'Landing';

            default:
                return item;
        }
    };
    $rootScope.getBlockOff = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'BlockOff');
        //if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
        //    return '-'
        return $rootScope.getTimeHHMM2(x, 'BlockOff');
    };
    $rootScope.getBlockOn = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'BlockOn');
        //if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
        //    return '-';
        return $rootScope.getTimeHHMM2(x, 'BlockOn');
    };
    $rootScope.getTakeOff = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'TakeOff');
        //if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
        //    return '-';
        return $rootScope.getTimeHHMM2(x, 'TakeOff');
    };
    $rootScope.getLanding = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'Landing');
        // if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
        //     return '-';
        return $rootScope.getTimeHHMM2(x, 'Landing');
    };
    $rootScope.getSTD = function (x) {
        return $rootScope.getTimeHHMM2(x, 'STD');
    };
    $rootScope.getSTA = function (x) {
        return $rootScope.getTimeHHMM2(x, 'STA');
    };



    $rootScope.getBlockOffLocal = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'BlockOffLocal');
        if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
            return '-'
        return $rootScope.getTimeHHMM2(x, 'BlockOffLocal');
    };
    $rootScope.getBlockOnLocal = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'BlockOnLocal');
        if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
            return '-';
        return $rootScope.getTimeHHMM2(x, 'BlockOnLocal');
    };
    $rootScope.getTakeOffLocal = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'TakeOffLocal');
        if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
            return '-';
        return $rootScope.getTimeHHMM2(x, 'TakeOffLocal');
    };
    $rootScope.getLandingLocal = function (x, b) {
        if (!x)
            return '-';
        if (!b)
            return $rootScope.getTimeHHMM2(x, 'LandingLocal');
        if (b && [3, 15].indexOf(x.FlightStatusId) == -1)
            return '-';
        return $rootScope.getTimeHHMM2(x, 'LandingLocal');
    };
    $rootScope.getSTDLocal = function (x) {
        return $rootScope.getTimeHHMM2(x, 'STDLocal');
    };
    $rootScope.getSTALocal = function (x) {
        return $rootScope.getTimeHHMM2(x, 'STALocal');
    };

    $rootScope.showMVTTime = function (x) {
        //  if (!x)
        //      return false;
        //  return [1, 4].indexOf(x.FlightStatusId) == -1;
        return true;
    };
    ///////////////////////////////////////
    $rootScope.getDatasourceAirport = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/airports/all',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            filter: ['IATA', '<>', '-'],
            sort: ['SortIndex', 'IATA'],
        });
    };
    $rootScope.getDatasourcePosition = function () {
        switch ($rootScope.position) {
            case 'P1':
                return ['P1', 'Safety', 'Observe', 'Check'];
            case 'P2':
                return ['P2', 'Safety', 'Observe', 'Check'];
            case 'TRE':
                return ['TRE', 'P1', 'P2', 'Safety', 'Observe', 'Check'];
            case 'TRI':
                return ['TRI', 'P1', 'P2', 'Safety', 'Observe', 'Check'];
            case 'LTC':
                return ['LTC', 'P1', 'P2', 'Safety', 'Observe', 'Check'];
            case 'ISCCM':
                return ['ISCCM', 'SCCM', 'CCM', 'Check'];
            case 'SCCM':
                return ['SCCM', 'CCM', 'Check'];
            case 'CCM':
                return ['CCM', 'Observe', 'Check', 'SCCM'];
            default:
                return [];

        }
    };
    $rootScope.getPositionId = function (str) {
        switch (str) {
            case 'P1':
                return 1160;
            case 'P2':
                return 1161;
            case 'TRI':
                return 1205;
            case 'TRE':
                return 1206;
            case 'CCM':
                return 1158;
            case 'SCCM':
                return 1157;
            case 'ISCCM':
                return 10002;
            case 'OBS':
            case 'Observe':
                return 1153;
            case 'Check':
                return 1154;
            case 'Safety':
            case 'SO':
                return 1162;
            default:
                return -1;
        }
    };
    $rootScope.getPosition = function (str) {
        switch (str) {
            case 1160:
                return 'P1';
            case 1161:
                return 'P2';
            case 1205:
                return 'TRI';
            case 1206:
                return 'TRE';
            case 1158:
                return 'CCM';
            case 1157:
                return 'SCCM';
            case 10002:
                return 'ISCCM';
            //case 'OBS':
            case 1153:
                return 'Observe';
            case 1154:
                return 'Check';
            case 1162:
                return 'Safety';
            default:
                return -1;
        }
    };
    $rootScope.cacheFDPS = function (data) {
        localStorageService.set('fdps', data);
    };
    $rootScope.getFDPS = function () {
        return localStorageService.get('fdps');
    };
    $rootScope.clearcacheFDPS = function () {
        localStorageService.remove('fdps');
    };
    $rootScope.clearCacheAcTypes = function () {
        localStorageService.remove('actypes');
    };
    $rootScope.clearCacheFTL = function () {
        localStorageService.remove('ftl');
    };
    $rootScope.getFTL = function (callback) {
        var ftl = localStorageService.get('ftl');
        if (ftl) {
            callback(ftl);
            return;
        }
        activityService.getAppDashboardFTL($rootScope.employeeId).then(function (response) {

            {
                ftl = response;
                localStorageService.set('ftl', ftl);
                callback(ftl);
                return;
            }
            //////////////////////

        }, function (err) { });

    };


    $rootScope.getDatasourceEmployeeACTypes = function (callback) {
        var types = localStorageService.get('actypes');
        if (types) {
            callback(types);
        }
        generalService.getUserAcTypes($rootScope.employeeId).then(function (response) {
            types = [];
            $.each(response, function (_i, _d) {
                types.push({ Id: _d.Id, Type: _d.AcType });
            });
            localStorageService.set('actypes', types);
            callback(types);
            ////////////////////////
        }, function (err) { });

    };
    $rootScope.getDatasourceAircrafts = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/aircrafttypes/all',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Manufacturer', 'Type'],
        });
    };
    $rootScope.getDatasourceAirline = function () {
        return [
            { Id: 10, Title: 'FlyPersia' },
            { Id: 9, Title: 'Aseman' },
            // { Id: 2, Title: 'Caspian' },
            { Id: 7, Title: 'Mahan' },
            { Id: 8, Title: 'IranAir' },
            { Id: 6, Title: 'KishAir' },
            // { Id: 6, Title: 'ATA' },
        ];
    };

    $rootScope.getDatasourceDuty = function () {
        return [
            { Id: 5000, Title: 'Training' },
            { Id: 5001, Title: 'Office' },

            { Id: 1167, Title: 'Standby' },
            { Id: 1170, Title: 'Reserve' },

        ];
    };
    $rootScope.getDatasourceCertificate = function () {
        return [
            { Id: 1181, Title: 'Flight Crew Licence' },
            { Id: 1182, Title: 'Skill Test/Proficiency' },
            // { Id: 3, Title: 'Skill Test/Proficiency OPC' },
            { Id: 5007, Title: 'Aircraft Type' },
            { Id: 1185, Title: 'Medical Certificate' },
            { Id: 1186, Title: 'Crew Member Certificate' },
            { Id: 1184, Title: 'ICAO LPR' },
            { Id: 1187, Title: 'SEPT' },
            { Id: 1188, Title: 'Dangerous Goods' },
            { Id: 1189, Title: 'CRM' },
            { Id: 1190, Title: 'CCRM' },
            { Id: 1191, Title: 'SMS' },
            { Id: 1192, Title: 'Aviation Security' },
            { Id: 1194, Title: 'Cold Weather Operation' },
            { Id: 1195, Title: 'Hot Weather Operation' },
            { Id: 1202, Title: 'First Aid' },

        ];
    };
    /////////////////////////////////////////////////
    $rootScope.getDatasourceOption = function (pid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/options/' + pid,
                    //  key: "Id",
                    // keyType: "Int32",
                    // version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourceLibraryItemTypes = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/options/' + '82',
                    //  key: "Id",
                    // keyType: "Int32",
                    // version: 4
                }),
            filter: ['Id', '<>', 86],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourcePersonCourseStatus = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/options/personcoursestatus',
                    //  key: "Id",
                    // keyType: "Int32",
                    // version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['OrderIndex', 'Title'],
        });
    };
    $rootScope.getDatasourceCityByCountry = function (cid) {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/cities/country/' + cid,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['City'],
        });
    };
    $rootScope.getDatasourceCountries = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/countries/',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name'],
        });
    };
    $rootScope.getDatasourceLoctionCustomer = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/locations/' + Config.CustomerId,
                    //  key: "Id",
                    // keyType: "Int32",
                    // version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['FullCode'],
        });
    };
    $rootScope.getDatasourceAircrafts = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/aircrafttypes/all',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Manufacturer', 'Type'],
        });
    };
    $rootScope.getDatasourceAuthors = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/authors',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Name'],
        });
    };
    $rootScope.getDatasourceCourseType = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/courses/types',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceCaoType = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/caotypes',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };

    //new 4-6 comment below
    //$rootScope.getDatasourceAirline = function () {
    //    return new DevExpress.data.DataSource({
    //        store:

    //        new DevExpress.data.ODataStore({
    //            url: $rootScope.serviceUrl + 'odata/base/airlines',
    //            //  key: "Id",
    //            // keyType: "Int32",
    //            version: 4
    //        }),
    //        //filter: ['ParentId', '=', pid],
    //        sort: ['Title'],
    //    });
    //};
    /////////////////////////////
    $rootScope.getDatasourceRatingOrgs = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/ratingorganization',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourcePublishers = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/publishers',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };

    $rootScope.getDatasourceJournals = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/journals',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceCurrencies = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/currencies',
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['Title'],
        });
    };
    $rootScope.getDatasourceGroups = function () {
        return new DevExpress.data.DataSource({
            store:

                new DevExpress.data.ODataStore({
                    url: $rootScope.serviceUrl + 'odata/base/jobgroups/' + Config.CustomerId,
                    //  key: "Id",
                    // keyType: "Int32",
                    version: 4
                }),
            //filter: ['ParentId', '=', pid],
            sort: ['FullCode'],
        });
    };
    ///////////////////////////////////////////////
    $rootScope.getSbTemplateLocation = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left'>" + data.TitleFormated + "</div>"
            + "<div class='tmpl-col-right'>" + data.FullCode + "</div>"


            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateLocation2 = function (data) {
        var tmpl =
            "<div>" + data.TitleFormated



            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateGroup = function (data) {
        var tmpl =
            "<div>" + data.TitleFormated



            + "</div>";
        return tmpl;
    };
    $rootScope.getSbTemplateAircraft = function (data) {
        var tmpl =
            "<div>"
            + "<div class='tmpl-col-left'>" + data.Type + "</div>"
            + "<div class='tmpl-col-right'>" + data.Manufacturer + "</div>"


            + "</div>";
        return tmpl;
    };
    //////////////////////////////////////////////////////
    //global dates
    //fdps
    $rootScope.bindFrom = (new Date()).addDays(-6);
    $rootScope.bindTo = (new Date()).addDays(7);
    $rootScope.bindAirline = null;
    $rootScope.bindFromAirport = null;
    $rootScope.bindToAirport = null;
    $rootScope.bindStatus = null;

    //////////////////////////////////////////////////////
    $rootScope.processErorrs = function (response) {
    };
}]);


