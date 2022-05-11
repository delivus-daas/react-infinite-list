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
import React from "react";
export default function Arrow(_a) {
    var color = _a.color, other = __rest(_a, ["color"]);
    return (React.createElement("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 40 40", width: "32px", height: "32px" }, other),
        React.createElement("line", { x1: "20", y1: "4", x2: "20", y2: "32", strokeLinecap: "round", strokeWidth: 3, stroke: color }),
        React.createElement("polyline", { points: "10 24 20 34 30 24", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, fill: "none", stroke: color })));
}
//# sourceMappingURL=Arrow.js.map