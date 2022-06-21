import React, { useCallback, useEffect, useRef, useState } from "react";
import { AxiosError } from "axios";
import PullToRefresh from "../pullRefresh/PullToRefresh";
import { InfiniteListProps, GetListResponse } from "./InfiniteList.types";

const InfiniteList = ({
  children,
  url,
  height,
  params,
  refresh,
  headers,
  http,
  onGetCount,
  onApiFailed,
  secure = true,
  authenticated,
  loadMoreRef,
  onRefresh,
}: InfiniteListProps) => {
  const pageRef = useRef(1);
  const [data, setData] = useState<GetListResponse>();
  const [refreshing, setRefreshing] = useState(false);

  if (loadMoreRef) {
    loadMoreRef(() => handleLoadMore());
  }

  function handleLoadMore() {
    console.log("handleLoadMore ", pageRef.current, refreshing);
    if (pageRef.current == 1 || refreshing) {
      return;
    } else {
      if (Array.isArray(params)) {
        params.push({ page: pageRef.current });
      } else {
        params = { page: pageRef.current, ...params };
      }
      setRefreshing(true);
      http
        .get(url, { params, headers })
        .then((res) => {
          console.log("infinitelist", JSON.stringify(res));
          onResponseSuccessMore(res?.data);
        })
        .catch(onResponseFailed);
    }
  }

  const onResponseSuccess = useCallback((data: GetListResponse) => {
    setRefreshing(false);
    pageRef.current = data?.next ? 2 : 1;
    setData(data);
    if (onGetCount) {
      onGetCount(data.count, data.results);
    }
  }, []);

  const onResponseSuccessMore = useCallback(
    (res: GetListResponse) => {
      setRefreshing(false);
      pageRef.current = res?.next ? pageRef.current + 1 : 1;
      const totalResult = data?.results
        ? data?.results.concat(res.results)
        : res.results;

      setData((prevData) => ({
        ...res,
        results: totalResult,
      }));
      if (onGetCount) {
        onGetCount(res.count, totalResult);
      }
    },
    [data]
  );

  const onResponseFailed = useCallback((err: AxiosError) => {
    setRefreshing(false);
    pageRef.current = 1;
    onApiFailed(err);
  }, []);

  const handleRefresh = useCallback(
    (resolve?: any, reject?: any) => {
      if (refreshing) {
        if (reject) reject();
        return;
      }
      pageRef.current = 1;
      setRefreshing(true);
      if (onRefresh) {
        onRefresh();
      }

      http
        .get(url, { params, headers })
        .then((res) => {
          console.log("infinitelist", res);
          onResponseSuccess(res?.data);
          if (resolve) resolve();
        })
        .catch((err) => {
          console.log("infinitelist error", JSON.stringify(err));
          onResponseFailed(err);
          if (reject) reject();
        });
    },
    [onResponseFailed, onResponseSuccess, params, refreshing, url]
  );

  useEffect(() => {
    if (!!authenticated || !secure) {
      handleRefresh();
    }
  }, [url, refresh, authenticated]);

  if (!height) {
    return children(data?.count, data?.results);
  }

  return (
    <PullToRefresh
      className={"pull-refresh-container"}
      style={{ height }}
      onRefresh={handleRefresh}
      loading={refreshing}
      distanceToRefresh={30}
      onScrollEnd={handleLoadMore}
    >
      {children(data?.count, data?.results)}
    </PullToRefresh>
  );
};

export default InfiniteList;
