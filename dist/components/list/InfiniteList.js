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
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import PullToRefresh from "../pullRefresh/PullToRefresh";
var InfiniteList = function (_a) {
    var children = _a.children, url = _a.url, height = _a.height, params = _a.params, refresh = _a.refresh, headers = _a.headers, onGetCount = _a.onGetCount, onApiFailed = _a.onApiFailed, _b = _a.secure, secure = _b === void 0 ? true : _b, loadMoreRef = _a.loadMoreRef, onRefresh = _a.onRefresh;
    var _c = useState(0), page = _c[0], setPage = _c[1];
    var _d = useState(), data = _d[0], setData = _d[1];
    var _e = useState(false), refreshing = _e[0], setRefreshing = _e[1];
    if (loadMoreRef) {
        loadMoreRef(function () { return handleLoadMore(); });
    }
    function handleLoadMore() {
        console.log("handleLoadMore");
        if (!page || refreshing) {
            return;
        }
        else {
            if (Array.isArray(params)) {
                params.push({ page: page });
            }
            else {
                params = __assign({ page: page }, params);
            }
            setRefreshing(true);
            axios
                .get(url, { params: params, headers: headers })
                .then(function (res) {
                console.log("infinitelist", JSON.stringify(res));
                onResponseSuccessMore(res === null || res === void 0 ? void 0 : res.data);
            })
                .catch(onResponseFailed);
        }
    }
    var onResponseSuccess = useCallback(function (data) {
        setRefreshing(false);
        setPage((data === null || data === void 0 ? void 0 : data.next) ? 2 : 0);
        setData(data);
        if (onGetCount) {
            onGetCount(data.count, data.results);
        }
    }, []);
    var onResponseSuccessMore = useCallback(function (res) {
        setRefreshing(false);
        setPage((res === null || res === void 0 ? void 0 : res.next) ? page + 1 : 0);
        var totalResult = (data === null || data === void 0 ? void 0 : data.results)
            ? data === null || data === void 0 ? void 0 : data.results.concat(res.results)
            : res.results;
        setData(function (prevData) { return (__assign(__assign({}, res), { results: totalResult })); });
        if (onGetCount) {
            onGetCount(res.count, totalResult);
        }
    }, [page, data]);
    var onResponseFailed = useCallback(function (err) {
        setRefreshing(false);
        setPage(0);
        onApiFailed(err);
    }, []);
    var handleRefresh = useCallback(function (resolve, reject) {
        if (refreshing) {
            if (reject)
                reject();
            return;
        }
        setPage(0);
        setRefreshing(true);
        if (onRefresh) {
            onRefresh();
        }
        axios
            .get(url, { params: params, headers: headers })
            .then(function (res) {
            console.log("infinitelist", res);
            onResponseSuccess(res === null || res === void 0 ? void 0 : res.data);
            if (resolve)
                resolve();
        })
            .catch(function (err) {
            console.log("infinitelist error", JSON.stringify(err));
            onResponseFailed(err);
            if (reject)
                reject();
        });
    }, [onResponseFailed, onResponseSuccess, params, refreshing, url]);
    useEffect(function () {
        if (!!headers.au || !secure) {
            handleRefresh();
        }
    }, [url, refresh, headers]);
    if (!height) {
        return children(data === null || data === void 0 ? void 0 : data.count, data === null || data === void 0 ? void 0 : data.results);
    }
    return (React.createElement(PullToRefresh, { className: "pull-refresh-container", style: { height: height }, onRefresh: handleRefresh, loading: refreshing, distanceToRefresh: 30, onScrollEnd: handleLoadMore }, children(data === null || data === void 0 ? void 0 : data.count, data === null || data === void 0 ? void 0 : data.results)));
};
export default InfiniteList;
//# sourceMappingURL=InfiniteList.js.map