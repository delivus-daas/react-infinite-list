import React, { ReactNode, useCallback, useEffect, useState } from "react";
import Loading from "./Loading";
import Arrow from "./Arrow";
import "./list.style.css";
import { isDesktop } from "react-device-detect";
import Hammer from "hammerjs";

interface Props {
  children: ReactNode;
  disabled?: boolean;
  distanceToRefresh?: number;
  loading?: boolean;
  onRefresh: (resolve: any, reject: any) => void;
  onScrollEnd: () => void;
  className: string;
  style?: any;
}
const ReactPullToRefresh = ({
  children,
  className,
  disabled,
  distanceToRefresh = 30,
  style,
  onRefresh,
  onScrollEnd,
  ...rest
}: Props) => {
  const [loading, setLoading] = useState(false);

  let _startY = 0;

  const handleRefresh = useCallback(() => {
    return new Promise((resolve, reject) => {
      onRefresh(resolve, reject);
    });
  }, []);

  function init() {
    const list: any = document.querySelector("#inbox");
    if (isDesktop) {
      var h = new Hammer.Manager(list);
      h.add(
        new Hammer.Pan({ direction: Hammer.DIRECTION_VERTICAL, threshold: 0 })
      );

      h.on("panstart", (e: any) => onTouchStart(e.center.y));

      h.on("pandown", (e: any) => onTouchMove(e.center.y, list));
    } else {
      list.addEventListener(
        "touchstart",
        (e: any) => onTouchStart(e.touches[0].pageY),
        { passive: true }
      );

      list.addEventListener(
        "touchmove",
        (e: any) => onTouchMove(e.touches[0].pageY, list),
        { passive: true }
      );
    }
  }

  function onTouchStart(pageY: number) {
    _startY = pageY;
  }

  function onTouchMove(y: number, list: any) {
    if (
      //@ts-ignore
      document.scrollingElement.scrollTop === 0 &&
      list.scrollTop === 0 &&
      y > _startY
    ) {
      if (y - _startY < distanceToRefresh) {
        list.style.transform = list.style.webkitTransform =
          "translate3d( 0, " + y + "px, 0 )";
      }
      if (!list.classList.contains("refreshing")) {
        simulateRefreshAction(list);
      }
    }
  }

  async function simulateRefreshAction(list: any) {
    const sleep = (timeout: any) =>
      new Promise((resolve) => setTimeout(resolve, timeout));
    setLoading(true);
    handleRefresh();
    const refresher: any = document.querySelector(".refresher");
    list.classList.add("refreshing");
    refresher.classList.add("refreshing");
    await sleep(500);
    setLoading(false);
    refresher.classList.add("rotate");
    await sleep(500);
    list.style.transform = list.style.webkitTransform = "";
    refresher.classList.add("shrink");
    await sleep(500);
    list.classList.remove("refreshing");
    refresher.classList.remove("shrink");
    refresher.classList.remove("rotate");
    refresher.classList.remove("refreshing");
    refresher.classList.add("done");
    await sleep(0);
    refresher.classList.remove("done");
  }

  function handleScroll() {
    const list: any = document.querySelector("#inbox");
    if (list.scrollTop + list.clientHeight >= list.scrollHeight) {
      onScrollEnd();
    }
  }

  useEffect(() => {
    if (!disabled) {
      init();
    }
  }, [disabled]);

  if (disabled) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <div className={"refresh-cntr"}>
      <div className="refresher">
        {loading ? <Loading color={"black"} /> : <Arrow color={"black"} />}
      </div>
      <section
        id="inbox"
        className={"refreshList"}
        style={style}
        onScroll={handleScroll}
      >
        {children}
      </section>
    </div>
  );
};

export default ReactPullToRefresh;
