﻿'use strict';
app.controller('formsController', ['$scope', '$location', '$routeParams', '$rootScope', '$window', 'flightService', 'authService', 'notificationService', '$route', 'activityService', function ($scope, $location, $routeParams, $rootScope, $window, flightService, authService, notificationService, $route, activityService) {
    $scope.prms = $routeParams.prms;

    $scope.formatDate = function (dt) {
        return moment(dt).format('YYYY-MMM-DD');
    };


    $scope.scroll_height = $(window).height() - 110;
    $scope.scroll_main = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            $scope.bind();

            options.component.release();

        },
        bindingOptions: { height: 'scroll_height', }
    };

    $scope.loadingVisible = false;
    $scope.loadPanel = {
        message: 'Please wait...',

        showIndicator: true,
        showPane: true,
        shading: true,
        closeOnOutsideClick: false,
        shadingColor: "rgba(0,0,0,0.4)",
        // position: { of: "body" },
        onShown: function () {

        },
        onHidden: function () {

        },
        bindingOptions: {
            visible: 'loadingVisible'
        }
    };

    $scope.popup_newform_visible = false;
    $scope.popup_newform = {
        height: 450,
        width: 400,
        title: 'Vacation Request Form',
        showTitle: true,

        toolbarItems: [



            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', onClick: function (e) {
                        var dto = {
                            CrewId: -1,
                            DateFrom: new Date($scope.dt_from),
                            DateTo: new Date($scope.dt_to),
                            ReasonStr: $scope.reason,
                            Remark: $scope.remark
                        };
                        $scope.loadingVisible = true;
                        flightService.saveVacationForm(dto).then(function (response) {
                            $scope.loadingVisible = false;

                            $scope.bind();
                            $scope.popup_newform_visible = false;

                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {
                        $scope.popup_newform_visible = false;
                    }
                }, toolbar: 'bottom'
            }

        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {

        },
        onShown: function (e) {

        },
        onHiding: function () {

            //$scope.clearEntity();

            $scope.popup_newform_visible = false;

        },
        onContentReady: function (e) {

        },
        bindingOptions: {
            visible: 'popup_newform_visible',


        }
    };

    $scope.dt_from = new Date();
    $scope.date_from = {
        type: "date",
        width: '100%',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd",
        
        onValueChanged: function (arg) {
            
        },
        bindingOptions: {
            value: 'dt_from',

        }
    };
    $scope.dt_to = new Date();
    $scope.date_to = {
        type: "date",
        width: '100%',
        pickerType: "rollers",
        displayFormat: "yyyy-MMM-dd",

        onValueChanged: function (arg) {

        },
        bindingOptions: {
            value: 'dt_to',

        }
    };
    $scope.reasons = [
        { id: 1, title: 'Vacation' },
        { id: 2, title: 'Medical Care' },
        { id: 3, title: 'Other' },
    ];

    $scope.reason = 'Vacation';
    $scope.sb_reason = {
        showClearButton: false,
        searchEnabled: false,
        dataSource: $scope.reasons,
        displayExpr: 'title',
        placeholder: '',
        valueExpr: 'title',
        bindingOptions: {
            value: 'reason'

        }
    };

    $scope.remark = '';
    $scope.txt_remark = {
        bindingOptions: {
            value: 'remark',
            height: '90',

        }
    };

    $scope.bind = function () {
       
        $scope.loadingVisible = true;
        flightService.epGetVacationForms().then(function (response) {
            $scope.loadingVisible = false;
            
            $scope.ds = response.Data;
           // console.log('PIFs:');
            console.log(response);

        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };
    $scope.FormClick = function (x) {
        $.each($scope.ds, function (_i, _d) {
            _d.selected = false;
            if (_d.Id == x.Id)
                _d.selected = true;
        });
    };
    $scope.getFormClass = function (x) {
        return x.selected ? "form-selected":"";
    };
    $scope.$on('new_form', function (evt, data) {
        $scope.popup_newform_visible = true;
        
    });

    $scope.$on('delete_form', function (evt, data) {
        var item = Enumerable.From($scope.ds).Where('$.selected').FirstOrDefault();

        if (item) {

            $scope.ds = Enumerable.From($scope.ds).Where('$.Id!=' + item.Id).ToArray();
        }

    });
    $scope.$on('$viewContentLoaded', function () {

        $scope.bind();
    });


    var appWindow = angular.element($window);
    appWindow.bind('resize', function () {
        //alert('w: '+$(window).width());

        $scope.$apply(function () {
            $scope.scroll_height = $(window).height() - 110;
        });
    });
    ///////////////////////////////////////

}]);