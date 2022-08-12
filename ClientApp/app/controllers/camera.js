'use strict';
app.controller('cameraController', ['$scope', '$location', 'flightService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, flightService, authService, $routeParams, $rootScope, $window) {
    $scope.isFullScreen = false;
    $scope.img_visible = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    //if (detector.mobile() && !detector.tablet())
    $scope.isFullScreen = true;
    $scope.image_data_url = null;
    $scope.isCapturing = true;
    $scope.isSaving = false;
    $scope.popup_add_visible = false;
    $scope.popup_height = $(window).height() - 300;
    $scope.popup_width = $(window).width() - 0;
    $scope.popup_add_title = '';
    $scope.popup_instance = null;

    $scope.savedDate = null;
    $scope.callSave = function ( ) {

        //$scope.callSave({ FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: moment(dt).format('YYYY-MMM-DD HH:mm') },dt);

        $scope.savedDate = $scope.image_data_url;
        $scope.$apply(function () {
            $scope.popup_add_visible = false;
        });

    };
    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Capture', icon: 'fas fa-camera', onClick: function (e) {
                        if ($rootScope.getOnlineStatus()) {
                            $rootScope.checkInternet(function (st) {
                                if (st) {
                                    const video = document.querySelector('video');
                                    var x = /*document.getElementById("saved_img");*/ document.createElement("CANVAS");
                                   // $('#saved_img').width($(window).width()).height($(window).height() - 110);
                                    x.width =  video.videoWidth;
                                    x.height =  video.videoHeight;
                                    $('#img_container').width($(window).width());
                                    $('#img_container').css('minHeight', $(window).height() - 120 );
                                    x.getContext('2d').drawImage(video, 0, 0);
                                    $scope.image_data_url = x.toDataURL('image/jpeg');
                                     
                                    
                                   // $('#saved_img2').attr('src', image_data_url);
                                    $('#saved_img2').on('load', function () {
                                        var ih = $('#saved_img2').height();
                                        var ch = $('#img_container').height();
                                        if (ch > ih) {
                                            var t = ((ch - ih) / 2).toString();
                                            $('#saved_img2').css('top', t+'px');
                                        }
                                    });
                                    $('#saved_img2').attr('src', $scope.image_data_url);
                                   
                                   
                                    $scope.img_visible = true;
                                    $scope.isCapturing = false;
                                    $scope.isSaving = true;
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
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Save', icon: 'check', validationGroup: 'toadd', onClick: function (e) {
                        //  alert($scope.image_data_url);
                        // alert($scope.Type + ' ' + $scope.FlightId + ' ' + $scope.FDPId);
                        var dt = new Date();

                        if ($rootScope.getOnlineStatus()) {
                            $rootScope.checkInternet(function (st) {
                                if (st) {

                                    var dto = { FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: new Date(dt) };
                                    $scope.loadingVisible = true;
                                    flightService.saveDoc(dto).then(function (response) {
                                        $scope.loadingVisible = false;

                                        db.DeleteDoc($scope.FDPId, $scope.FlightId, $scope.Type, function () {//2022-05-28T08:50:00
                                            db.AddDoc({ FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: moment(dt).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: true }, function () {
                                                $scope.callSave( );

                                            });
                                        });

                                    }, function (err) {
                                        $scope.loadingVisible = false;
                                            db.DeleteDoc($scope.FDPId, $scope.FlightId, $scope.Type, function () {
                                                db.AddDoc({ FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: moment(dt).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: false }, function () {
                                                    $scope.callSave();

                                                });
                                            });
                                    });


                                }
                                else {

                                    db.DeleteDoc($scope.FDPId, $scope.FlightId, $scope.Type, function () {
                                        db.AddDoc({ FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: moment(dt).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: false }, function () {
                                            $scope.callSave();

                                        });
                                    });
                                }
                            });
                        }
                        else {
                            db.DeleteDoc($scope.FDPId, $scope.FlightId, $scope.Type, function () {
                                db.AddDoc({ FDPId: $scope.FDPId, FlightId: $scope.FlightId, Type: $scope.Type, Data: $scope.image_data_url, Date: moment(dt).format('YYYY-MM-DDTHH:mm:ss'), IsSynced: false }, function () {
                                    $scope.callSave();

                                });
                            });
                        }
                        



                        
                       

                        //$scope.entity.User = $rootScope.userTitle;
                        //$scope.entity.Type = "TO";

                        //$scope.loadingVisible = true;
                        //flightService.saveTOLND($scope.entity).then(function (response2) {
                        //    $scope.loadingVisible = false;
                        //    if (response2.IsSuccess) {
                        //        General.ShowNotify(Config.Text_SavedOk, 'success');

                        //        $scope.popup_add_visible = false;
                        //    }


                        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'danger', text: 'Cancel', icon: 'check', validationGroup: 'toadd', onClick: function (e) {

                        $scope.img_visible = false;
                        $scope.isCapturing = true;
                        $scope.isSaving = false;
                        //$scope.entity.User = $rootScope.userTitle;
                        //$scope.entity.Type = "TO";

                        //$scope.loadingVisible = true;
                        //flightService.saveTOLND($scope.entity).then(function (response2) {
                        //    $scope.loadingVisible = false;
                        //    if (response2.IsSuccess) {
                        //        General.ShowNotify(Config.Text_SavedOk, 'success');

                        //        $scope.popup_add_visible = false;
                        //    }


                        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });




                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'danger', text: 'Close', icon: 'remove', onClick: function (e) {

                        

                        $scope.popup_add_visible = false;
                       // alert($('#saved_img2').height());
                    }
                }, toolbar: 'bottom'
            }
        ],

        visible: false,
        dragEnabled: true,
        closeOnOutsideClick: false,
        onShowing: function (e) {
            $scope.img_visible = false;
            
            $scope.savedDate = null;
            $scope.isCapturing = true;
            $scope.isSaving = false;
            $scope.popup_instance.repaint();


        },
        onShown: function (e) {

            if ($scope.isNew) {
                $scope.isContentVisible = true;
            }
           // if ($scope.tempData != null)
            //    $scope.bind();


            $scope._camera();


        },
        onHiding: function () {
           // $rootScope.IsRootSyncEnabled = true;
            //$scope.clearEntity();
           
            stream.getTracks().forEach(function (track) {
                track.stop();
                
            });
            
            $scope.popup_add_visible = false;
            $rootScope.$broadcast('onCameraHide', { type: $scope.Type, data: $scope.image_data_url });
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
            'toolbarItems[0].visible': 'isCapturing',
            'toolbarItems[1].visible': 'isSaving',
            'toolbarItems[2].visible': 'isSaving',

        }
    };
    ///////////////////////////////////
    var stream = null;
    $scope._camera = function () {
        $('video').width($(window).width() - 15).height($(window).height() - 120);
       // $('#saved_img2').width($(window).width() -50);//.height($(window).height() - 120);
      //  $('#saved_img2').height(2000);
        var _wx = 1200;
        var _hx = 600;

        let on_stream_video = document.querySelector('#camera-stream');
        

        let flipBtn = document.querySelector('#flip-btn');


        let constraints = { audio: false, video: true }
        let shouldFaceUser = false;


        let supports = navigator.mediaDevices.getSupportedConstraints();
        if (supports['facingMode'] === true) {
          //  flipBtn.disabled = false;
        }

        

        function capture(_w,_h) {
            constraints.video = {
                width: { ideal: $(window).width() },
                height: { ideal: $(window).height() - 120 },
              
                
                facingMode: shouldFaceUser ? 'user' : 'environment'
            }
            navigator.mediaDevices.getUserMedia(constraints)
                .then(function (mediaStream) {
                    stream = mediaStream;

                    let stream_settings = stream.getVideoTracks()[0].getSettings();
                    let stream_width = stream_settings.width;
                    let stream_height = stream_settings.height;

                    console.log('Width: ' + stream_width + 'px');
                    console.log('Height: ' + stream_height + 'px');


                    on_stream_video.srcObject = stream;
                    on_stream_video.play();
                })
                .catch(function (err) {
                   
                    console.log(err)
                });

           
        }

       

        capture(_wx,_hx);
        function drawDataURIOnCanvas(strDataURI, canvas) {
            "use strict";
            var img = new window.Image();
            img.addEventListener("load", function () {
                canvas.getContext("2d").drawImage(img, 0, 0);
            });
            img.setAttribute("src", strDataURI);
        }
        
    };



    $scope.scroll_camera_height = $(window).height() - 110;
    $scope.scroll_camera = {
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
            //height: 'scroll_camera_height'
        }

    };
    //////////////////////////////////////
    var appWindow = angular.element($window);
    appWindow.bind('resize', function () {
        //alert('w: '+$(window).width());

        $scope.$apply(function () {
            if($scope.popup_add_visible)
           // $scope.scroll_camera_height = $(window).height() - 120;
                $scope._camera();
        });
    });
    //////////////////////////////////////
    $scope.$on('InitCamera', function (event, prms) {

        $scope.tempData = null;



        $scope.tempData = prms;
        $scope.Type = prms.type;
        $scope.FlightId = prms.flight;
        $scope.FDPId = prms.fdp;


        $scope.popup_add_visible = true;

    });

}]);
