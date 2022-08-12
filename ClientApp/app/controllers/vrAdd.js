'use strict';
app.controller('vrAddController', ['$scope', '$location', 'flightService', 'authService', '$routeParams', '$rootScope', '$window',   '$http', function ($scope, $location, flightService, authService, $routeParams, $rootScope, $window,   $http) {
    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    //if (detector.mobile() && !detector.tablet())
        $scope.isFullScreen = true;

    //////////////////////////////
    $scope.entity = {
        Id: -1,
    };
    $scope.txt_depdelay = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.DepDelay',
        }
    }
    $scope.restReduction = {
        min: 0,
        bindingOptions: {
            value: 'entity.RestReduction',
        }
    };
    $scope.dutyExtention = {
        min: 0,
        bindingOptions: {
            value: 'entity.DutyExtention',
        }
    };
    $scope.report = {
        min: 0,
        height:200,
        bindingOptions: {
            value: 'entity.Report',
        }
    };
    //FLIGHT CANCELLATION
    $scope.irr_100111 = false;
    $scope.chb_irr_100111 = {
        text: '',
        bindingOptions: {
            value: 'irr_100111',
        }
    };

    //FLIGHT RETURN
    $scope.irr_100112 = false;
    $scope.chb_irr_100112 = {
        text: '',
        bindingOptions: {
            value: 'irr_100112',
        }
    };

    //DIVERSION
    $scope.irr_100113 = false;
    $scope.chb_irr_100113 = {
        text: '',
        bindingOptions: {
            value: 'irr_100113',
        }
    };

    //ABN./ EMER. EVENT
    $scope.irr_100114 = false;
    $scope.chb_irr_100114 = {
        text: '',
        bindingOptions: {
            value: 'irr_100114',
        }
    };

    //DEP. DELAY > 30 MINUTES
    $scope.re_100115 = false;
    $scope.chb_re_100115 = {
        text: '',
        bindingOptions: {
            value: 're_1001215',
        }
    };

    //TECHNICAL
    $scope.re_100119 = false;
    $scope.chb_re_100119 = {
        text: '',
        bindingOptions: {
            value: 're_100119',
        }
    };

    //ATC
    $scope.re_100120 = false;
    $scope.chb_re_100120 = {
        text: '',
        bindingOptions: {
            value: 're_100120',
        }
    };

    //SECURITY
    $scope.re_100121 = false;
    $scope.chb_re_100121 = {
        text: '',
        bindingOptions: {
            value: 're_100121',
        }
    };

    //FLT. OPS
    $scope.re_100122 = false;
    $scope.chb_re_100122 = {
        text: '',
        bindingOptions: {
            value: 're_100122',
        }
    };

    //A/C LATE ARRIVAL
    $scope.re_100123 = false;
    $scope.chb_re_100123 = {
        text: '',
        bindingOptions: {
            value: 're_100123',
        }
    };

    //PAX HANDELING
    $scope.re_100124 = false;
    $scope.chb_re_100124 = {
        text: '',
        bindingOptions: {
            value: 're_100124',
        }
    };

    //CATERING
    $scope.re_100125 = false;
    $scope.chb_re_100125 = {
        text: '',
        bindingOptions: {
            value: 're_100125',
        }
    };

    //WEATHER
    $scope.re_100126 = false;
    $scope.chb_re_100126 = {
        text: '',
        bindingOptions: {
            value: 're_100126',
        }
    };

    //RAMP HANDLING
    $scope.re_100127 = false;
    $scope.chb_re_100127 = {
        text: '',
        bindingOptions: {
            value: 're_100127',
        }
    };

    //OTHERS
    $scope.re_100128 = false;
    $scope.chb_re_100128 = {
        text: '',
        bindingOptions: {
            value: 're_100128',
        }
    };

    $scope.entity.Route = 'test';
    $scope.entity.Report = 'test';
    $scope.entity.DatePICSignature = '8/12/2021';
    $scope.entity.ActionedById = -1;
    $scope.entity.DateActioned = '8/12/2021';
    $scope.entity.DateConfirmed = '8/12/2021';

        ////////////////////////
        $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 200;
    $scope.popup_add_title = 'VOYAGE REPORT';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Sign', icon: 'fas fa-signature', onClick: function (e) {
                        if ($rootScope.getOnlineStatus()) {
                            $rootScope.checkInternet(function (st) {
                                if (st) {
                                    var data = { FlightId: $scope.entity.FlightId, documentType: 'vr' };

                                    $rootScope.$broadcast('InitSignAdd', data);
                                }
                                else {
                                    General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
                                }
                            });
                           
                          
                        }
                        else {
                            General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
                        }

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'logadd', onClick: function (e) {

                        $scope.entity.EFBFlightIrregularities = [];
                        $scope.entity.EFBReasons = [];
                        $scope.entity.Irregularities = [];
                        if ($scope.irr_100111) {
                            $scope.entity.Irregularities.push(100111);
                            $scope.entity.EFBFlightIrregularities.push({ IrrId: 100111 });
                        }
                        if ($scope.irr_100112) {
                            $scope.entity.Irregularities.push(100112);
                            $scope.entity.EFBFlightIrregularities.push({ IrrId: 100112 });
                        }
                        if ($scope.irr_100113) {
                            $scope.entity.Irregularities.push(100113);
                            $scope.entity.EFBFlightIrregularities.push({ IrrId: 100113 });
                        }
                        if ($scope.irr_100114) {
                            $scope.entity.Irregularities.push(100114);
                            $scope.entity.EFBFlightIrregularities.push({ IrrId: 100114 });
                        }
                        if ($scope.irr_100115) {
                            $scope.entity.Irregularities.push(100115);
                            $scope.entity.EFBFlightIrregularities.push({ IrrId: 100115 });
                        }
                        $scope.entity.Reasons = [];
                        if ($scope.re_100119) {
                            $scope.entity.Reasons.push(100119);
                            $scope.entity.EFBReasons.push({ ReasonId: 100119 });
                        }

                        if ($scope.re_100120) {
                            $scope.entity.Reasons.push(100120);
                            $scope.entity.EFBReasons.push({ ReasonId: 100120 });
                        }

                        if ($scope.re_100121) {
                            $scope.entity.Reasons.push(100121);
                            $scope.entity.EFBReasons.push({ ReasonId: 100121 });
                        }

                        if ($scope.re_100122) {
                            $scope.entity.Reasons.push(100122);
                            $scope.entity.EFBReasons.push({ ReasonId: 100122 });
                        }

                        if ($scope.re_100123) {
                            $scope.entity.Reasons.push(100123);
                            $scope.entity.EFBReasons.push({ ReasonId: 100123 });
                        }

                        if ($scope.re_100124) {
                            $scope.entity.Reasons.push(100124);
                            $scope.entity.EFBReasons.push({ ReasonId: 100124 });
                        }

                        if ($scope.re_100125) {
                            $scope.entity.Reasons.push(100125);
                            $scope.entity.EFBReasons.push({ ReasonId: 100125 });
                        }

                        if ($scope.re_100126) {
                            $scope.entity.Reasons.push(100126);
                            $scope.entity.EFBReasons.push({ ReasonId: 100126 });
                        }

                        if ($scope.re_100127) {
                            $scope.entity.Reasons.push(100127);
                            $scope.entity.EFBReasons.push({ ReasonId: 100127 });
                        }

                        if ($scope.re_100128) {
                            $scope.entity.Reasons.push(100128);
                            $scope.entity.EFBReasons.push({ ReasonId: 100128 });
                        }

                         

                        //flightService.saveVoyageReport($scope.entity).then(function (res) {
                        //    $scope.popup_add_visible = false;
                        //})
                        $scope.entity.User = $rootScope.userTitle;
                        $scope.loadingVisible = true;
                        flightService.saveVR($scope.entity).then(function (response2) {
                            $scope.loadingVisible = false;
                            
                            if (response2.IsSuccess) {
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                console.log('Vr', response2.Data);
                                $scope.popup_add_visible = false;
                            }


                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_add_visible = false;
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $rootScope.IsRootSyncEnabled = false;
            $scope.popup_instance.repaint();


        },
        onShown: function (e) {

            if ($scope.isNew) {
                $scope.isContentVisible = true;
            }
            if ($scope.tempData != null)
                $scope.bind();





        },
        onHiding: function () {
            $rootScope.IsRootSyncEnabled = true;
            //$scope.clearEntity();

             
             
            $scope.irr_100111 = false;
            $scope.irr_100112 = false;
            $scope.irr_100113 = false;
            $scope.irr_100114 = false;
            $scope.irr_100115 = false;

            
            $scope.re_100119 = false;
            $scope.re_100120 = false;
            $scope.re_100121 = false;
            $scope.re_100122 = false;
            $scope.re_100123 = false;
            $scope.re_100124 = false;
            $scope.re_100125 = false;
            $scope.re_100126 = false;
            $scope.re_100127 = false;
            $scope.re_100128 = false;
            $scope.entity = {
                Id: -1,
                

            };

            $scope.popup_add_visible = false;
            
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        isFullScreen:false,
        bindingOptions: {
            visible: 'popup_add_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_add_title',
            height: 'popup_height',
            width: 'popup_width',
            'toolbarItems[1].visible': 'isEditable', 
            'toolbarItems[0].visible': 'isLockVisible',

        }
    };

    /////////////////////////////////

  
    /////////////////////////////////
    $scope.entity = {
        Id: -1,
    };

    /////////////////////////////////
    $scope.flight = null;
    $scope.fill = function (data) {
        $scope.entity = data;
        
        var irregularity = Enumerable.From(data.EFBFlightIrregularities).Select('Number($.IrrId)').ToArray();
        $scope.irr_100111 = irregularity.indexOf(100111) != -1;
        $scope.irr_100112 = irregularity.indexOf(100112) != -1;
        $scope.irr_100113 = irregularity.indexOf(100113) != -1;
        $scope.irr_100114 = irregularity.indexOf(100114) != -1;
        $scope.irr_100115 = irregularity.indexOf(100115) != -1;

        var reason = Enumerable.From(data.EFBReasons).Select('Number($.ReasonId)').ToArray();
        $scope.re_100119 = reason.indexOf(100119) != -1;
        $scope.re_100120 = reason.indexOf(100120) != -1;
        $scope.re_100121 = reason.indexOf(100121) != -1;
        $scope.re_100122 = reason.indexOf(100122) != -1;
        $scope.re_100123 = reason.indexOf(100123) != -1;
        $scope.re_100124 = reason.indexOf(100124) != -1;
        $scope.re_100125 = reason.indexOf(100125) != -1;
        $scope.re_100126 = reason.indexOf(100126) != -1;
        $scope.re_100127 = reason.indexOf(100127) != -1;
        $scope.re_100128 = reason.indexOf(100128) != -1;

    };
    $scope._bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

       

        $scope.loadingVisible = true;

        flightService.epGetFlightLocal($scope.entity.FlightId).then(function (response) {

            $scope.loadingVisible = false;
            var diff = Math.abs((new Date()).getTime() - (new Date(response.Data.STALocal)).getTime()) / 3600000;
           
            $scope.flight = response.Data;

            $scope.loadingVisible = true;

            flightService.epGetVRByFlight($scope.entity.FlightId).then(function (response2) {
                $scope.isEditable = (diff <= 24);
                $scope.loadingVisible = false;
                if (!response2.Data) {
                    $scope.entity.Id = -1;
                    $scope.isNew = true;


                }
                else {
                    $scope.isNew = false;
                    $scope.fill(response2.Data);
                }

                 

            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


             


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;
        if ($rootScope.getOnlineStatus()) {
            $rootScope.checkInternet(function (st) {
                if (st) {
                    flightService.checkLock($scope.entity.FlightId, 'vr').then(function (response) {
                        $scope.isLockVisible = false;
                        if (response.IsSuccess && response.Data.canLock) {
                            $scope.isLockVisible = true;
                        }
                    }, function (err) { });
                }
                else {
                    General.ShowNotifyBottom("The application cannot connect to the Server. Please check your internet connection.", 'error');
                }
            });
           
        }



        $scope.loadingVisible = true;

        flightService.epGetFlightLocal($scope.entity.FlightId).then(function (response) {

            $scope.loadingVisible = false;
            var diff = Math.abs((new Date()).getTime() - (new Date(response.Data.STALocal)).getTime()) / 3600000;
            $scope.isEditable = (diff <= 24);
            $scope.flight = response.Data;

            $scope.loadingVisible = true;
             
            flightService.epGetVRByFlight($scope.entity.FlightId).then(function (response2) {
                
                $scope.loadingVisible = false;
                if (!response2.Data) {
                    $scope.entity.Id = -1;
                    $scope.isNew = true;


                }
                else {
                    if (response2.Data.JLSignedBy) {
                       // $scope.isEditable = false;
                        $scope.url_sign = signFiles + response.Data.PICId + ".jpg";
                        $scope.PIC = response.Data.PIC;
                        $scope.signDate = moment(new Date(response.Data.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
                    }
                    if (response2.Data.Alert) {
                        General.Confirm("The report updated by " + response2.Data.Alert + ". Would you like to get edited report?", function (res) {
                            if (res) {

                                //var dto = { Id: $scope.ati_flight.ID, };
                                $scope.loadingVisible = true;
                                flightService.epReplaceVR(response2.Data.server).then(function (res) {

                                    $scope.isNew = false;
                                    $scope.fill(res);
                                    $scope.loadingVisible = false;


                                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                            }
                            else {
                                $scope.$apply(function () {
                                    $scope.isNew = false;


                                    $scope.fill(response2.Data);
                                });

                            }
                        });
                    }
                    else {
                         
                        $scope.isNew = false;
                        $scope.fill(response2.Data);
                    }
                }



            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });





        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    ////////////////////////////////
    $scope.scroll_vradd_height = $(window).height() - 130;
    $scope.scroll_vradd = {
        width: '100%',
        bounceEnabled: false,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: true,
        refreshingText: 'Updating...',
        onPullDown: function (options) {

            options.component.release();

        },
        onInitialized: function (e) {


        },
        bindingOptions: {
            height: 'scroll_vradd_height'
        }

    };
    /////////////////////////////////
    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {
         
        if (prms.doc == 'vr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
               // $scope.isEditable = false;
             //   $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitVrAdd', function (event, prms) {
        $scope.tempData = null;




        $scope.tempData = prms;


        $scope.popup_add_visible = true;

        //$scope.tempData = null;
        //$scope.entity.FlightId = prms.FlightId;

        //flightService.epGetFlightLocal(prms.FlightId).then(function (response) {

        //    $scope.loadingVisible = false;

            
        //    $scope.entity.FlightNo = response.Data.FlightNumber;
        //    $scope.entity.Date = new Date(response.Data.STDDay);
        //    $scope.entity.ACReg = response.Data.Register;
        //    $scope.entity.Route = response.Data.FromAirportIATA + ' - ' + response.Data.ToAirportIATA  
        //    $scope.entity.FlightNo = response.Data.FlightNumber
        //    $scope.FlightNo = {
        //        min: 0,
        //        bindingOptions: {
        //            value: 'entity.FlightNo',
        //        }
        //    };

        //    $scope.Date = {
        //        min: 0,
        //        bindingOptions: {
        //            value: 'entity.Date',
        //        }
        //    };

        //    $scope.Route = {
        //        min: 0,
        //        bindingOptions: {
        //            value: 'entity.Route',
        //        }
        //    };

        //    $scope.ACType = {
        //        min: 0,
        //        bindingOptions: {
        //            value: 'entity.ACType',
        //        }
        //    };

        //    $scope.ACReg = {
        //        min: 0,
        //        bindingOptions: {
        //            value: 'entity.ACReg',
        //        }
        //    };


        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




        //if (!prms.Id) {

        //    $scope.isNew = true;

        //    $scope.popup_add_title = 'Voyage Report';

        //}

        //else {

        //    $scope.popup_add_title = 'Voyage Report';
        //    $scope.tempData = prms;
        //    $scope.entity.Id = prms.Id;
            

        //}

        

    });
    //////////////////////////////

}]);  