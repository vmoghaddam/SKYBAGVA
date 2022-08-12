'use strict';
app.controller('profileviewController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', '$route', '$timeout', 'flightService', '$window', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, $route, $timeout, flightService, $window) {



    $scope.scroll_height = 200;
    $scope.scroll_profileview = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
           //  $scope.bind();
            //Alert.getStartupNots(null, function (arg) {
            //    options.component.release();
            //    // refreshCarts(arg);
            //});
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


    $scope.bind = function () {
         
        $scope.loadingVisible = true;
        generalService.getProfileView($rootScope.employeeId).then(function (response) {
            $scope.loadingVisible = false;
            console.log(response);
            $scope.entity = response.Data;
            //$scope.data = response;
            //$scope.emp = response.Employee;
            //$scope.bindACTypes();
            //$scope.bindCMC();
            ////////////////////////
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    };

    ////////////////////////////////////////
    $scope.txt_rank = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.JobGroup',

        }
    };
    $scope.txt_types = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.Types',

        }
    };
    $scope.txt_FirstName = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.FirstName',
           
        }
    };
    $scope.txt_LastName = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.LastName',
             
        }
    };
    $scope.txt_lprlevel = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.ICAOLPRLevel',

        }
    };
    $scope.txt_medclass = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.MedicalClass',

        }
    };
    $scope.txt_medlimitation = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.MedicalLimitation',

        }
    };

    $scope.txt_lictitle = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.LicenceTitle',

        }
    };
    $scope.txt_licno = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.NDTNumber',

        }
    };
    $scope.txt_licrating = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.RaitingCertificates',

        }
    };
    $scope.txt_licremark = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.LicenceDescription',

        }
    };
    
    $scope.txt_cmcemployedby = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.CMCEmployedBy',

        }
    };
    
    $scope.txt_cmcoccupation = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.CMCOccupation',

        }
    };
    
    $scope.date_cmcexp = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.CrewMemberCertificateExpireDate',

        }
    };

    $scope.date_medexp = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.DateNextCheckUP',

        }
    };
     $scope.date_medissue = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.DateLastCheckUP',

        }
    };
    $scope.date_lprexp = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.ICAOLPRValidUntil',

        }
    };
    $scope.txt_nid = {
 
        readOnly: true,
        hoverStateEnabled: false,

        mask: "999-999999-9",
         
        bindingOptions: {
            value: 'entity.NID',
             
        }
    };
    $scope.date_DateBirth = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.DateBirth',
           
        }
    };
    $scope.date_lic = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.LicenceIssueDate',

        }
    };
    $scope.date_licir = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.LicenceIRExpireDate',

        }
    };
    $scope.date_DatePassportExpire = {
        width: '100%',
        type: 'date',
        displayFormat: "yyyy-MM-dd MMM",
        readOnly: true,

        bindingOptions: {
            value: 'entity.DatePassportExpire',

        }
    };
    $scope.txt_Email = {
        mode: 'email',
        readOnly: true,
        bindingOptions: {
            value: 'entity.Email',
           
        }
    };
    $scope.txt_Mobile = {


        hoverStateEnabled: false,
        mask: "AB00-0000000",
        maskRules: {
            "A": /[0]/,
            "B": /[9]/,

        },
        maskChar: '_',
        readOnly: true,

        bindingOptions: {
            value: 'entity.Mobile',
            
        }
    };
    $scope.txt_base = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.BaseAirport',

        }
    };
    $scope.txt_city = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.CityFullName',

        }
    };
    $scope.txt_address = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.Address',

        }
    };
    $scope.txt_PassportNumber = {
        hoverStateEnabled: false,
        readOnly: true,
        bindingOptions: {
            value: 'entity.PassportNumber',
             
        }
    };
    ///////////////////////////////////////

    var appWindow = angular.element($window);
    appWindow.bind('resize', function () {
        //alert('w: '+$(window).width());

        $scope.$apply(function () {
            $scope.scroll_height = $(window).height() - 45 - 60;
        });
    });


    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Profile';
        $scope.scroll_height = $(window).height() - 45 - 60;
        $('.profileview').fadeIn();
        //$scope.bind();

        $scope.bind();
    }

    ///////////////////////////////////
}]);
