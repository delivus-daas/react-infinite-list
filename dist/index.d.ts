import { AxiosInstance, AxiosRequestHeaders, AxiosError } from 'axios';

interface InfiniteListProps {
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

declare const InfiniteList: ({ children, url, height, params, refresh, headers, http, onGetCount, onApiFailed, secure, authenticated, loadMoreRef, onRefresh, }: InfiniteListProps) => any;

export { InfiniteList };
