var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import Arrow from "./Arrow";
import "./list.style.css";
import { isDesktop } from "react-device-detect";
import Hammer from "hammerjs";
var ReactPullToRefresh = function (_a) {
    var children = _a.children, className = _a.className, disabled = _a.disabled, _b = _a.distanceToRefresh, distanceToRefresh = _b === void 0 ? 30 : _b, style = _a.style, onRefresh = _a.onRefresh, onScrollEnd = _a.onScrollEnd, rest = __rest(_a, ["children", "className", "disabled", "distanceToRefresh", "style", "onRefresh", "onScrollEnd"]);
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _startY = 0;
    var handleRefresh = useCallback(function () {
        return new Promise(function (resolve, reject) {
            onRefresh(resolve, reject);
        });
    }, []);
    function init() {
        var list = document.querySelector("#inbox");
        if (isDesktop) {
            var h = new Hammer.Manager(list);
            h.add(new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 }));
            h.on("panstart", function (e) { return onTouchStart(e.center.y); });
            h.on("pandown", function (e) { return onTouchMove(e.center.y, list); });
        }
        else {
            list.addEventListener("touchstart", function (e) { return onTouchStart(e.touches[0].pageY); }, { passive: true });
            list.addEventListener("touchmove", function (e) { return onTouchMove(e.touches[0].pageY, list); }, { passive: true });
        }
    }
    function onTouchStart(pageY) {
        _startY = pageY;
    }
    function onTouchMove(y, list) {
        if (
        //@ts-ignore
        document.scrollingElement.scrollTop === 0 &&
            list.scrollTop === 0 &&
            y > _startY) {
            if (y - _startY < distanceToRefresh) {
                list.style.transform = list.style.webkitTransform =
                    "translate3d( 0, " + y + "px, 0 )";
            }
            if (!list.classList.contains("refreshing")) {
                simulateRefreshAction(list);
            }
        }
    }
    function simulateRefreshAction(list) {
        return __awaiter(this, void 0, void 0, function () {
            var sleep, refresher;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sleep = function (timeout) {
                            return new Promise(function (resolve) { return setTimeout(resolve, timeout); });
                        };
                        setLoading(true);
                        handleRefresh();
                        refresher = document.querySelector(".refresher");
                        list.classList.add("refreshing");
                        refresher.classList.add("refreshing");
                        return [4 /*yield*/, sleep(500)];
                    case 1:
                        _a.sent();
                        setLoading(false);
                        refresher.classList.add("rotate");
                        return [4 /*yield*/, sleep(500)];
                    case 2:
                        _a.sent();
                        list.style.transform = list.style.webkitTransform = "";
                        refresher.classList.add("shrink");
                        return [4 /*yield*/, sleep(500)];
                    case 3:
                        _a.sent();
                        list.classList.remove("refreshing");
                        refresher.classList.remove("shrink");
                        refresher.classList.remove("rotate");
                        refresher.classList.remove("refreshing");
                        refresher.classList.add("done");
                        return [4 /*yield*/, sleep(0)];
                    case 4:
                        _a.sent();
                        refresher.classList.remove("done");
                        return [2 /*return*/];
                }
            });
        });
    }
    function handleScroll() {
        var list = document.querySelector("#inbox");
        if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
            onScrollEnd();
        }
    }
    useEffect(function () {
        if (!disabled) {
            init();
        }
    }, [disabled]);
    if (disabled) {
        return React.createElement("div", __assign({}, rest), children);
    }
    return (React.createElement("div", { className: "refresh-cntr" },
        React.createElement("div", { className: "refresher" }, loading ? React.createElement(Loading, { color: "black" }) : React.createElement(Arrow, { color: "black" })),
        React.createElement("section", { id: "inbox", className: "refreshList", style: style, onScroll: handleScroll }, children)));
};
export default ReactPullToRefresh;
//# sourceMappingURL=PullToRefresh.js.map