import { AxiosError, AxiosInstance, AxiosRequestHeaders } from "axios";
export interface InfiniteListProps {
    params?: any;
    url: string;
    height?: number | string;
    refresh?: boolean;
    secure?: boolean;
    authenticated?: boolean;
    http: AxiosInstance;
    headers?: AxiosRequestHeaders;
    children: (count?: number, data?: any[]) => any;
    onGetCount?: (count: number, data: any[]) => void;
    onApiFailed: (error: AxiosError) => void;
    onRefresh?: () => void;
    loadMoreRef?: (func: () => void) => void;
}
export declare type GetListResponse = {
    count: number;
    next: string;
    previous: string;
    current_page: number;
    items_per_page: number;
    results: any[];
};
