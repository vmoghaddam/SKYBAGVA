'use strict';
app.controller('mbController', ['$scope', '$location', 'flightService', 'mbService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, flightService, mbService, authService, $routeParams, $rootScope, $window) {

    $scope.isNew = true;
    $scope.isEditable = false;
    $scope.isLockVisible = false;
    $scope.isContentVisible = false;
    $scope.isFullScreen = true;
    $scope.Loadsheet = false;

    $scope.entity = {
        Id: -1
    }


    ////////////////////////


    $scope.popup_mb_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_mb_title = 'Mass & Balance';
    $scope.popup_instance = null;
    $scope.popup_mb = {


        showTitle: true,

        toolbarItems: [{
            widget: 'dxButton', location: 'after', options: {
                type: 'default', text: 'Execute', icon: 'check', validationGroup: 'mb', useSubmitBehavior: true, onClick: function (e) {


                    var result = e.validationGroup.validate();

                    if (!result.isValid) {
                        General.ShowNotify(Config.Text_FillRequired, 'error');
                        return;
                    }


                    $scope.entity.FlightId = $scope.tempData.FlightId;
                    $scope.entity.maxzfw = $scope.limitation.MAXZFW;
                    $scope.entity.maxlnw = $scope.limitation.MAXLNW;
                    $scope.entity.Cabin = $scope.entity.Cabin == null ? 0 : $scope.entity.Cabin
                    $scope.entity.FSO = $scope.entity.FSO == null ? 0 : $scope.entity.FSO
                    $scope.entity.FM = $scope.entity.FM == null ? 0 : $scope.entity.FM
                    $scope.entity.OASec = $scope.entity.OASec == null ? 0 : $scope.entity.OASec
                    $scope.entity.OBSec = $scope.entity.OBSec == null ? 0 : $scope.entity.OBSec
                    $scope.entity.OCSec = $scope.entity.OCSec == null ? 0 : $scope.entity.OCSec
                    $scope.entity.ODSec = $scope.entity.ODSec == null ? 0 : $scope.entity.ODSec
                    $scope.entity.PaxAdult = $scope.entity.PaxAdult == null ? 0 : $scope.entity.PaxAdult
                    $scope.entity.PaxChild = $scope.entity.PaxChild == null ? 0 : $scope.entity.PaxChild
                    $scope.entity.PaxInfant = $scope.entity.PaxInfant == null ? 0 : $scope.entity.PaxInfant
                    $scope.entity.CPT1 = $scope.entity.CPT1 == null ? 0 : $scope.entity.CPT1
                    $scope.entity.CPT2 = $scope.entity.CPT2 == null ? 0 : $scope.entity.CPT2
                    $scope.entity.CPT3 = $scope.entity.CPT3 == null ? 0 : $scope.entity.CPT3
                    $scope.entity.CPT4 = $scope.entity.CPT4 == null ? 0 : $scope.entity.CPT4
                    $scope.entity.CARGO = $scope.entity.CPT1 + $scope.entity.CPT2 + $scope.entity.CPT3 + $scope.entity.CPT4

                    $scope.loadingVisible = true;

                    mbService.saveLoadsheet($scope.entity).then(function (response) {
                        $scope.loadingVisible = false;
                        mbService.getLoadsheet($scope.tempData.FlightId).then(function (response2) {

                            //$scope.mbData = response2.Result.Data;
                            $scope.Loadsheet = true;
                            $scope.fill(response2.Result.Data);


                            console.log('loadsheet', response2.Result.Data);

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
            };



            $scope.popup_mb_visible = false;
            //$rootScope.$broadcast('onMBHide', null);
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        bindingOptions: {
            visible: 'popup_mb_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_mb_title',
            height: 'popup_height',
            width: 'popup_width',
            // 'toolbarItems[0].visible': 'isLockVisible',
            // 'toolbarItems[1].visible': 'isEditable',

        }
    };





    /////////////////////////////////

    $scope.fill = function (data) {
        $scope.entity = data;
        $scope.mbData = data
    };

    $scope.isLockVisible = false;
    $scope.bind = function () {
        $scope.entity.FlightId = $scope.tempData.FlightId;





        mbService.getLocalLoadSheet($scope.entity.FlightId).then(function (response) {

            $scope.fill(response.Data);


            if (!response.Data)
                $scope.Loadsheet = false;

            mbService.getLoadsheet($scope.tempData.FlightId).then(function (response2) {



                mbService.getLimitation(response2.Result.Data.RegisterID).then(function (response3) {
                    $scope.limitation = response3.Result.Data;
                });



                if (!response2.Result.Data.TOW) {
                    $scope.isNew = true;
                    $scope.mbData = null;
                    $scope.Loadsheet = false;

                }
                else {
                    $scope.fill(response2.Result.Data);
                    $scope.Loadsheet = true;
                }
            })


            $scope.loadingVisible = false;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


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
            value: 'entity.PantryCode'

        }
    };


    $scope.txt_pilot = {
        hoverStateEnabled: false,
        min: 2,
        bindingOptions: {
            value: 'entity.Pilot',

        }
    };

    $scope.txt_cabin = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.Cabin',

        }
    };

    $scope.txt_security = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.FSO',
        }
    };

    $scope.txt_main = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.FM',

        }
    };

    $scope.txt_A = {
        hoverStateEnabled: false,

        min: 0,
        bindingOptions: {
            max: 'limitation.OASecLimit',
            value: 'entity.OASec',

        }
    };

    $scope.txt_B = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.OBSec',
            max: 'limitation.OBSecLimit',

        }
    };

    $scope.txt_C = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.OCSec',
            max: 'limitation.OCSecLimit',

        }
    };

    $scope.txt_D = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.ODSec',
            max: 'limitation.ODSecLimit',

        }
    };

    $scope.txt_adult = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.PaxAdult',

        }
    };

    $scope.txt_child = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.PaxChild',

        }
    };

    $scope.txt_infant = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.PaxInfant',

        }
    };

    $scope.txt_totalPassenger = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.PaxAdult + entity.PaxChild + entity.PaxInfant + entity.FM + entity.FSO',

        }
    };

    $scope.txt_sob = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.PaxAdult + entity.PaxChild + entity.PaxInfant + entity.FM + entity.FSO + entity.Pilot + entity.Cabin',

        }
    };
    $scope.txt_maxtow = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.MAXTOW',

        }
    };

    $scope.txt_cpt1 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            max: 'limitation.CPT1Limit',
            value: 'entity.CPT1',

        }
    };

    $scope.txt_cpt2 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.CPT2',
            max: 'limitation.CPT2Limit',

        }
    };

    $scope.txt_cpt3 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.CPT3',
            max: 'limitation.CPT3Limit',

        }
    };

    $scope.txt_cpt4 = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: 'entity.CPT4',
            max: 'limitation.CPT4Limit',

        }
    };


   
    $scope.txt_reg = {
        hoverStateEnabled: false,
        bindingOptions: {
            value: 'entity.Register',

        }
    };

    $scope.fltNo = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.FlightNumber',

        }
    };

    
    var route = function (from, to) {
        return from + " - " + to
    }

    $scope.txt_route = {
        hoverStateEnabled: false,
        min: 0,
        bindingOptions: {
            value: route($scope.entity.FromAirport, $scope.entity.ToAirport),

        }
    };


    $scope.PilotValidation = {
        validationRules: [{
            type: 'required',
            message: 'Pilot is required',
        }],
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


    ////////////////////////////////
    $scope.tempData = null;
    $scope.$on('onSign', function (event, prms) {

        $scope.url_sign = signFiles + prms.PICId + ".jpg";
        $scope.PIC = prms.PIC;
        $scope.signDate = moment(new Date(prms.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');


        //if (prms.doc == 'mb')
        //    flightService.signDocLocal(prms, prms.doc).then(function (response) {
        //        // $scope.isEditable = false;
        //        // $scope.isLockVisible = false;

        //    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


    });


    $scope.$on('InitMb', function (event, prms) {


        $scope.tempData = null;

        $scope.tempData = prms;


        $scope.popup_mb_visible = true;

    });

}]);


