'use strict';
app.controller('asrAddController', ['$scope', '$location', 'flightService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, flightService, authService, $routeParams, $rootScope, $window) {
    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    //if (detector.mobile() && !detector.tablet())
        $scope.isFullScreen = true;



    ////////////////////////
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = 'AIR SAFETY REPORT';
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
                                    var data = { FlightId: $scope.entity.FlightId, documentType: 'asr' };

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
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'asradd', onClick: function (e) {

                        var result = e.validationGroup.validate();

                        if (!result.isValid) {
                            General.ShowNotify(Config.Text_FillRequired, 'error');
                            return;
                        }
                        //alert($scope.entity.Id);
                        //db.getCount('ASRs', function (n) {
                        //    n = n + 1;
                        //    n = -1 * n;
                        //    $scope.entity.Id = n;
                            
                        //});
                        $scope.entity.User = $rootScope.userTitle;

                        $scope.loadingVisible = true;
                        flightService.saveASR($scope.entity).then(function (response2) {
                            $scope.loadingVisible = false;
                            if (response2.IsSuccess) {
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                console.log('ASR', response2.Data);
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
            $scope.entity = {
                Id: -1,
                IsSecurityEvent: false,
                IsAirproxATC: false,
                IsTCASRA: false,
                IsWakeTur: false,
                IsBirdStrike: false,
                IsOthers: false,

            };
            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onAsrAddHide', null);
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
       // fullScreen:false,
        bindingOptions: {
            visible: 'popup_add_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_add_title',
            height: 'popup_height',
            width: 'popup_width',
            'toolbarItems[0].visible': 'isLockVisible',
            'toolbarItems[1].visible': 'isEditable', 

        }
    };

    /////////////////////////////////
  

    /////////////////////////////////
    $scope.flight = null;
    $scope.fill = function (data) {
        $scope.entity = data;
    };
    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;

         

        if ($rootScope.getOnlineStatus()) {
            $rootScope.checkInternet(function (st) {
                if (st) {
                    flightService.checkLock($scope.entity.FlightId, 'asr').then(function (response) {
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
         
        flightService.epGetFlightLocal($scope.entity.FlightId ).then(function (response) {

            $scope.loadingVisible = false;
            var diff = Math.abs((new Date()).getTime() - (new Date(response.Data.STALocal)).getTime()) / 3600000;
             
            $scope.flight = response.Data;

            $scope.loadingVisible = true;
           
            flightService.epGetASRByFlight($scope.entity.FlightId).then(function (response2) {
               
                $scope.loadingVisible = false;
                $scope.isEditable = (diff <= 24);
                

                if (!response2.Data) {
                    $scope.entity.Id = -1;
                    $scope.isNew = true;


                }
                else {
                    if (response2.Data.JLSignedBy) {
                        //$scope.isEditable = false;
                        $scope.url_sign = signFiles + response.Data.PICId + ".jpg";
                        $scope.PIC = response.Data.PIC;
                        $scope.signDate = moment(new Date(response.Data.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
                    }
                    if (response2.Data.Alert) {
                        General.Confirm("The report updated by " + response2.Data.Alert+". Would you like to get edited report?", function (res) {
                            if (res) {

                                //var dto = { Id: $scope.ati_flight.ID, };
                                 $scope.loadingVisible = true;
                                flightService.epReplaceASR(response2.Data.server).then(function (res) {
                                     
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

                //console.log('ASR',response2.Data);

            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

            
            //$scope.entity.FlightNo = response.Data.FlightNumber;
            //$scope.entity.Date = new Date(response.Data.STDDay);
            //$scope.entity.ACReg = response.Data.Register;
            //$scope.entity.Route = response.Data.FromAirportIATA + ' - ' + response.Data.ToAirportIATA
            //$scope.entity.FlightNo = response.Data.FlightNumber
            //$scope.FlightNo = {
            //    min: 0,
            //    bindingOptions: {
            //        value: 'entity.FlightNo',
            //    }
            //};

            //$scope.Date = {
            //    min: 0,
            //    bindingOptions: {
            //        value: 'entity.Date',
            //    }
            //};

            //$scope.Route = {
            //    min: 0,
            //    bindingOptions: {
            //        value: 'entity.Route',
            //    }
            //};

            //$scope.ACType = {
            //    min: 0,
            //    bindingOptions: {
            //        value: 'entity.ACType',
            //    }
            //};

            //$scope.ACReg = {
            //    min: 0,
            //    bindingOptions: {
            //        value: 'entity.ACReg',
            //    }
            //};


        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    ////////////////////////////////
    $scope.scroll_asradd_height = $(window).height() - 130;
    $scope.scroll_asradd = {
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
            height: 'scroll_asradd_height'
        }

    };

    /////////////////////////////////
    $scope.entity = {
        Id: -1,
        IsSecurityEvent: false,
        IsAirproxATC: false,
        IsTCASRA:false,
        IsWakeTur: false,
        IsBirdStrike: false,
        IsOthers:false,

    };
    $scope.txt_OccurrenceDate = {
        type: "datetime",
        width: '100%',
        pickerType: "rollers",
        displayFormat: "yyyy-MM-dd HHmm",
        interval: 15,
        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'entity.OccurrenceDate',

        }
    };
    $scope.chb_IsSecurityEvent = {

        text: 'SECURITY EVENT',
        bindingOptions: {
            value: 'entity.IsSecurityEvent',

        }
    };
    $scope.chb_IsAirproxATC = {

        text: 'AIRPROX/ATC',
        bindingOptions: {
            value: 'entity.IsAirproxATC',

        }
    };
    $scope.chb_IsTCASRA = {

        text: 'TCAS RA',
        bindingOptions: {
            value: 'entity.IsTCASRA',

        }
    };
    $scope.chb_IsWakeTur = {

        text: 'WAKE TURB.',
        bindingOptions: {
            value: 'entity.IsWakeTur',

        }
    };
    $scope.chb_IsBirdStrike = {

        text: 'BIRD STRIKE',
        bindingOptions: {
            value: 'entity.IsBirdStrike',

        }
    };
    $scope.chb_IsOthers = {

        text: 'OTHERS',
        bindingOptions: {
            value: 'entity.IsOthers',

        }
    };


    $scope.dsEventType = [
        { id: 100042, title: 'ASR' },
        { id: 100043, title: 'AIRPROX/ATC' },
        { id: 100044, title: 'TCAS RA' },
        { id: 100045, title: 'WAKE TURBULENCE' },
        { id: 100046, title: 'BIRD STRIKE' },
        
    ];
    $scope.sb_EventType = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsEventType,
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.EventTypeId'

        }
    };
    ///////////////////////////
    
   
   

    $scope.dsDayNightStatus = [
        { id: 100180, title: 'Day' },
        { id: 100181, title: 'Night' },
       
    ];
    $scope.sb_DayNightStatus = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsDayNightStatus,
        displayExpr: 'title',
        placeholder:'Day/Night',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.DayNightStatusId'

        }
    };

    $scope.txt_squawk = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.SQUAWK',
        }
    }

    $scope.txt_fuel = {
        hoverStateEnabled: false,
        min:0,
        bindingOptions: {
            value: 'entity.FuelJettisoned',
        }
    }

    $scope.num_alt = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Altitude',
        }
    }

    $scope.num_speed = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Speed',
        }
    }

    $scope.num_mach = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.MachNo',
        }
    }

    $scope.num_acWeight = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACWeight',
        }
    }
    ////////////////////////////
    $scope.num_techLogPage = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TechLogPageNO',
        }
    }

    $scope.num_item = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.TechLogItemNO',
        }
    }

    /////////////////////////////////
    $scope.dsFlightPhase = [
        { id: 100029, title: 'TOWING' },
        { id: 100030, title: 'PARKING' },
        { id: 100031, title: 'PUSHBACK' },
        { id: 100032, title: 'TAXI OUT' },
        { id: 100033, title: 'TAKEOFF' },
        { id: 100034, title: 'INITIAL CLIMB(BELOW 1500FT)' },
        { id: 100035, title: 'CLIMB' },
        { id: 100036, title: 'CRUISE' },
        { id: 100037, title: 'DESCENT' },
        { id: 100038, title: 'HOLDING' },
        { id: 100039, title: 'APPROACH(BELOW 1500FT)' },
        { id: 100040, title: 'LANDING' },
        
    ];
    $scope.sb_flightPhase = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsFlightPhase,
        displayExpr: 'title',
        placeholder:'TOWING/PARKING/...',
        valueExpr:'id',
        bindingOptions: {
            value: 'entity.FlightPhaseId'

        }
    };

    ////////////////////////////////

    

    $scope.txt_airport = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.LOCAirport',

        }
    };

    $scope.txt_stand = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.LOCStand',

        }
    };

    $scope.txt_runway = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.LOCRunway',

        }
    };

    $scope.txt_geoPosAlt = {
        hoverStateEnabled: false,
        placeholder: 'Altitude',
        bindingOptions: {
            value: 'entity.LOCGEOAltitude',

        }
    };

    $scope.txt_geoPosLong = {
        hoverStateEnabled: false,
        placeholder: 'Longtitude',
        bindingOptions: {
            value: 'entity.LOCGEOLongtitude',

        }
    };


    ////////////////////////////////

    $scope.dsMET = [
        { id: 100051, title: 'IMC' },
        { id: 100052, title: 'VMC' },
    ];
    $scope.sb_MET = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsMET,
        displayExpr: 'title',
        placeholder:'IMC/VMC',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.METId'

        }
    };

    ////////////////////////////////

    $scope.dsSignificantWxType = [
        { id: 100054, title: 'MODERATE' },
        { id: 100055, title: 'SEVERE' },
    ]
    $scope.sb_SignificantWxType = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsSignificantWxType,
        displayExpr: 'title',
        placeholder:'MODERATE/SEVERE',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.SigxWXTypeId'

        }
    };

    $scope.dsSignificantWx = [
        { id: 100056, title: 'RAIN' },
        { id: 100057, title: 'SNOW' },
        { id: 100058, title: 'ICING' },
        { id: 100059, title: 'TURBULENCE' },
        { id: 100060, title: 'HAIL' },
        { id: 100061, title: 'STANDING - WATER' },
        { id: 100062, title: 'WINDSHEAR' },
      
    ];
    $scope.sb_SignificantWx = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsSignificantWx,
        displayExpr: 'title',
        placeholder:'RAIN/SNOW/...',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.SigxWXId'
            
        }
    };
    ////////////////////////////////

    $scope.ActualWX = {
        bindingOptions: {
            value: 'entity.ActualWX',
            height: '80',

        }
    };

    ////////////////////////////////

    $scope.dsRunwayCondition = [
        { id: 100064, title: 'DRY' },
        { id: 100065, title: 'WET' },
        { id: 100066, title: 'ICE' },
        { id: 100067, title: 'SNOW' },
        { id: 100068, title: 'SLUSH' },
      
    ];
    $scope.sb_RunwayCondition = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsRunwayCondition,
        displayExpr: 'title',
        placeholder:'DRY/WET/...',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.RunwayConditionId'

        }
    };

    ////////////////////////////////

    $scope.txt_AP = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigAP',

        }
    };

    $scope.txt_ATHR = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigATHR',

        }
    };

    $scope.txt_GEAR = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigGear',

        }
    };

    $scope.txt_FLAP = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigFlap',

        }
    };

    $scope.txt_SLAT = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigSlat',

        }
    };

    $scope.txt_SPOILERS = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.ACConfigSpoilers',

        }
    };


    ////////////////////////////////

    $scope.Summary = {
        bindingOptions: {
            value: 'entity.Summary',
            height: '80',

        }
    };
    ///////////////////////////////
    $scope.Result = {
        bindingOptions: {
            value: 'entity.Result',
            height: '80',

        }
    };
    //////////////////////////////

    $scope.OthersInfo = {
        bindingOptions: {
            value: 'entity.OthersInfo',
            height: '80',

        }
    };

    ///////////////////////////////

    $scope.dsIncidentType = [
        { id: 100183, title: 'AIRMISS' },
        { id: 100184, title: 'ATC INCIDENT' },
        { id: 100185, title: 'TCAS RA' },
        
    ];
    $scope.sb_IncidentType = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsIncidentType,
        placeholder: 'AIRMISS/WET/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.IncidentTypeId'

        }
    };

    ///////////////////////////////

    $scope.dsRisk = [
        { id: 100070, title: 'Low' },
        { id: 100071, title: 'Med' },
        { id: 100072, title: 'High' },
    ];
    $scope.sb_Risk = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsRisk,
        placeholder: 'LOW/MED/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.AATRiskId'

        }
    };
    //////////////////////////////////
    $scope.dsAvoidingAction = [
        { value: true, title: 'YES' },
        { value: false, title: 'NO' },
       ];
    $scope.sb_AvoidingAction = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsAvoidingAction,
        placeholder: 'YES/NO',

        displayExpr: 'title',
        valueExpr: 'value',
        bindingOptions: {
            value: 'entity.AATIsActionTaken'

        }
    };
    ///////////////////////////////
    $scope.txt_Reported = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATReportedToATC',

        }
    };
    $scope.txt_ATCInstruction = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATATCInstruction',

        }
    };

    $scope.txt_Frequency = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATFrequency',

        }
    };
    $scope.txt_Heading = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATHeading',

        }
    };
    $scope.txt_MinVertSep = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATMinVerticalSep',

        }
    };
    $scope.txt_MinHorizSep = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATMinHorizontalSep',

        }
    };

    $scope.dsTCASAlert = [
        { id: 100074, title: 'RA' },
        { id: 100075, title: 'TA' },
        { id: 100076, title: 'None' }, 
    ];
    $scope.sb_TCASAlert = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsTCASAlert,
        placeholder: 'RA/TA/...',

        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.AATTCASAlertId'

        }
    };

    $scope.txt_RAType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATTypeRA',

        }
    };

    $scope.dsRAFollowed = [
        { value: true, title: 'YES' },
        { value: false, title: 'NO' },
    ];
    $scope.sb_RAFollowed = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsRAFollowed,
        placeholder: 'YES/NO',
        displayExpr: 'title',
        valueExpr: 'value',
        bindingOptions: {
            value: 'entity.AATIsRAFollowed'

        }
    };

    $scope.txt_VerticalDeviation = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATVerticalDeviation',

        }
    };
    $scope.txt_OtherAircraft = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATOtherACType',

        }
    };
    $scope.txt_MarkingColour = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATMarkingColour',

        }
    };
    $scope.txt_CallSign = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATCallSign',

        }
    };
    $scope.txt_ClearedAltitude = {
        min:0,
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATClearedAltitude',

        }
    };
    $scope.txt_Lighting = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.AATLighting',

        }
    };
    ////////////////////////////////

    $scope.txt_WTHeading = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WTHeading',

        }
    };
    $scope.txt_BSHeading = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.BSHeading',

        }
    };
    $scope.dsTurning = [
        { id: 100078, title: 'Left' },
        { id: 100079, title: 'Right' },
        { id: 100080, title: 'No' },
     ];
    $scope.sb_Turning = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsTurning,
        placeholder: 'Left/Right/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.WTTurningId'

        }
    };

    $scope.sb_BSTurning = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsTurning,
        placeholder: 'Left/Right/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.BSTurningId'

        }
    };

    $scope.dsGlideSlopePos = [
        { id: 100082, title: 'High' },
        { id: 100083, title: 'Low' },
        { id: 100084, title: 'On' },

    ];
    $scope.sb_GlideSlopePos = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsGlideSlopePos,
        placeholder: 'High/Low/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.WTGlideSlopePosId'

        }
    };
    
    $scope.dsExtendedCenterlinePos = [
        { id: 100087, title: 'Left' },
        { id: 100088, title: 'Right' },
        { id: 100089, title: 'On' },
       
    ];
    $scope.sb_ExtendedCenterlinePos = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsExtendedCenterlinePos,
        placeholder: 'Left/Right/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.WTExtendedCenterlinePosId'

        }
    };
    
    $scope.dsAttitudeChange = [
        { id: 100091, title: 'Pitch' },
        { id: 100092, title: 'Roll' },
        { id: 100093, title: 'Yaw' },
       
    ];
    $scope.sb_AttitudeChange = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsAttitudeChange,
        placeholder: 'Pitch/Roll/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.WTAttitudeChangeId'

        }
    };
    $scope.txt_Deg = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.WTAttitudeChangeDeg',

        }
    };
    $scope.dsBuffet = [
        { value: true, title: 'YES' },
        { value: false, title: 'NO' },
    ];
    $scope.sb_IsBuffet= {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsBuffet,
        placeholder: 'YES/NO',
        displayExpr: 'title',
        valueExpr: 'value',
        bindingOptions: {
            value: 'entity.WTIsBuffet'

        }
    };
    $scope.dsStickShaker = [
        { value: true, title: 'YES' },
        { value: false, title: 'NO' },
    ];
    $scope.sb_StickShaker = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsStickShaker,
        placeholder: 'YES/NO',
        displayExpr: 'title',
        valueExpr: 'value',
        bindingOptions: {
            value: 'entity.WTIsStickShaker'

        }
    };
    $scope.Suspect = {
        bindingOptions: {
            value: 'entity.WTSuspect',
            height: '80',

        }
    };
    $scope.Acceleration = {
        bindingOptions: {
            value: 'entity.WTDescribeVA',
            height: '80',

        }
    };
    $scope.Details = {
        bindingOptions: {
            value: 'entity.WTPrecedingAC',
            height: '80',

        }
    };
    $scope.dsAware = [
        { value: true, title: 'YES' },
        { value: false, title: 'NO' },
    ];
    $scope.sb_Aware = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsAware,
        placeholder: 'YES/NO',
        displayExpr: 'title',
        valueExpr: 'value',
        bindingOptions: {
            value: 'entity.WTIsAware'

        }
    };
    ////////////////////////////////

    $scope.txt_BirdType = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.BSBirdType',

        }
    };

    $scope.dsTime = [
        { id: 100104, title: 'Dawn' },
        { id: 100105, title: 'Day' },
        { id: 100106, title: 'Dusk' },
        { id: 100107, title: 'Night' },


    ];
    $scope.sb_Time = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsTime,
        placeholder: 'Dawn/Day/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.BSTimeId'

        }
    };

    $scope.dsNrSeen = [
        { id: 100098, title: '1' },
        { id: 100099, title: '2-10' },
        { id: 100100, title: '11-100' },
        { id: 100101, title: 'More' },
  
    ];
    $scope.sb_NrSeen = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsNrSeen,
        placeholder: '1/2-10/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.BSNrSeenId'

        }
    };

    $scope.dsNrStruck = [
        { id: 100098, title: '1' },
        { id: 100099, title: '2-10' },
        { id: 100100, title: '11-100' },
        { id: 100101, title: 'More' },

    ];
    $scope.sb_NrStruck = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsNrStruck,
        placeholder: '1/2-10/...',
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.BSNrStruckId'

        }
    };
    $scope.Impact = {
        bindingOptions: {
            value: 'entity.BSImpactDec',
            height: '80',

        }
    };

    ///////////////////////////////

    $scope.tdWidth = $(window).width() / 31.0;
    $scope.rows = [-100, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5, -6, -7, -8, -9, -10]
    $scope.columns = [-100, -14, -13, -12, -11, -10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    $scope.getTdClass = function (c, r) {
        var cls = "";
        if (r == 0 && c == 0) { return "ctd-center ctd"; }
        if (r != -100) {
            if (c == -100) {
                cls = "ctd-empty";
            }
            else {
                cls = "ctd";
            }
        }
        else {
            //if (c != -100) return "ctd-empty";
            //else
            //    return "ctd";
            cls = "ctd-empty";
        }
        if (c == $scope.entity.AATXAbove && r == $scope.entity.AATYAbove) {
            cls += " ctd-selected";
        }

        return cls;

    }
    $scope.tableAboveClicked = function (r, c) {
        $scope.entity.AATXAbove = c;
        $scope.entity.AATYAbove = r;
    }



    $scope.getAsClass = function (c, r) {
        var cls = "";
        if (r == 0 && c == 0) { return "ctd-center ctd"; }
        if (r != -100) {
            if (c == -100) {
                cls = "ctd-empty";
            }
            else {
                cls = "ctd";
            }
        }
        else {
            //if (c != -100) return "ctd-empty";
            //else
            //    return "ctd";
            cls = "ctd-empty";
        }


        if (c == $scope.entity.AATXAstern && r == $scope.entity.AATYAstern) {
            cls += " ctd-selected";
        }
        return cls;

    }
    $scope.tableAsternClicked = function (r, c) {
        $scope.entity.AATXAstern = c;
        $scope.entity.AATYAstern = r;
    }


    

    ////////////////////////////////
    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {
        
        if (prms.doc == 'asr')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
               // $scope.isEditable = false;
               // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitAsrAdd', function (event, prms) {


        $scope.tempData = null;

       

            
            $scope.tempData = prms;
           
         
        $scope.popup_add_visible = true;

    });

}]);


