import { ReactNode } from "react";
import "./list.style.css";
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
declare const ReactPullToRefresh: ({ children, className, disabled, distanceToRefresh, style, onRefresh, onScrollEnd, ...rest }: Props) => JSX.Element;
export default ReactPullToRefresh;
