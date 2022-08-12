'use strict';
app.controller('statController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', 'flightService', '$route', '$timeout', '$window', 'localStorageService', 'statService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, flightService, $route, $timeout, $window, localStorageService, statService) {
    //test
    $scope.prms = $routeParams.prms;

    $scope.scroll_height = 200;
    $scope.scroll_stat = {
        width: '100%',
        bounceEnabled: true,
        showScrollbar: 'never',
        pulledDownText: '',
        pullingDownText: '',
        useNative: false,
        refreshingText: 'Updating...',
        onPullDown: function (options) {
            $scope.bind();
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
    $scope.formatDate = function (dt) {
        return moment(new Date(dt)).format('MMM-DD-YYYY').toUpperCase();
    };
    $scope.formatMinutes = function (mm) {
        if (!mm && mm!==0)
            return "-";
        var sgn = "";
        if (mm < 0)
            sgn = "-";
        mm = Math.abs(Math.round(mm));
        return sgn+ pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString();
    };
    $scope.dt_ftl = null;
    
    $scope.date_ftl = {
        displayFormat: "yy MMM dd",
        adaptivityEnabled: true,
        type: "date",
        width:150,
        pickerType: "rollers",
        useMaskBehavior: true,
        onValueChanged: function (e) {
            var _dt = moment($scope.dt_ftl).format('YYYY-MM-DDTHH:mm:ss');
            localStorageService.set('stat_ftl_date', _dt);
            
             $scope.bindFTL();
        },
        bindingOptions: {
            value: 'dt_ftl'
        }
    };

    $scope.bl_year = Number(moment(new Date()).format('YYYY'));
    $scope.sb_year = {
        // openOnFieldClick: false,
        // showDropDownButton: false,
        showClearButton: false,
        searchEnabled: false,
         
        onSelectionChanged: function (arg) {
             
            localStorageService.set('stat_bl_year', $scope.bl_year);
            $scope.bindBL();
        },
        dataSource:[2019,2020,2021,2022],
        bindingOptions: {
            value: 'bl_year',

           
        }
    };

    $scope.dt_bl =null;

    $scope.date_bl = {
        displayFormat: "yyyy",
        adaptivityEnabled: true,
        type: "date",
        width: 150,
        //pickerType: "rollers",

        useMaskBehavior: true,
        calendarOptions: {
            zoomLevel: 'decade',
            minZoomLevel: 'decade',
            maxZoomLevel:'decade',
        },
        onValueChanged: function (e) {
            var _dt = moment($scope.dt_bl).format('YYYY-MM-DDTHH:mm:ss');
            localStorageService.set('stat_bl_date', _dt);
            $scope.bindBL();
        },
        bindingOptions: {
            value: 'dt_bl'
        }
    };
    $scope.data_ftl = null;
    $scope.bindFTL = function () {
        if ($rootScope.getOnlineStatus()) {
            flightService.checkInternet(function (st) {
                if (st) {
                    //var _dataFTL = localStorageService.get('stat_ftl');
                    $scope.data_ftl = null;
                    $scope.Duties7 = [];
                    $scope.DutyColors7 = [];
                    $scope.Duties14 = [];
                    $scope.DutyColors14 = [];
                    $scope.Duties28 = [];
                    $scope.DutyColors28 = [];

                    $scope.Flights28 = [];
                    $scope.FlightColors28 = [];
                    $scope.FlightsYear = [];
                    $scope.FlightColorsYear = [];
                    $scope.FlightsCYear = [];
                    $scope.FlightColorsCYear = [];

                    $scope.loadingVisible = true;

                    statService.getFTL($rootScope.employeeId, moment($scope.dt_ftl).format('YYYY-MM-DD')).then(function (response) {
                        $scope.loadingVisible = false;
                        if (!response.Duty7)
                            response.Duty7 = 0;
                        if (!response.Duty14)
                            response.Duty14 = 0;
                        if (!response.Duty28)
                            response.Duty28 = 0;

                        if (!response.Flight28)
                            response.Flight28 = 0;
                        if (!response.FlightYear)
                            response.FlightYear = 0;
                        if (!response.FlightCYear)
                            response.FlightCYear = 0;

                        $scope.data_ftl = response;

                        /*response.Duty7 = 50*60;
                        response.Duty14 = 110*60;
                        response.Duty28 = 195*60;
                        */

                        /*response.Flight28 = 100 * 60;
                        response.FlightYear = 1000 * 60;
                        response.FlightCYear = 1000 * 60;*/

                        var d7 = response.Duty7 / 60.0;
                        $scope.d7 = $scope.formatMinutes(response.Duty7);
                        var d14 = response.Duty14 / 60.0;
                        $scope.d14 = $scope.formatMinutes(response.Duty14);
                        var d28 = response.Duty28 / 60.0;
                        $scope.d28 = $scope.formatMinutes(response.Duty28);

                        $scope.Duties28.push(d28);
                        var d28color = '#00cc99';
                        if (response.Duty28 >= 0.80 * 190 * 60)
                            d28color = "#e68a00";
                        if (response.Duty28 >= 190 * 60)
                            d28color = "#ff1a1a";
                        $scope.DutyColors28.push(d28color);
                        $scope.d28style.color = d28color;

                        $scope.Duties14.push(d14);
                        var d14color = '#00cc99';
                        if (response.Duty14 >= 0.80 * 110 * 60)
                            d14color = "#ff8000";
                        if (response.Duty14 >= 110 * 60)
                            d14color = "#ff1a1a";
                        $scope.DutyColors14.push(d14color);
                        $scope.d14style.color = d14color;

                        $scope.Duties7.push(d7);
                        var d7color = '#00cc99';

                        if (response.Duty7 >= 0.80 * 60 * 60) { d7color = "#ffaa00"; }
                        if (response.Duty7 >= 60 * 60)
                            d7color = "#ff1a1a";
                        $scope.DutyColors7.push(d7color);
                        $scope.d7style.color = d7color;

                        var f28 = response.Flight28 / 60.0;
                        $scope.Flights28.push(f28);
                        var _fcol = '#00cc99';
                        if (response.Flight28 >= 0.80 * 100 * 60)
                            _fcol = "#ff8000";
                        if (response.Flight28 >= 100 * 60)
                            _fcol = "#ff1a1a";
                        $scope.FlightColors28.push(_fcol);

                        $scope.FlightsYear.push(response.FlightYear / 60.0);
                        _fcol = '#00cc99';
                        if (response.FlightYear >= 0.80 * 1000 * 60)
                            _fcol = "#ff8000";
                        if (response.FlightYear >= 1000 * 60)
                            _fcol = "#ff1a1a";
                        $scope.FlightColorsYear.push(_fcol);

                        $scope.FlightsCYear.push(response.FlightCYear / 60.0);
                        _fcol = '#00cc99';
                        if (response.FlightCYear >= 0.80 * 900 * 60)
                            _fcol = "#ff8000";
                        if (response.FlightCYear >= 900 * 60)
                            _fcol = "#ff1a1a";
                        $scope.FlightColorsCYear.push(_fcol);




                    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                   

                }
                else {
                    General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
                }

            });
        }
        else
            General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
       
        

    };



    $scope.chart_bl = {
        title: {
            text: 'FLIGHT & BLOCK TIME',
            font: { color: '#eeee', size: 14}
        },
        legend: {
             
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
            itemTextPosition: 'right',
        },
        commonPaneSettings: {
            backgroundColor: '#363640',
            border: { top: true, bottom: true, left: true, right: true, color: '#eeeeee', visible: true }
        },
        commonAxisSettings: {
            label: {
                color:'white',
                font: {
                    color:'white',
                    weight: 800,
                    // size: 12,
                    // family: 'Tahoma'
                }
            },
            maxValueMargin: 0.1,

        },
        "export": {
            enabled: false
        },
        onInitialized: function (e) {
            if (!$scope.chart_bl_instance)
                $scope.chart_bl_instance = e.component;
        },
        palette: "Green Mist",

        commonSeriesSettings: {
            type: "bar",

            argumentField: "MonthName",
            ignoreEmptyPoints: true,
            label: {
                //backgroundColor: 'gray',
                position: 'outside',
                color: 'white',
                backgroundColor: 'transparent',
                font: {
                    color: 'white',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    if (!this.value || this.value == 0)
                        return "";
                    return $scope.formatMinutes(this.value);
                },
                visible: true,

            },
            // barWidth: 30,
        },
        series: [
            { valueField: 'BlockTime', name: 'Block', },
            { valueField: 'FlightTime', name: 'Flight', },
        ],


        tooltip: {
            enabled: false,
            zIndex: 10000,
            // location: "edge",
            customizeTooltip: function (arg) {
                // alert(arg.seriesName + " " + $scope.formatMinutes(arg.value));
                return {
                    text: arg.seriesName + ": " + $scope.formatMinutes(arg.value)
                };
            }
        },
        valueAxis: [{
            label: {
                customizeText: function () {
                    return $scope.formatMinutes(this.value);
                }
            },
        }],
        size: {
            height: 350,
        },
        bindingOptions: {
            "dataSource": "data_bl",



        }
    };

    $scope.chart_cnt = {
        title: {
            text: 'TOTAL NUMBER OF FLIGHTS',
            font: { color: '#eeee',size:14 }
        },
        legend: {
            visible:true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
            itemTextPosition: 'right',
        },
        commonPaneSettings: {
            backgroundColor: '#363640',
            border: { top: true, bottom: true, left: true, right: true, color: '#eeeeee', visible: true }
        },
        commonAxisSettings: {
            label: {
                color: 'white',
                font: {
                    color: 'white',
                    weight: 800,
                    // size: 12,
                    // family: 'Tahoma'
                }
            },
            maxValueMargin: 0.1,

        },
        "export": {
            enabled: false
        },
        onInitialized: function (e) {
            if (!$scope.chart_bl_instance)
                $scope.chart_bl_instance = e.component;
        },
        palette: "Soft Blue",

        commonSeriesSettings: {
            type: "bar",

            argumentField: "MonthName",
            ignoreEmptyPoints: true,
            label: {
                //backgroundColor: 'gray',
                position: 'outside',
                color: 'white',
                backgroundColor: 'transparent',
                font: {
                    color: 'white',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    if (!this.value || this.value == 0)
                        return "";
                    return  (this.value);
                },
                visible: true,

            },
            // barWidth: 30,
        },
        series: [
            { valueField: 'Flights', name: 'Sectors', },
            
        ],


        tooltip: {
            enabled: false,
            zIndex: 10000,
            // location: "edge",
            customizeTooltip: function (arg) {
                // alert(arg.seriesName + " " + $scope.formatMinutes(arg.value));
                return {
                    text: arg.seriesName + ": " + $scope.formatMinutes(arg.value)
                };
            }
        },
        valueAxis: [{
            label: {
                customizeText: function () {
                    return  (this.value);
                }
            },
        }],
        size: {
            height: 350,
        },
        bindingOptions: {
            "dataSource": "data_bl",



        }
    };


    $scope.chart_fltratio = {
        title: {
            text: 'FLIGHT TIME / TOTAL NUMBER OF FLIGHTS (mm)',
            font: { color: '#eeee', size: 14 }
        },
        legend: {
            visible: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
            itemTextPosition: 'right',
        },
        commonPaneSettings: {
            backgroundColor: '#363640',
            border: { top: true, bottom: true, left: true, right: true, color: '#eeeeee', visible: true }
        },
        commonAxisSettings: {
            label: {
                color: 'white',
                font: {
                    color: 'white',
                    weight: 800,
                    // size: 12,
                    // family: 'Tahoma'
                }
            },
            maxValueMargin: 0.1,

        },
        "export": {
            enabled: false
        },
        onInitialized: function (e) {
            if (!$scope.chart_bl_instance)
                $scope.chart_bl_instance = e.component;
        },
        palette: "Harmony Light",

        commonSeriesSettings: {
            type: "spline",
            width:4,
            argumentField: "MonthName",
            ignoreEmptyPoints: true,
            label: {
                //backgroundColor: 'gray',
                position: 'outside',
                color: 'white',
                backgroundColor: 'transparent',
                font: {
                    color: 'white',
                    size: 11,
                    weight: 500,
                },
                customizeText: function () {
                    if (!this.value || this.value == 0)
                        return "";
                    return $scope.formatMinutes(this.value); 
                },
                visible: true,

            },
            // barWidth: 30,
        },
        series: [
            { valueField: 'FLTRatio', name: 'Ratio', },

        ],


        tooltip: {
            enabled: false,
            zIndex: 10000,
            // location: "edge",
            customizeTooltip: function (arg) {
                // alert(arg.seriesName + " " + $scope.formatMinutes(arg.value));
                return {
                    text: arg.seriesName + ": " + $scope.formatMinutes(arg.value)
                };
            }
        },
        valueAxis: [{
            valueType: "numeric",
            label: {
                customizeText: function () {
                    return $scope.formatMinutes(this.value);
                }
            },
        }],
        size: {
            height: 350,
        },
        bindingOptions: {
            "dataSource": "data_bl",



        }
    };


    $scope.data_bl = null;
    $scope.bindBL = function () {
        if ($rootScope.getOnlineStatus()) {
            flightService.checkInternet(function (st) {
                if (st) {

                    $scope.loadingVisible = true;

                    statService.getFlightTimeYear($rootScope.employeeId, /*moment($scope.dt_bl).format('YYYY')*/$scope.bl_year).then(function (response) {
                        $scope.loadingVisible = false;
                        $.each(response, function (_i, _d) {
                            if (!_d.FlightTime)
                                _d.FLTRatio = 0;
                            else
                                _d.FLTRatio = ((_d.FlightTime * 1.0) / _d.Flights).toFixed();
                        });
                        $scope.data_bl = response;

                    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                }
                else {
                    General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
                }

            });
        }
        else
            General.ShowNotify("You are OFFLINE.Please check your internet connection", 'error');
        
    };

    $scope.bind = function () {



        //generalService.getCertificates($rootScope.employeeId).then(function (response) {

        //    $scope.loadingVisible = false;
        //    if (response.Data && response.Data.length > 0) {
        //        var jg = response.Data[0].JobGroup;
        //        if (jg == 'TRE')
        //            $scope.Cockpit.push(35);
        //        if (jg == 'TRI')
        //            $scope.Cockpit.push(34);
        //    }
        //    var _now = new Date();
        //    var _start = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), 0, 0, 0, 0);
        //    $.each(response.Data, function (_i, _d) {
        //        var _expDate = new Date(_d.EXPYear, _d.EXPMonth - 1, _d.EXPDay + 1, 0, 0, 0, 0);
        //        if (_d.Status != 'UNKNOWN')
        //            _d.Remain = moment(_expDate).diff(moment(_start), 'days');
        //        else
        //            _d.Remain = 'UNKNOWN';
        //    });
        //    var data = Enumerable.From(response.Data).Where(function (x) { return $scope.Cockpit.indexOf(x.TypeId) != -1; }).OrderBy('$.StatusId').ThenBy('$.Remain').ToArray();


        //    $scope.ds = data;
        //    var scroll_main = $("#scrollview").dxScrollView().dxScrollView("instance");
        //    scroll_main.scrollBy(1);
        //    console.log($scope.ds);

        //}, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
    }; 


    //////////////////////
    ///////////////////////


    $scope.d7style = {
        display: 'inline-block',
    };
    $scope.yfstyle = {
        display: 'inline-block',
    };
    $scope.fstyle = {
        display: 'inline-block',
    };
    $scope.cyfstyle = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    ////////////////////////
    $scope.d14style = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    $scope.d28style = {
        display: 'inline-block',
        'margin-left': '5px',
    };
    $scope.d7 = null;
    $scope.d14 = null;
    $scope.d28 = null;

    $scope.f = null;
    $scope.yf = null;
    $scope.cyf = null;
    $scope.Duties7 = [];
    $scope.DutyColors7 = [];
    $scope.Duties14 = [];
    $scope.DutyColors14 = [];
    $scope.Duties28 = [];
    $scope.DutyColors28 = [];
    $scope.getDutyText = function (n) {
        if (!$scope.data_ftl)
            return "";
        var m = 60;
        if (n == 14)
            m = 110;
        if (n == 28)
            m = 190;
        var dvalue = $scope.data_ftl['Duty' + n] / 60.0;
        var dp = Number((dvalue * 100.0) / m).toFixed();
        var txt = $scope.formatMinutes(dvalue * 60) + ' (' + dp + '%)';
        return txt;
    };
    $scope.getFlightText = function (n) {
        if (!$scope.data_ftl)
            return "";
        var str = "Flight28";
        var m = 100;
        if (n == 12) { m = 1000; str = "FlightYear";}
        if (n == 1) {
            m = 900; str = "FlightCYear";
        }
        var dvalue = $scope.data_ftl[str] / 60.0;
        var dp = Number((dvalue * 100.0) / m).toFixed();
        var txt = $scope.formatMinutes(dvalue * 60) + ' (' + dp + '%)';
        return txt;
    };
    $scope.getFlightText2 = function (n) {
        if (!$scope.data_ftl)
            return "";
        var str = "Flight28";
         
        if (n == 12) {   str = "FlightYear"; }
        if (n == 1) {
             str = "FlightCYear";
        }
        var dvalue = $scope.data_ftl[str] / 60.0;
        
        var txt = $scope.formatMinutes(dvalue * 60) ;
        return txt;
    };
    $scope.getFlightRemainingText = function (n) {
        if (!$scope.data_ftl)
            return "";
        var str = "Flight28Remain";

        if (n == 12) { str = "FlightYearRemain"; }
        if (n == 1) {
            str = "FlightCYearRemain";
        }
        var dvalue = ( $scope.data_ftl[str]) / 60.0;

        var txt = $scope.formatMinutes(dvalue * 60);
        return txt;
    };

    $scope.getDutyText2 = function (n) {
        if (!$scope.data_ftl)
            return "";
        
        var dvalue = $scope.data_ftl['Duty' + n] / 60.0;
        
        var txt = $scope.formatMinutes(dvalue * 60)  ;
        return txt;
    };
    $scope.getDutyCellStyle = function (n) {
        if (!$scope.data_ftl)
            return {};
        var dvalue = $scope.data_ftl['Duty' + n];
        var m = 60;
        if (n == 14)
            m = 110;
        if (n == 28)
            m = 190;
        if (dvalue >=  m * 60  )
            //d28color = "#e68a00";
            return {
                color: 'white',
                fontWeight: 'bold',
                background: '#ff1a1a'
            };
        if (dvalue >= 0.80 * m * 60)
            //d28color = "#e68a00";
            return {
                color: 'black',
                fontWeight: 'bold',
                background:'#e68a00'
            };

    };
    $scope.getFlightCellStyle = function (n) {
        if (!$scope.data_ftl)
            return {};
        var str = "Flight28";

        if (n == 12) { str = "FlightYear"; }
        if (n == 1) {
            str = "FlightCYear";
        }
        var dvalue = $scope.data_ftl[str];
        var m = 100;
        if (n == 12)
            m = 1000;
        if (n == 1)
            m = 900;
        if (dvalue >= m * 60)
            //d28color = "#e68a00";
            return {
                color: 'white',
                fontWeight: 'bold',
                background: '#ff1a1a'
            };
        if (dvalue >= 0.80 * m * 60)
            //d28color = "#e68a00";
            return {
                color: 'black',
                fontWeight: 'bold',
                background: '#e68a00'
            };

    };
    $scope.getDutyRemainingText = function (n) {
        if (!$scope.data_ftl)
            return "";
        var m = 60*60;
        if (n == 14)
            m = 110*60;
        if (n == 28)
            m = 190*60;
        var dvalue =(m- $scope.data_ftl['Duty' + n]) / 60.0;
         
        var txt = $scope.formatMinutes(dvalue * 60) ;
        return txt;
    };

    $scope.duty7Gauge = {
        barSpacing: 4,
        relativeInnerRadius:0.7,
        startValue: 0,
        endValue: 60,

        label: {
            visible:false,
            indent: 20,
            connectorWidth:0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color:'#ffffff',
            },
            customizeText: function (arg) {
                 
                var dvalue = $scope.Duties7[arg.index];
                var dp = Number((dvalue * 100.0) / 60).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "7 Days",
            //horizontalAlignment: 'left',
            margin:{top:10,bottom:10,left:10,right:10},
            font: {
                size: 15,
                weight: 900,
                color:'#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'Duties7',
            palette: 'DutyColors7',
        }
    };
    $scope.duty14Gauge = {
        barSpacing: 4,
        relativeInnerRadius: 0.7,
        startValue: 0,
        endValue: 110,

        label: {
            visible: false,
            indent: 20,
            connectorWidth: 0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color: '#ffffff',
            },
            customizeText: function (arg) {

                var dvalue = $scope.Duties14[arg.index];
                var dp = Number((dvalue * 100.0) / 110).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "14 Days",
            //horizontalAlignment: 'left',
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            font: {
                size: 15,
                weight: 900,
                color: '#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'Duties14',
            palette: 'DutyColors14',
        }
    };
    $scope.duty28Gauge = {
        barSpacing: 4,
        relativeInnerRadius: 0.7,
        startValue: 0,
        endValue: 190,

        label: {
            visible: false,
            indent: 20,
            connectorWidth: 0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color: '#ffffff',
            },
            customizeText: function (arg) {

                var dvalue = $scope.Duties28[arg.index];
                var dp = Number((dvalue * 100.0) / 190).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "28 Days",
            //horizontalAlignment: 'left',
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            font: {
                size: 15,
                weight: 900,
                color: '#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'Duties28',
            palette: 'DutyColors28',
        }
    };



    $scope.flight28Gauge = {
        barSpacing: 4,
        relativeInnerRadius: 0.7,
        startValue: 0,
        endValue: 100,

        label: {
            visible: false,
            indent: 20,
            connectorWidth: 0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color: '#ffffff',
            },
            customizeText: function (arg) {

                var dvalue = $scope.Flights28[arg.index];
                var dp = Number((dvalue * 100.0) / 100).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "28 Days",
            //horizontalAlignment: 'left',
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            font: {
                size: 15,
                weight: 900,
                color: '#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'Flights28',
            palette: 'FlightColors28',
        }
    };
    $scope.flightYearGauge  = {
        barSpacing: 4,
        relativeInnerRadius: 0.7,
        startValue: 0,
        endValue: 1000,

        label: {
            visible: false,
            indent: 20,
            connectorWidth: 0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color: '#ffffff',
            },
            customizeText: function (arg) {

                var dvalue = $scope.FlightsYear[arg.index];
                var dp = Number((dvalue * 100.0) / 1000).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "12 Consecutive Months",
            //horizontalAlignment: 'left',
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            font: {
                size: 15,
                weight: 900,
                color: '#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'FlightsYear',
            palette: 'FlightColorsYear',
        }
    };
    $scope.flightCYearGauge = {
        barSpacing: 4,
        relativeInnerRadius: 0.7,
        startValue: 0,
        endValue: 900,

        label: {
            visible: false,
            indent: 20,
            connectorWidth: 0,
            format: {
                type: "fixedPoint",
                precision: 1
            },
            font: {
                size: 14,
                color: '#ffffff',
            },
            customizeText: function (arg) {

                var dvalue = $scope.FlightsCYear[arg.index];
                var dp = Number((dvalue * 100.0) / 900).toFixed();
                return $scope.formatMinutes(dvalue * 60);//+ ' ('+dp+'%)'; //arg.valueText + " %";
            }
        },

        title: {
            text: "Calendar Year",
            //horizontalAlignment: 'left',
            margin: { top: 10, bottom: 10, left: 10, right: 10 },
            font: {
                size: 15,
                weight: 900,
                color: '#ffffff',
            }
        },
        margin: {
            top: 0,
            bottom: 0,
            left: 20,
            right: 20
        },
        bindingOptions: {
            values: 'FlightsCYear',
            palette: 'FlightColorsCYear',
        }
    };


    $scope.barGaugeOptions = {
        size: {height:500,width:500},
        startValue: 0,
        endValue: 200,
        values: [121.4, 135.4, 115.9, 141.1, 127.5],
        label: { visible: false },
        tooltip: {
            enabled: true,
            customizeTooltip(arg) {
                return {
                    text: getText(arg, arg.valueText),
                };
            },
        },
        export: {
            enabled: true,
        },
        title: {
            text: 'Average Speed by Racer',
            font: {
                size: 28,
            },
        },
        legend: {
            visible: true,
            verticalAlignment: 'bottom',
            horizontalAlignment: 'center',
            customizeText(arg) {
                return getText(arg.item, arg.text);
            },
        },
    };

    function getText(item, text) {
        return `Racer ${item.index + 1} - ${text} km/h`;
    }
    $scope.d7style = {
        display: 'inline-block',
    };


    $scope.goFlights = function (y, m) {
        $window.open('#!/rpt/flights/'+y+'/'+m, '_self');
    };


    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Statistics';
        $scope.scroll_height = $(window).height() - 45 - 60;
        $('.stat').fadeIn();

        $scope.bind();
    }
    var appWindow = angular.element($window);
    appWindow.bind('resize', function () {
        //alert('w: '+$(window).width());

        $scope.$apply(function () {
            $scope.scroll_height = $(window).height() - 45 - 60;
        });
    });
    //////////////////////////////////////////
    $scope.$on('PageLoaded', function (event, prms) {
        //footerbook
        //  if (prms == 'footer')
        //      $('.footer' + $scope.active).addClass('active');
        //$scope.dt_ftl = (new Date());
        var _dtFTL = localStorageService.get('stat_ftl_date');
        
        if (!_dtFTL)
            _dtFTL = (new Date());
        else
            _dtFTL = CreateDate(_dtFTL);
        
        $scope.dt_ftl = _dtFTL;



        var _dtbl = localStorageService.get('stat_bl_date');

        if (!_dtbl)
            _dtbl = (new Date());
        else
            _dtbl = CreateDate(_dtbl);

        $scope.dt_bl = _dtbl;


        var _blyear = localStorageService.get('stat_bl_year');

        if (!_blyear)
            _blyear = Number(moment(new Date()).format('YYYY'));
        else
            _blyear = Number(_blyear);

        $scope.bl_year = _blyear;

    });
    $rootScope.$broadcast('AppStatLoaded', null);


}]);
