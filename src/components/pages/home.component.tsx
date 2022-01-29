import { Component } from "react";

interface IProps {
    user?: any;
}

interface IState {
    topPlayers: any[];
}

export default class Home extends Component<IProps, IState>  {
    _isMounted: boolean = false;

    componentDidMount(): void {
        this._isMounted = true;
    }

    componentWillUnmount(): void {
        this._isMounted = false;
    }

    render(): JSX.Element {
        if (this.props.user) {
            return (
                <div>
                    <p>You are logged in as {this.props.user.username}.</p>
                </div>
            );
        } else if (!this.props.user) {
            return (
                <h3>You are not logged in.</h3>
            );
        }

        return (
            <p>loading</p>
        );
    }
}