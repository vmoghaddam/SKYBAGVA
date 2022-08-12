﻿'use strict';
app.factory('authService', ['$http', '$q', 'localStorageService', 'ngAuthSettings', '$location', '$rootScope', function ($http, $q, localStorageService, ngAuthSettings, $location, $rootScope) {

    var serviceBase = ngAuthSettings.apiServiceBaseUri;
    var authServiceFactory = {};

    var _authentication = {
        isAuth: false,
        userName: "",
        useRefreshTokens: false
    };

    var _externalAuthData = {
        provider: "",
        userName: "",
        externalAccessToken: ""
    };

    var _saveRegistration = function (registration) {

        _logOut();

        return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
            return response;
        });

    };
    var _loginLocal = function (loginData ) {
        var deferred = $q.defer();
        db.auth.getUser(loginData.userName, function (user) {
            if (!user) {
                _logOut();
                deferred.reject({ error_description: 'User not found (E100)' });
            }
            else if (user.Password != loginData.password) {
                _logOut();
                deferred.reject({ error_description: 'User not found (E200)' });
            }
            else {
                var auth_data = JSON.parse(user.AuthData);
                var ud = JSON.parse(user.UserData);
                localStorageService.set('authorizationDataApp', auth_data);
                localStorageService.set('userData', ud);
                _authentication.isAuth = true;
                _authentication.userName = loginData.userName;
                _authentication.useRefreshTokens = loginData.useRefreshTokens;
                $rootScope.userName = loginData.userName;
                $rootScope.userTitle = ud.Name;
                $rootScope.userId = ud.UserId;
                $rootScope.employeeId = ud.Data.Id;
                GlobalUserId = $rootScope.employeeId;
                $rootScope.jobGroup = ud.JobGroup;
                $rootScope.jobGroupCode = ud.JobGroupCode;
                $rootScope.position = ud.Position;
                $rootScope.positionCode = ud.PositionCode;
                $rootScope.hasACTypes = ud.Data.Types;
                $rootScope.customerId = ud.Data.CustomerId;
                $rootScope.isCrew = ud.IsCrew;
                $rootScope.isCabin = ud.IsCabin;
                $rootScope.isCockpit = ud.IsCockpit;
                $rootScope.userData = ud.Data;
                Config.CustomerId = ud.Data.CustomerId;
               // console.log('auth DATA', auth_data);
               // console.log('user data', ud);
                deferred.resolve(user);
            }

           
        });
        return deferred.promise;
    };
    var _login = function (loginData) {

        //var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password + "&scope=" + (loginData.scope);
        var data = "username=" + loginData.userName + "&password=" + loginData.password ;

        if (loginData.useRefreshTokens) {
            data = data + "&client_id=" + ngAuthSettings.clientId;
        }
        data = {
            username: loginData.userName,
            password: loginData.password
        };
        var deferred = $q.defer();

        //var loginUrl = serviceBase + 'token';
        var loginUrl = serviceBase2 + 'auth/login';
        
        $http.post(loginUrl, data/*, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }*/).then(function (response) {
            //console.log('token');
            //console.log(response);
           
            var responseData = response.data;
            var auth_data = { token: responseData.access_token, userName: loginData.userName, refreshToken: "", expires: responseData.ExpireDate, useRefreshTokens: false };
            
            if (loginData.useRefreshTokens) {
                localStorageService.set('authorizationDataApp', {
                    token: responseData.access_token, userName: loginData.userName, refreshToken: responseData.refresh_token, expires: responseData['.expires'], useRefreshTokens: true
                });
            }
            else {
                localStorageService.set('authorizationDataApp', auth_data);
            }
            var ud = {
                
                Name: responseData.Data.Name
                , UserId: responseData.UserId
                , UserName: responseData.UserName
                , Email: responseData.Email
                , EmployeeId: responseData.Data.Id
                , JobGroup: responseData.JobGroup
                , JobGroupCode: responseData.JobGroupCode
                , Position: responseData.Position
                , PositionCode: responseData.PositionCode
                , ACTypes: responseData.Data.Types
                , CustomerId: responseData.Data.CustomerId
                , IsCabin: responseData.IsCabin
                , IsCockpit: responseData.IsCockpit
                , IsCrew: responseData.IsCrew
                , Data: responseData.Data
            
            };
           
            localStorageService.set('userData',ud );

            _authentication.isAuth = true;
            _authentication.userName = loginData.userName;
            _authentication.useRefreshTokens = loginData.useRefreshTokens;
            $rootScope.userName = loginData.userName;
            $rootScope.userTitle = responseData.Name;
            $rootScope.userId = responseData.UserId;
            $rootScope.employeeId = responseData.Data.Id;
            GlobalUserId = $rootScope.employeeId;
            $rootScope.jobGroup = responseData.JobGroup;
            $rootScope.jobGroupCode = responseData.JobGroupCode;
            $rootScope.position = responseData.Position;
            $rootScope.positionCode = responseData.PositionCode;
            $rootScope.hasACTypes = responseData.Data.Types;
            $rootScope.customerId = responseData.Data.CustomerId;
            $rootScope.isCrew = responseData.IsCrew;
            $rootScope.isCabin = responseData.IsCabin;
            $rootScope.isCockpit = responseData.IsCockpit;
            $rootScope.userData = responseData.Data;
            Config.CustomerId = responseData.Data.CustomerId;
            var dto = {
                userName: $rootScope.userName,
                userTitle: $rootScope.userTitle,
                userId: $rootScope.userId,
                employeeId: $rootScope.employeeId,
                jobGroup: $rootScope.jobGroup,
                roles: '',
                claims: '',
                type: 'loginData',

            };
            // exportLoginData(dto);
            db.auth.update(loginData.userName, loginData.password, JSON.stringify(ud), JSON.stringify(auth_data), function () { });
           //DISABLE FOR PWA
           // invokeCSCode(JSON.stringify(dto));
            deferred.resolve(response);

        }, function (err, status) {

            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _logOut = function () {

        localStorageService.remove('authorizationDataApp');
        localStorageService.remove('userData');
        localStorageService.remove('fdps');
        localStorageService.remove('actypes');
        localStorageService.remove('ftl');


        _authentication.isAuth = false;
        _authentication.userName = "";
        _authentication.useRefreshTokens = false;
        exportLogoutData();
        $location.path('/login');
    };

    var _fillAuthData = function () {

        var authData = localStorageService.get('authorizationDataApp');
        if (authData) {
            _authentication.isAuth = true;
            _authentication.userName = authData.userName;

            _authentication.useRefreshTokens = authData.useRefreshTokens;

            $rootScope.userName = authData.userName;
            var userData = localStorageService.get('userData');
            if (userData) {
                $rootScope.userTitle = userData.Name;
                $rootScope.userId = userData.UserId;
                $rootScope.employeeId = userData.EmployeeId;
                GlobalUserId = $rootScope.employeeId;
                $rootScope.jobGroup = userData.JobGroup;
                $rootScope.jobGroupCode = userData.JobGroupCode;
                $rootScope.position = userData.Position;
                $rootScope.positionCode = userData.PositionCode;
                $rootScope.hasACTypes = userData.ACTypes;
                $rootScope.customerId = userData.CustomerId;
                $rootScope.isCrew = userData.IsCrew;
                $rootScope.isCabin = userData.IsCabin;
                $rootScope.isCockpit = userData.IsCockpit;
                $rootScope.userData = userData.Data;
                Config.CustomerId = userData.CustomerId;
            }
        }



    };


    var _refreshToken = function () {
        var deferred = $q.defer();

        var authData = localStorageService.get('authorizationDataApp');

        if (authData) {

            if (authData.useRefreshTokens) {

                var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + ngAuthSettings.clientId;

                localStorageService.remove('authorizationDataApp');

                //$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

                //    localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true });

                //    deferred.resolve(response);

                //}).error(function (err, status) {
                //    _logOut();
                //    deferred.reject(err);
                //    });


                $http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(function (response) {
                    var responseData = response.data;
                    console.log('refresh');
                    console.log(responseData);
                    localStorageService.set('authorizationDataApp', { token: responseData.access_token, userName: responseData.userName, refreshToken: responseData.refresh_token, useRefreshTokens: true });

                    deferred.resolve(response);

                }, function (err, status) {
                    _logOut();
                    deferred.reject(err);
                });


            }
        }

        return deferred.promise;
    };

    var _obtainAccessToken = function (externalData) {

        var deferred = $q.defer();

        $http.get(serviceBase + 'api/account/ObtainLocalAccessToken', { params: { provider: externalData.provider, externalAccessToken: externalData.externalAccessToken } }).success(function (response) {

            localStorageService.set('authorizationDataApp', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _registerExternal = function (registerExternalData) {

        var deferred = $q.defer();

        $http.post(serviceBase + 'api/account/registerexternal', registerExternalData).success(function (response) {

            localStorageService.set('authorizationDataApp', { token: response.access_token, userName: response.userName, refreshToken: "", useRefreshTokens: false });

            _authentication.isAuth = true;
            _authentication.userName = response.userName;
            _authentication.useRefreshTokens = false;

            deferred.resolve(response);

        }).error(function (err, status) {
            _logOut();
            deferred.reject(err);
        });

        return deferred.promise;

    };

    var _isAuthorized = function () {
        var authData = localStorageService.get('authorizationDataApp');
        if (!authData)
            return false;
        var expires = new Date(authData.expires);
        if (new Date() > expires)
            return false;

        return true;

    };
    var _redirectToLogin = function () {
        localStorageService.remove('authorizationDataApp');
        $location.path('/login');
    }
    var _checkAuth = function () {
        var authData = localStorageService.get('authorizationDataApp');


        if (!authData) {
            localStorageService.remove('authorizationDataApp');
            $location.path('/login');
            return;
        }
        var expires = new Date(authData.expires);
        // alert(expires);
        // alert(new Date());
        if (new Date() > expires) {
            alert('expire');
            localStorageService.remove('authorizationDataApp');
            $location.path('/login');
            return;
        }

    };

    var _setModuleProperties = function (moduleId) {
        var module = { id: Number(moduleId) };
        switch (Number(moduleId)) {
            case 1:
                module.title = 'Profile';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.steel-light';
                module.color = '#2f7899';
                module.class = 'theme-steel';
                break;
            case 2:
                module.title = 'Library';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.purple-light';
                module.color = '#9C27B0';
                module.class = 'theme-purple';
                break;
            case 3:
                module.title = 'Flight Management';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.blue-light';
                module.color = '#03A9F4';
                module.class = 'theme-blue';
                break;
            case 4:
                module.title = 'Basic Information';
                module.remark = 'Lorem ipsum dolor sit amet';
                module.theme = 'material.gray-light';
                module.color = '#97a1a6';
                module.class = 'theme-gray';
                break;
            default:
                break;
        }
        return module;

    }
    var _fillModuleData = function () {

        var data = localStorageService.get('module');

        if (data) {
            $rootScope.module = data.title;
            $rootScope.moduleId = data.id;
            $rootScope.moduleRemark = data.remark;
            $rootScope.theme = data.theme;
            $rootScope.color = data.color;
            $rootScope.class = data.class;

            //  $rootScope.headerClasses.push(data.class);
        }

    };
    var _setModule = function (moduleId) {
        var module = _setModuleProperties(moduleId);
        localStorageService.set('module', module);
        _fillModuleData();

    };

    var _setPassword = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/users/password', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };

    var _changePassword = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/users/password/change', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage2(err));
        });

        return deferred.promise;
    };
    var _getRegCode = function (mobile) {



        var deferred = $q.defer();
        $http.get(serviceBase + 'odata/base/register/code/' + mobile).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage(err));
        });

        return deferred.promise;
    };
    var _registerCrewPocket = function (entity) {
        var deferred = $q.defer();
        $http.post($rootScope.serviceUrl + 'odata/crewpocket/register', entity).then(function (response) {
            deferred.resolve(response.data);
        }, function (err, status) {

            deferred.reject(Exceptions.getMessage2(err));
        });

        return deferred.promise;
    };
    authServiceFactory.getRegCode = _getRegCode;
    authServiceFactory.setModule = _setModule;
    authServiceFactory.fillModuleData = _fillModuleData;
    authServiceFactory.checkAuth = _checkAuth;
    authServiceFactory.isAuthorized = _isAuthorized;
    authServiceFactory.redirectToLogin = _redirectToLogin;
    authServiceFactory.saveRegistration = _saveRegistration;
    authServiceFactory.login = _login;
    authServiceFactory.loginLocal = _loginLocal;
    authServiceFactory.logOut = _logOut;
    authServiceFactory.fillAuthData = _fillAuthData;
    authServiceFactory.authentication = _authentication;
    authServiceFactory.refreshToken = _refreshToken;

    authServiceFactory.obtainAccessToken = _obtainAccessToken;
    authServiceFactory.externalAuthData = _externalAuthData;
    authServiceFactory.registerExternal = _registerExternal;
    authServiceFactory.changePassword = _changePassword;
    authServiceFactory.setPassword = _setPassword;
    authServiceFactory.registerCrewPocket = _registerCrewPocket;
    authServiceFactory.IsAuthurized = function () {

        return authServiceFactory.authentication.isAuth;
    };


    return authServiceFactory;
}]);