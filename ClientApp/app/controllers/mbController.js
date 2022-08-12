﻿'use strict';
app.controller('mbController', ['$scope', '$location', 'flightService', 'mbService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, flightService, mbService, authService, $routeParams, $rootScope, $window) {


    mbService.getLimitation(32).then(function (response) {
        $scope.limitation = response.Result.Data;
    });

    $scope.entity =
    {
        fso: 0,
        fm: 0,
        oa: 0,
        ob: 0,
        oc: 0,
        od: 0,
        cpt1: 0,
        cpt2: 0,
        cpt3: 0,
        cpt4: 0,
        adult: 0,
        child: 0,
        infant: 0
    }

    $scope.isNew = true;
    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = false;




    var detector = new MobileDetect(window.navigator.userAgent);

    //if (detector.mobile() && !detector.tablet())
    $scope.isFullScreen = true;



    ////////////////////////
    $scope.popup_mb_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_mb_title = 'Mass & Balance';
    $scope.popup_instance = null;

    $scope.popup_mb = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Sign', icon: 'fas fa-signature', onClick: function (e) {
                        if ($rootScope.getOnlineStatus()) {
                            $rootScope.checkInternet(function (st) {
                                if (st) {
                                    var data = { FlightId: $scope.entity.FlightId, documentType: 'mb' };

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
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'mb', onClick: function (e) {

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

                        $scope.loadingVisible = false;
                        flightService.saveASR($scope.entity).then(function (response2) {
                            $scope.loadingVisible = false;
                            if (response2.IsSuccess) {
                                General.ShowNotify(Config.Text_SavedOk, 'success');
                                console.log('MB', response2.Data);
                                $scope.popup_mb_visible = false;
                            }


                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Execute', icon: 'check', onClick: function (e) {
                        //mbService.calLoadSheet($scope.entity, $scope.tempData.FlightId).then(function (response) {
                        //    $scope.loadingVisible = false;
                        //    $scope.mbData = response.Result.Data;
                        //})
						$scope.entity.FlightId= $scope.tempData.FlightId;
                        $scope.loadingVisible = true;
                        mbService.calLoadSheet($scope.entity).then(function (response) {
                            $scope.loadingVisible = false;
                            mbService.getLoadsheet($scope.tempData.FlightId).then(function (response) {

                                $scope.mbData = response.Result.Data;
                                    $scope.entity =
                                    {
                                        pilot: $scope.mbData.Pilot,
                                        cabin: $scope.mbData.Cabin,
                                        fso: $scope.mbData.FSO,
                                        fm: $scope.mbData.FM,
                                        oa: $scope.mbData.OASec,
                                        ob: $scope.mbData.OBSec,
                                        oc: $scope.mbData.OCSec,
                                        od: $scope.mbData.ODSec,
                                        cpt1: $scope.mbData.CPT1,
                                        cpt2: $scope.mbData.CPT2,
                                        cpt3: $scope.mbData.CPT3,
                                        cpt4: $scope.mbData.CPT4,
                                        adult: $scope.mbData.PaxAdult,
                                        child: $scope.mbData.PaxChild,
                                        infant: $scope.mbData.PaxInfant,
                                        pantryCode: $scope.mbData.PantryCode,
                                        maxtow: $scope.mbData.MAXTOW,
                                    }
                                
                                   
                                
                            })
                        })

                    }
                }, toolbar: 'bottom'
            },
			{
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_mb_visible = false;
                    }
                }, toolbar: 'bottom'
            },
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
            $scope.popup_mb_visible = false;
            $rootScope.$broadcast('onMBHide', null);
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        // fullScreen:false,
        bindingOptions: {
            visible: 'popup_mb_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_mb_title',
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

        mbService.getLoadsheet($scope.tempData.FlightId).then(function (response) {

            console.log(response.Result.Data.TOW);

            if (!response.Result.Data.TOW) {
				  $scope.entity =
    {
        fso: 0,
        fm: 0,
        oa: 0,
        ob: 0,
        oc: 0,
        od: 0,
        cpt1: 0,
        cpt2: 0,
        cpt3: 0,
        cpt4: 0,
        adult: 0,
        child: 0,
        infant: 0,
        FlightId:0
    }

                $scope.isNew = true;
                $scope.mbData = null;
            }
            else {
                $scope.mbData = response.Result.Data;
                console.log($scope.mbData);
                $scope.entity =
                {
                    pilot: $scope.mbData.Pilot,
                    cabin: $scope.mbData.Cabin,
                    fso: $scope.mbData.FSO,
                    fm: $scope.mbData.FM,
                    oa: $scope.mbData.OASec,
                    ob: $scope.mbData.OBSec,
                    oc: $scope.mbData.OCSec,
                    od: $scope.mbData.ODSec,
                    cpt1: $scope.mbData.CPT1,
                    cpt2: $scope.mbData.CPT2,
                    cpt3: $scope.mbData.CPT3,
                    cpt4: $scope.mbData.CPT4,
                    adult: $scope.mbData.PaxAdult,
                    child: $scope.mbData.PaxChild,
                    infant: $scope.mbData.PaxInfant,
                    pantryCode: $scope.mbData.PantryCode,
                    maxtow: $scope.mbData.MAXTOW,
                }

                console.log($scope.mbData);
            }
        })


        console.log($scope.mbData);



        //$scope.loadingVisible = true;
        $scope.loadingVisible = false;



    };
    ////////////////////////////////
    $scope.scroll_mb_height = $(window).height() - 130;
    $scope.scroll_mb = {
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
            height: 'scroll_mb_height'
        }

    };

    /////////////////////////////////

    $scope.dsPantryCode = [
        { id: 'A', title: 'A' },
        { id: 'B', title: 'B' },
        { id: 'C', title: 'C' },
        { id: 'D', title: 'D' },
        { id: 'E', title: 'E' },
    ];
    $scope.sb_pantryCode = {
        showClearButton: true,
        searchEnabled: false,
        dataSource: $scope.dsPantryCode,
        displayExpr: 'title',
        valueExpr: 'id',
        bindingOptions: {
            value: 'entity.pantryCode'

        }
    };


    $scope.txt_pilot = {
        hoverStateEnabled: false,
        min: 2,
        bindingOptions: {
            value: 'entity.pilot',

        }
    };

    $scope.txt_cabin = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.cabin',

        }
    };

    $scope.txt_security = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.fso',

        }
    };

    $scope.txt_main = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.fm',

        }
    };
    ///////////////////////////////

    $scope.txt_A = {
        hoverStateEnabled: false,

        min: 0,
        bindingOptions: {
            max: 'limitation.OASecLimit',
            value: 'entity.oa',

        }
    };

    console.log($scope.limitation);
    $scope.txt_B = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.ob',
            max: 'limitation.OBSecLimit',

        }
    };

    $scope.txt_C = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.oc',
            max: 'limitation.OCSecLimit',

        }
    };

    $scope.txt_D = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.od',
            max: 'limitation.ODSecLimit',

        }
    };

    ///////////////////////////////

    $scope.txt_adult = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.adult',

        }
    };

    $scope.txt_child = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.child',

        }
    };

    $scope.txt_infant = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.infant',

        }
    };

    $scope.txt_totalPassenger = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.adult + entity.child + entity.infant + entity.fm + entity.fso',

        }
    };

    $scope.txt_sob = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.adult + entity.child + entity.infant + entity.fm + entity.fso + entity.pilot + entity.cabin',

        }
    };
    $scope.txt_maxtow = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.maxtow',

        }
    };

    ///////////////////////////////


    $scope.txt_cpt1 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            max: 'limitation.CPT1Limit',
            value: 'entity.cpt1',

        }
    };

    $scope.txt_cpt2 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.cpt2',
            max: 'limitation.CPT2Limit',

        }
    };

    $scope.txt_cpt3 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.cpt3',
            max: 'limitation.CPT3Limit',

        }
    };

    $scope.txt_cpt4 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.cpt4',
            max: 'limitation.CPT4Limit',

        }
    };

    //$scope.txt_toFuel = {
    //    hoverStateEnabled: false,
    //    min: 0,
    //    bindingOptions: {
    //        value: 'entity.toFuel',

    //    }
    //};

    //$scope.txt_tiFuel = {
    //    hoverStateEnabled: false,
    //    min: 0,
    //    bindingOptions: {
    //        value: 'entity.tiFuel',

    //    }
    //};



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

        if (prms.doc == 'mb')
            flightService.signDocLocal(prms, prms.doc).then(function (response) {
                // $scope.isEditable = false;
                // $scope.isLockVisible = false;
                $scope.url_sign = signFiles + prms.PICId + ".jpg";
                $scope.PIC = prms.PIC;
                $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

    });
    $scope.$on('InitMb', function (event, prms) {


        $scope.tempData = null;

        $scope.tempData = prms;



        console.log($scope.tempData);

        $scope.popup_mb_visible = true;




    });

}]);


