import { Component } from "react";
declare type Props = {
    color: string;
};
export default class Loading extends Component<Props> {
    intervalId: any;
    highlighted: number;
    componentDidMount(): void;
    shouldComponentUpdate(): boolean;
    componentWillUnmount(): void;
    circles: number[];
    render(): JSX.Element;
}
export {};
