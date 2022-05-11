var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from "react";
var style = { transition: "opacity 0.3s" };
var Loading = /** @class */ (function (_super) {
    __extends(Loading, _super);
    function Loading() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.highlighted = 0;
        _this.circles = [6, 20, 34];
        return _this;
    }
    Loading.prototype.componentDidMount = function () {
        var _this = this;
        var length = this.circles.length;
        this.intervalId = setInterval(function () {
            var next = _this.highlighted + 1;
            _this.highlighted = next >= length ? 0 : next;
            _this.forceUpdate();
        }, 300);
    };
    Loading.prototype.shouldComponentUpdate = function () {
        return false;
    };
    Loading.prototype.componentWillUnmount = function () {
        clearInterval(this.intervalId);
    };
    Loading.prototype.render = function () {
        var _a = this, color = _a.props.color, highlighted = _a.highlighted, circles = _a.circles;
        return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "32px", height: "32px" }, circles.map(function (cx, index) { return (React.createElement("circle", { key: index, cx: cx, cy: "20", r: "3", fill: color, opacity: highlighted === index ? 1 : 0.2, style: style })); })));
    };
    return Loading;
}(Component));
export default Loading;
//# sourceMappingURL=Loading.js.map