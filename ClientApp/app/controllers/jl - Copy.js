'use strict';
app.controller('jlController', ['$scope', '$location', 'flightService', 'authService', '$routeParams', '$rootScope', '$window', function ($scope, $location, flightService, authService, $routeParams, $rootScope, $window) {
    $scope.isNew = true;
    $scope.isContentVisible = false;
    $scope.isFullScreen = true;
    $scope.isEditable = false;
    var detector = new MobileDetect(window.navigator.userAgent);

    if (detector.mobile() && !detector.tablet())
        $scope.isFullScreen = true;

    ///////////////////////
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
    /////////////////////////
    function printElem($elem) {

        var contents = $elem.html();//'<h1>Vahid</h1>' $elem.html();
        var frame1 = $('<iframe id="_iframe" />');
        frame1[0].name = "frame1";
        frame1.css({ "position": "absolute", "top": "-1000000px" });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title></title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        //frameDoc.document.write('<link href="content/css/main.css" rel="stylesheet" type="text/css" />');
        // frameDoc.document.write('<link href="../dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />');

        frameDoc.document.write('<link href="content/css/bootstrap.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="content/css/w3.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="content/css/ionicons.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="content/css/fontawsome2.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="content/css/dx.common.css" rel="stylesheet" />');

        frameDoc.document.write('<link href="content/css/main.css" rel="stylesheet" />');
        frameDoc.document.write('<link href="content/css/fontawsome2.css" rel="stylesheet" />');

        //frameDoc.document.write('<link href="content/css/core-ui.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="sfstyles/ejthemes/default-theme/ej.web.all.min.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="sfstyles/default.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="sfstyles/default-responsive.css" rel="stylesheet" />');
        //frameDoc.document.write('<link href="sfstyles/ejthemes/responsive-css/ej.responsive.css" rel="stylesheet" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function () {
            var pos1 = $('#_iframe').contents().find('#pos1');
            var pos2 = $('#_iframe').contents().find('#pos2');
            var vr = $('#_iframe').contents().find('#vr');
            var asr = $('#_iframe').contents().find('#asr');
            var jlsign = $('#_iframe').contents().find('#_jlsign');
            if ($scope.jl.pos1)
                pos1.prop('checked', true);
            if ($scope.jl.pos2)
                pos2.prop('checked', true);
            if ($scope.jl.asr)
                asr.prop('checked', true);
            if ($scope.jl.vr)
                vr.prop('checked', true);
            if ($scope.jl.sign)
                // jlsign.css('background-image', 'url("' + $scope.jl.sign + '")');
                jlsign.attr('src', $scope.jl.sign);
            setTimeout(function () {
                window.frames["frame1"].focus();
                window.frames["frame1"].print();
                frame1.remove();
            }, 2000);


        }, 500);
    };
    ////////////////////////
    $scope.isSignVisible = false;
    $scope.popup_add_visible = false;
    $scope.popup_height = '100%';
    $scope.popup_width = '100%';
    $scope.popup_add_title = 'JOURNEY LOG';
    $scope.popup_instance = null;

    $scope.popup_add = {


        showTitle: true,

        toolbarItems: [
            {
                widget: 'dxButton', location: 'before', options: {
                    type: 'default', text: 'Sign', icon: 'fas fa-signature',  onClick: function (e) {

                        if ($rootScope.getOnlineStatus()) {
                            flightService.checkInternet(function (st) {
                                if (st) {
                                    
                                    var ids = $scope.FlightIds;
                                    var data = { FlightId: ids, documentType: 'jlog' };

                                    $rootScope.$broadcast('InitSignAdd', data);
                                }
                                else {
                                    General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
                                }

                            });
                        }
                        else {
                            General.ShowNotify("You are OFFLINE.This feature can not be used in OFFLINE mode", 'error');
                        }

                    }
                }, toolbar: 'bottom'
            },
            {
                widget: 'dxButton', location: 'after', options: {
                    type: 'default', text: 'Save', icon: 'image', validationGroup: 'dradd', onClick: function (e) {

                       // printElem($('#jl'));
                        html2canvas(document.querySelector("#jl")).then(canvas => {
                            
                           // var ctx = canvas.getContext("2d");
                           // var img = document.getElementById("_logo");
                           //// img.setAttribute('crossorigin', 'anonymous'); 
                           // ctx.drawImage(img,0, 0);
                            //document.body.appendChild(canvas)
                            canvas.toBlob(function (blob) {
                                saveAs(blob, "jl.png");
                            });
                        });

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

             
            if ($scope.tempData != null)
                $scope.bind();

             



        },
        onHiding: function () {

            //$scope.clearEntity();
            $scope.isContentVisible = false;
            $rootScope.IsRootSyncEnabled = true;
            $scope.popup_add_visible = false;

            $rootScope.$broadcast('onJLHide', null);
        },
        onContentReady: function (e) {
            if (!$scope.popup_instance)
                $scope.popup_instance = e.component;

        },
        bindingOptions: {
            visible: 'popup_add_visible',
            fullScreen: 'isFullScreen',
            title: 'popup_add_title',
            height: 'popup_height',
            width: 'popup_width',
            'toolbarItems[0].visible': 'isSignVisible',

        }
    };

    $scope.$on('onJLSigned', function (event, prms) {
        $scope.bind();
       
    });

    /////////////////////////////////
    $scope.scroll_jl_height = '100%';
    $scope.scroll_jl = {
        width: '100%',
        direction:'both',
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
            height: 'scroll_jl_height'
        }

    };

    /////////////////////////
    $scope.formatTime = function (dt) {
        if (!dt) return "";
        return moment(new Date(dt)).format('HH:mm').toUpperCase();
    };
    $scope.formatMinutes = function (mm) {
        if (!mm)
            return "";
        var sgn = ' ';
        if (mm < 0) {
            mm = -1 * mm; sgn = '-';
        }

        return sgn+(pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString());
    };
    $scope.getDurationStyle = function (mm) {

        var style = {};
        
        if (mm < 0) {
            style.background = '#ff9999';
            style.fontWeight = 'bold';
        }
        
        return style;
    }
    $scope.fillRVSM = function (n, legs) {
        var obj = { leg: n };
        if (legs.length >= n) {
            var leg = legs[n - 1];
            obj.RVSM_GND_CPT = leg.RVSM_GND_CPT;
            obj.RVSM_GND_STBY = leg.RVSM_GND_STBY;
            obj.RVSM_GND_FO = leg.RVSM_GND_FO;
            obj.RVSM_FLT_CPT = leg.RVSM_FLT_CPT;
            obj.RVSM_FLT_STBY = leg.RVSM_FLT_STBY;
            obj.RVSM_FLT_FO = leg.RVSM_FLT_FO;
        }
        return obj;
    };
    $scope.getDuration = function (d1, d2) {
        //
        var diff = Math.abs(d1.getTime() - d2.getTime()) / (60*1000);
        return diff;
    }
    $scope.jlObj = null;
    $scope.jl = { asr: false, vr: false, pos1: false, pos2: false, sign: '' };
    $scope.bind = function () {
        var fid = $scope.FlightId;
        $scope.jl = { asr: false, vr: false, pos1: false, pos2: false, sign: '' };
        //jl.ReportingTime
       
        $scope.loadingVisible = true;

        flightService.getJL(fid).then(function (response) {
            $scope.loadingVisible = false;
            //_d.BlockTime2 = $scope.formatMinutes(_d.BlockTime);
            //if (_d.JLSignedBy) {
            //    //$scope.isEditable = false;
            //    _d.url_sign = signFiles + _d.PICId + ".jpg";
            //    _d.PIC2 = _d.PIC;
            //    _d.signDate = moment(new Date(_d.JLDatePICApproved)).format('YYYY-MM-DD HH:mm');
            //}

            $scope.jlObj = response;
            $scope.jl = response;
            //response.legs[i]
            //$scope.jl.ReportingTime
            $scope.jl.StartTime = (CreateDate(response.legs[0].STD)).addMinutes(-60);
            if (response.legs[0].JLSignedBy)
                $scope.jl.sign = signFiles + response.legs[0].JLSignedBy + ".jpg";
            console.log($scope.jlObj);


            $scope.jl.sectors = [];
            for (var i = 0; i < 6; i++) {
                var s = i + 1;
                var sec = { sector: s };
                if (response.legs.length >= s) {
                    var flight = response.legs[i];

                    
                    sec.from = flight.FromAirportIATA;
                    sec.to = flight.ToAirportIATA;
                    sec.no = flight.FlightNumber;
                    sec.mm = moment(new Date(flight.STD)).format('MM');
                    sec.dd = moment(new Date(flight.STD)).format('DD');
                    sec.leg = flight;
                    sec.leg.RemDuty = '';
                    if (flight.BlockOn) {
                        
                        var usedDuty = $scope.getDuration(new Date(flight.BlockOn), (new Date(response.legs[0].STD)).addMinutes(-60));
                        sec.leg.RemDuty = $scope.jl.MaxFDP - usedDuty;
                       
                    }
                }

                $scope.jl.sectors.push(sec);
            }
            var cockpit = Enumerable.From(response.crew).Where('$.JobGroupCode.startsWith("00101")').OrderBy('$.IsPositioning').ThenBy('$.GroupOrder').ThenBy('$.Name').ToArray();
            var cabin = Enumerable.From(response.crew).Where('$.JobGroupCode.startsWith("00102")').OrderBy('$.IsPositioning').ThenBy('$.GroupOrder').ThenBy('$.Name').ToArray();

            $scope.jl.cockpit = [];
            $scope.jl.cabin = [];
            var n = 0;
            var j = cabin.length;
            if (cockpit.length > j)
                j = cockpit.length;
            if (8 > j) j = 8;
            $scope.jl.crews = [];
            //bahrami-6-2
            $scope.jl.crewscockpit = [];
            $scope.jl.crewscabin = [];
            //console.log(cockpit);
            $.each(cockpit, function (_i, co) {
                if (co.Position == "Captain")
                    co.Position = "CPT";
                if (co.IsPositioning)
                    co.Position = 'DH';
                $scope.jl.crewscockpit.push(co);

            });
            $.each(cabin, function (_i, co) {
                if (co.IsPositioning)
                    co.Position = 'DH';
                if (co.Position && co.Position == 'Purser')
                    co.Position = 'SCCM';
                if (co.Position && co.Position == 'FA')
                    co.Position = 'CCM';
                if (co.JobGroup == "ISCCM")
                    co.Position = "ISCCM";
                $scope.jl.crewscabin.push(co);
            });

            if ($scope.jl.crewscockpit.length < 7)
                for (var i = $scope.jl.crewscockpit.length; i < 7; i++) {
                    $scope.jl.crewscockpit.push({ Position: ' ', Name: ' ' });

                }


            if ($scope.jl.crewscabin.length < 7)
                for (var i = $scope.jl.crewscabin.length; i < 7; i++) {
                    $scope.jl.crewscabin.push({ Position: ' ', Name: ' ' });
                }


            ///////////////////////////
            for (var i = 0; i < j; i++) {
                var ca = {};
                if (cabin.length > i)
                    ca = cabin[i];

                var co = {};
                if (cockpit.length > i)
                    co = cockpit[i];

                //////////////////////////////////
                if (co.Position == "Captain")
                    co.Position = "CPT";
                // if (co.JobGroup == "TRE" || co.JobGroup == "TRI" || co.JobGroup == "LTC")

                // co.Position = 'IP';
                if (co.IsPositioning)
                    co.Position = 'DH';
                //////////////////////////////////


                if (ca.Position && ca.Position == 'Purser')
                    ca.Position = 'SCCM';
                if (ca.Position && ca.Position == 'FA')
                    ca.Position = 'CCM';
                if (ca.JobGroup == "ISCCM")
                    ca.Position = "ISCCM";

                if (ca.IsPositioning)
                    ca.Position = 'DH';

                // bahrami-6-2
                if (!ca.Name) { ca.Name = ''; ca.Position = ''; }
                if (!co.Name) { co.Name = ''; co.Position = ''; }
                $scope.jl.crews.push({ cabin: ca, cockpit: co });


            }

            $scope.jl.rvsm1 = [];
            $scope.jl.rvsm1.push($scope.fillRVSM(1, response.legs));
            $scope.jl.rvsm1.push($scope.fillRVSM(2, response.legs));
            $scope.jl.rvsm1.push($scope.fillRVSM(3, response.legs));
            $scope.jl.rvsm2 = [];
            $scope.jl.rvsm2.push($scope.fillRVSM(4, response.legs));
            $scope.jl.rvsm2.push($scope.fillRVSM(5, response.legs));
            $scope.jl.rvsm2.push($scope.fillRVSM(6, response.legs));

            $('#pos1').prop('checked', $scope.jl.pos1);

            $('#pos2').prop('checked', $scope.jl.pos2);
            
            $('#vr').prop('checked', $scope.jl.vr);
            $('#asr').prop('checked', $scope.jl.asr);
            if ($scope.jl.sign)
                $("#_jlsign").attr('src', $scope.jl.sign);

            $scope.isContentVisible = true;
        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



    };

    ////////////////////////
    $scope.FlightId = -1;
    $scope.airline_logo = airlinelogo; //staticFiles + "logo.png";
    $scope.$on('InitJLAdd', function (event, prms) {

      

        $scope.tempData = null;

        $scope.tempData = prms;

        $scope.FlightId = (prms.FlightId);
        $scope.PICId = prms.PICId;
        $scope.LastSTA = new Date(prms.LastSTA);
        $scope.FlightIds = prms.FlightIds;
        var diff = Math.abs((new Date()).getTime() - (new Date($scope.LastSTA)).getTime()) / 3600000;
        $scope.isSignVisible = diff <= 24  && ($scope.employeeId == $scope.PICId || $scope._user == 'zahiri');

        $scope.popup_add_visible = true;

    });

}]);