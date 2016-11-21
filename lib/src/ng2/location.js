var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HashLocationStrategy, PlatformLocation, LocationStrategy } from "@angular/common";
import { Injectable } from "@angular/core";
import { services } from "ui-router-core";
import { isDefined } from "ui-router-core";
import { applyPairs } from "ui-router-core";
import { beforeAfterSubstr } from "ui-router-core";
var splitOnHash = beforeAfterSubstr("#");
var splitOnEquals = beforeAfterSubstr("=");
var splitOnQuestionMark = beforeAfterSubstr("?");
export var UIRouterLocation = (function () {
    function UIRouterLocation(locationStrategy, platformLocation) {
        this.locationStrategy = locationStrategy;
        this.platformLocation = platformLocation;
        this.hashPrefix = "";
        this.isHashBang = locationStrategy instanceof HashLocationStrategy;
    }
    UIRouterLocation.prototype.init = function () {
        var _this = this;
        var loc = services.location;
        var locSt = this.locationStrategy;
        if (this.isHashBang) {
            loc.path = function () {
                return splitOnHash(splitOnQuestionMark(locSt.path())[0])[0];
            };
            loc.hash = function () {
                return splitOnHash(splitOnHash(_this.platformLocation.hash)[1])[1];
            };
        }
        else {
            var basepath = locSt.getBaseHref();
            var basepathRegExp_1 = new RegExp("^" + basepath);
            var replace_1 = (basepath[basepath.length - 1] === '/') ? "/" : "";
            loc.path = function () {
                return splitOnHash(splitOnQuestionMark(locSt.path())[0])[0].replace(basepathRegExp_1, replace_1);
            };
            loc.hash = function () {
                return splitOnHash(_this.platformLocation.hash)[1];
            };
        }
        loc.search = (function () {
            var queryString = splitOnHash(splitOnQuestionMark(locSt.path())[1])[0];
            return queryString.split("&").map(function (kv) { return splitOnEquals(kv); }).reduce(applyPairs, {});
        });
        loc.setUrl = function (url, replace) {
            if (replace === void 0) { replace = false; }
            if (isDefined(url)) {
                var split = splitOnQuestionMark(url);
                if (replace) {
                    locSt.replaceState(null, null, split[0], split[1]);
                }
                else {
                    locSt.pushState(null, null, split[0], split[1]);
                }
            }
        };
        loc.onChange = function (cb) { return locSt.onPopState(cb); };
        var locCfg = services.locationConfig;
        locCfg.port = function () { return null; };
        locCfg.protocol = function () { return null; };
        locCfg.host = function () { return null; };
        locCfg.baseHref = function () { return locSt.getBaseHref(); };
        locCfg.html5Mode = function () { return !_this.isHashBang; };
        locCfg.hashPrefix = function (newprefix) {
            if (isDefined(newprefix)) {
                _this.hashPrefix = newprefix;
            }
            return _this.hashPrefix;
        };
    };
    UIRouterLocation = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [LocationStrategy, PlatformLocation])
    ], UIRouterLocation);
    return UIRouterLocation;
}());
//# sourceMappingURL=location.js.map