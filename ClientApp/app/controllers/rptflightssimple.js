'use strict';
app.controller('rptFlightsSimpleController', ['$scope', '$location', '$routeParams', '$rootScope', 'generalService', 'authService', 'notificationService', 'flightService', '$route', '$timeout', '$window', 'localStorageService', 'statService', function ($scope, $location, $routeParams, $rootScope, generalService, authService, notificationService, flightService,$route, $timeout, $window, localStorageService, statService) {
    $scope.prms = $routeParams.prms;
    $scope.yy = $routeParams.yy;
    $scope.mm = $routeParams.mm;

    $scope.dt = null;
    $scope.df = null;
    $scope.date_from = {
        displayFormat: "yy MMM dd",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        onValueChanged: function (e) {
            $scope.bind();
        },
        bindingOptions: {
            value: 'df'
        }
    };
    $scope.date_to = {
        displayFormat: "yy MMM dd",
        adaptivityEnabled: true,
        type: "date",
        pickerType: "rollers",
        useMaskBehavior: true,
        onValueChanged: function (e) {
            $scope.bind();
        },
        bindingOptions: {
            value: 'dt'
        }
    };
    $scope.doSearch = false;
    $scope.ds_airport = ['OIII', 'OISS'];

    $scope.origin = null;
    $scope.destination = null;
    $scope.ds_from = [];
    $scope.ds_to = [];
    $scope.sb_from = {
        // openOnFieldClick: false,
        // showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'Origin',
        onSelectionChanged: function (arg) {
            $scope.bind();
            // $scope.getIrRoute();
        },

        bindingOptions: {
            value: 'origin',

            dataSource: 'ds_from',
        }
    };
    $scope.sb_to = {
        //openOnFieldClick: false,
        //showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'Destination',
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
            $scope.bind();
        },

        bindingOptions: {
            value: 'destination',

            dataSource: 'ds_to',
        }
    };

    $scope.pf = null;
    $scope.sb_pf = {
        // openOnFieldClick: false,
        // showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'PF',
        onSelectionChanged: function (arg) {
            $scope.bind();
            // $scope.getIrRoute();
        },
        dataSource:['I','C','F'],
        bindingOptions: {
            value: 'pf',
             
        }
    };

    $scope.register = null;
    $scope.ds_reg = [];
    $scope.sb_reg = {
        //openOnFieldClick: false,
        //showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'Register',
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
            $scope.bind();
        },

        bindingOptions: {
            value: 'register',

            dataSource: 'ds_reg',
        }
    };

    $scope.ip = null;
    $scope.ds_ip = [];
    $scope.sb_ip = {
        //openOnFieldClick: false,
        //showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'IP',
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
            $scope.bind();
        },

        bindingOptions: {
            value: 'ip',

            dataSource: 'ds_ip',
        }
    };


    $scope.cpt = null;
    $scope.ds_cpt = [];
    $scope.sb_cpt = {
        //openOnFieldClick: false,
        //showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'CPT',
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
            $scope.bind();
        },

        bindingOptions: {
            value: 'cpt',

            dataSource: 'ds_cpt',
        }
    };

    $scope.fo = null;
    $scope.ds_fo = [];
    $scope.sb_fo = {
        //openOnFieldClick: false,
        //showDropDownButton: false,
        showClearButton: true,
        searchEnabled: false,
        placeholder: 'FO',
        onSelectionChanged: function (arg) {

            // $scope.getIrRoute();
            $scope.bind();
        },

        bindingOptions: {
            value: 'fo',

            dataSource: 'ds_fo',
        }
    };

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
    ////////////////////////////////
    $scope.dg_height = $(window).height() - 160;
    $scope.dg_flight_columns = [
        //{
        //    cellTemplate: function (container, options) {
        //        $("<div style='text-align:center'/>")
        //            .html(options.rowIndex + 1)
        //            .appendTo(container); 
        //    }, name: 'row', caption: '#', width: 50, fixed: true, fixedPosition: 'left', allowResizing: false, cssClass: 'rowHeader'
        //},
        // { dataField: 'IsPositioning', caption: 'DH', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 60 },
        { dataField: 'STDDay', caption: 'Date', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 100, format: 'yy-MMM-dd', fixed: true, fixedPosition: 'left' },

       
        { dataField: 'FromAirportIATA', caption: 'From', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 80, fixed: true, fixedPosition: 'left' },
        { dataField: 'ToAirportIATA', caption: 'To', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 80, fixed: true, fixedPosition: 'left' },
        { dataField: 'FlightNumber', caption: 'No', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 70, fixed: false, fixedPosition: 'left' },
        { dataField: 'Register', caption: 'REG', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 80, fixed: false, fixedPosition: 'left' },
        { dataField: 'Position', caption: 'Rank', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 80, fixed: false, fixedPosition: 'left' },
        
        {
            caption: 'UTC', columns: [
                { dataField: 'BlockOff', caption: 'BlockOff', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'TakeOff', caption: 'T/O', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'Landing', caption: 'LND', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                { dataField: 'BlockOn', caption: 'BlockOn', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'STD', caption: 'STD', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                { dataField: 'STA', caption: 'STA', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },

            ]
        },
        {
            caption: 'LOCAL', columns: [
                { dataField: 'BlockOffLocal', caption: 'BlockOff', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'TakeOffLocal', caption: 'T/O', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'LandingLocal', caption: 'LND', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                { dataField: 'BlockOnLocal', caption: 'BlockOn', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },
                { dataField: 'STDLocal', caption: 'STD', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },
                { dataField: 'STALocal', caption: 'STA', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', },

            ]
        },

        {
            caption: 'COCKPIT', columns: [
               //IPScheduleName
                { dataField: 'IPScheduleName', caption: 'IP', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 140, fixed: false, fixedPosition: 'left' },
                { dataField: 'P1ScheduleName', caption: 'CPT', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 140, fixed: false, fixedPosition: 'left' },
                { dataField: 'P2ScheduleName', caption: 'FO', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 140, fixed: false, fixedPosition: 'left' },
            ]
        },
        { dataField: 'PF', caption: 'PF', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width:50, fixed: false, fixedPosition: 'left' },
       // { dataField: 'AttASR', caption: 'ASR', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 50, fixed: false, fixedPosition: 'left' },
       // { dataField: 'AttVoyageReport', caption: 'VR', allowResizing: true, alignment: 'center', dataType: 'boolean', allowEditing: false, width: 50, fixed: false, fixedPosition: 'left' },

        { dataField: 'FlightTime2', caption: 'Flight Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100, fixed: true, fixedPosition: 'right' },
        { dataField: 'BlockTime2', caption: 'Block Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100, fixed: true, fixedPosition: 'right' },
        //{ dataField: 'FlightTimeActual2', caption: 'FLT Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100, fixed: true, fixedPosition: 'right' },

        //{ dataField: 'BlockTime2', caption: 'Block Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 100, fixed: true, fixedPosition: 'right' },
        //{ dataField: 'Departure', caption: 'Off', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm', sortIndex: 0, sortOrder: 'asc' },

        //{ dataField: 'Arrival', caption: 'On', allowResizing: true, alignment: 'center', dataType: 'datetime', allowEditing: false, width: 90, format: 'HH:mm' },


        //{ dataField: 'ScheduledFlightTime2', caption: 'Sch. FLT Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 120, fixed: false, fixedPosition: 'right' },
        //{ dataField: 'SITATime2', caption: 'SITA FLT Time', allowResizing: true, alignment: 'center', dataType: 'string', allowEditing: false, width: 120, fixed: false, fixedPosition: 'right' },



    ];
    $scope.expFileName = 'aaaa';
    $scope.dg_flight_selected = null;
    $scope.dg_flight_instance = null;
    $scope.dg_flight_ds = null;
    $scope.dg_flight = {
        headerFilter: {
            visible: false
        },
        filterRow: {
            visible: false,
            showOperationChooser: true,
        },
        showRowLines: true,
        showColumnLines: true,
        sorting: { mode: 'none' },

        noDataText: '',

        allowColumnReordering: true,
        allowColumnResizing: true,
        scrolling: { mode: 'infinite' },
        paging: { pageSize: 100 },
        showBorders: true,
        selection: { mode: 'single' },

        columnAutoWidth: false,

        columns: $scope.dg_flight_columns,
        onContentReady: function (e) {
            if (!$scope.dg_flight_instance)
                $scope.dg_flight_instance = e.component;

        },
        onSelectionChanged: function (e) {
            var data = e.selectedRowsData[0];

            if (!data) {
                $scope.dg_flight_selected = null;
            }
            else
                $scope.dg_flight_selected = data;


        },
        summary: {
            totalItems: [{
                name: "BlockTimeTotal",
                showInColumn: "BlockTime2",
                displayFormat: "{0}",

                summaryType: "custom"
            }, {
                name: "FlightTimeTotal",
                showInColumn: "FlightTime2",
                displayFormat: "{0}",

                summaryType: "custom"
            },  
            ],
            calculateCustomSummary: function (options) {
                if (options.name === "FlightTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.FlightTime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }

               
                if (options.name === "BlockTimeTotal") {
                    if (options.summaryProcess === "start") {
                        options.totalValueMinutes = 0;
                        options.totalValue = '';

                    }
                    if (options.summaryProcess === "calculate") {

                        options.totalValueMinutes = options.totalValueMinutes + options.value.BlockTime;
                        options.totalValue = pad(Math.floor(options.totalValueMinutes / 60)).toString() + ':' + pad(options.totalValueMinutes % 60).toString();



                    }
                }


            }
        },
        "export": {
            enabled: false,
            //fileName: "Flights_History",
            allowExportSelectedData: false
        },

        onExporting: function (e) {
            e.component.beginUpdate();
            e.component.columnOption("row", "visible", false);
            var _from = moment(new Date($scope.df)).format('MMM-DD-YY').toUpperCase();
            var _to = moment(new Date($scope.dt)).format('MMM-DD-YY').toUpperCase();

            e.fileName = 'Flights_History_'+_from+'_'+_to;
        },
        onExported: function (e) {
            e.component.columnOption("row", "visible", true);
            e.component.endUpdate();
        },
        onRowPrepared: function (e) {
            if (e.data && e.data.IsPositioning)
                e.rowElement.css('background', '#ffccff');

        },
        bindingOptions: {
            dataSource: 'dg_flight_ds',
            height: 'dg_height',
           // "export.fileName": 'expFileName'
        }
    };
    //////////////////////////////////
    $scope.scroll_btns = {
        direction: 'horizontal',
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
        width: '100%',
        height: '100%',
        bindingOptions: {

        }

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
        if (!mm && mm !== 0)
            return "-";
        var sgn = "";
        if (mm < 0)
            sgn = "-";
        mm = Math.abs(Math.round(mm));
        return sgn + pad(Math.floor(mm / 60)).toString() + ':' + pad(mm % 60).toString();
    };
    $scope.bind = function () {

        if ($rootScope.getOnlineStatus()) {
            flightService.checkInternet(function (st) {
                if (st) {




                    if (!$scope.doSearch)
                        return;
                    $scope.dg_flight_ds = [];
                    var qry = "$filter=CrewId eq " + $scope.employeeId + " and STDDay ge " + (moment($scope.df).format('YYYY-MM-DD')) + " and STDDay le " + (moment($scope.dt).format('YYYY-MM-DD'));
                    if ($scope.origin)
                        qry += " and FromAirportIATA eq '" + $scope.origin + "'";
                    if ($scope.destination)
                        qry += " and ToAirportIATA eq '" + $scope.destination + "'";
                    if ($scope.register)
                        qry += " and Register eq '" + $scope.register + "'";
                    if ($scope.pf)
                        qry += " and PF eq '" + $scope.pf + "'";
                    if ($scope.ip)
                        qry += " and IPScheduleName eq '" + $scope.ip + "'";
                    if ($scope.cpt)
                        qry += " and P1ScheduleName eq '" + $scope.cpt + "'";
                    if ($scope.fo)
                        qry += " and P2ScheduleName eq '" + $scope.fo + "'";

                    qry += "&$orderby=STDDay desc,STD";
                    $scope.loadingVisible = true;

                    statService.getFlights(qry).then(function (response) {
                        $scope.loadingVisible = false;
                        $.each(response, function (_i, _d) {
                            if (_d.Position == 'Captain')
                                _d.Position = 'CPT';
                            _d.FlightTime2 = $scope.formatMinutes(_d.FlightTime);
                            _d.BlockTime2 = $scope.formatMinutes(_d.BlockTime);
                        });
                        $scope.dg_flight_ds = response;


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

    $scope.fillAirports = function () {


        if ($rootScope.getOnlineStatus()) {
            flightService.checkInternet(function (st) {
                if (st) {

                    var qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,FromAirportIATA))&$orderby=FromAirportIATA';
                    statService.runQuery(qry).then(function (response) {
                        $scope.ds_from = Enumerable.From(response).Select('$.FromAirportIATA').Where('$').ToArray();
                        qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,ToAirportIATA))&$orderby=ToAirportIATA';
                        statService.runQuery(qry).then(function (response) {
                            $scope.ds_to = Enumerable.From(response).Select('$.ToAirportIATA').Where('$').ToArray();

                            qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,Register))&$orderby=Register';
                            statService.runQuery(qry).then(function (response) {
                                $scope.ds_reg = Enumerable.From(response).Select('$.Register').Where('$').ToArray();

                                qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,IPScheduleName))&$orderby=IPScheduleName';
                                statService.runQuery(qry).then(function (response) {
                                    $scope.ds_ip = Enumerable.From(response).Select('$.IPScheduleName').Where('$').ToArray();

                                    qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,P1ScheduleName))&$orderby=P1ScheduleName';
                                    statService.runQuery(qry).then(function (response) {
                                        $scope.ds_cpt = Enumerable.From(response).Select('$.P1ScheduleName').Where('$').ToArray();

                                        qry = '$filter=CrewId eq ' + $scope.employeeId + '&$apply=groupby((CrewId,P2ScheduleName))&$orderby=P2ScheduleName';
                                        statService.runQuery(qry).then(function (response) {
                                            $scope.ds_fo = Enumerable.From(response).Select('$.P2ScheduleName').Where('$').ToArray();

                                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });

                                    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });


                                }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                            }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                        }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });
                    }, function (err) { $scope.loadingVisible = false; General.ShowNotify(err.message, 'error'); });



                }
                

            });
        }
        

       


    };

    if (!authService.isAuthorized()) {

        authService.redirectToLogin();
    }
    else {
        $rootScope.page_title = 'Flights';
        $scope.scroll_height = $(window).height() - 45 - 60;
        $('.rptfltsimple').fadeIn();

        //$scope.bind();
    }
    var appWindow = angular.element($window);
    appWindow.bind('resize', function () {
        //alert('w: '+$(window).width());

        $scope.$apply(function () {
            $scope.scroll_height = $(window).height() - 45 - 60;
            $scope.dg_height = $(window).height() - 160;
        });
    });
    //////////////////////////////////////////
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
    $scope.jlClick = function (fid) {

        var data = { FlightId: fid, LastSTA: new Date(2017,1,1), PICId: -1, FlightIds: [] };

        $rootScope.$broadcast('InitJLAdd', data);

    };
    $scope.$on('show_jl', function (evt, data) {
        var row = $rootScope.getSelectedRow($scope.dg_flight_instance);
        if (!row) {
            General.ShowNotify('No Flight Selected', 'error');
            return;
        }
        $scope.jlClick(row.Id);
    });
    $scope.$on('export_flts', function (evt, data) {
         
        $scope.dg_flight_instance.exportToExcel(false);
    });
    $scope.$on('PageLoaded', function (event, prms) {
        $scope.doSearch = false;
        if (!$scope.yy || $scope.yy == -1) {
            $scope.dt = new Date();
            $scope.df = new Date($scope.dt.getFullYear(), $scope.dt.getMonth(), 1);

        }
        else {
            $scope.df = new Date($scope.yy, $scope.mm - 1, 1);
            $scope.dt = new Date($scope.yy, $scope.mm - 1, daysInMonth($scope.mm, $scope.yy));
        }
        $scope.fillAirports();
        setTimeout(function () {

            $scope.doSearch = true;
            $scope.bind();
        }, 1500);


        //var _dtFTL = localStorageService.get('stat_ftl_date');

        //if (!_dtFTL)
        //    _dtFTL = (new Date());
        //else
        //    _dtFTL = CreateDate(_dtFTL);

        //$scope.dt_ftl = _dtFTL;



        //var _dtbl = localStorageService.get('stat_bl_date');

        //if (!_dtbl)
        //    _dtbl = (new Date());
        //else
        //    _dtbl = CreateDate(_dtbl);

        //$scope.dt_bl = _dtbl;

    });
    $rootScope.$broadcast('AppStatLoaded', null);


}]);

