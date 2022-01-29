import React, { Component } from "react";
import authRequests from "../../services/auth.service";

interface IProps {
}

interface IState {
    email: string;
    message: string;
    class: string;
}

export default class Forgot extends Component<IProps, IState> {

    public email: string = '';

    constructor(props: IProps) {
        super(props);
        this.state = { email: '', message: '', class: '' };
    }

    handleSubmit = (e: any): void => {
        e.preventDefault();
        const data = {
            email: this.state.email
        };

        authRequests.forgot(data).then((res): void => {
            this.setState({
                message: res.data.message,
                class: 'success'
            });
        }).catch((err): void => {
            this.setState({
                message: err.response.data.error,
                class: 'danger'
            });
        });
    }

    handleChange =
        (prop: keyof IState): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
            return (event: React.ChangeEvent<HTMLInputElement>): void => {
                this.setState({ ...this.state, [prop]: event.target.value } as Pick<IState, keyof IState>);
            };
        }

    render(): JSX.Element {
        let jsxmessage = (<div></div>);
        if (this.state.message) {
            const cls = `alert alert-${this.state.class}`;
            jsxmessage = (
                <div className={cls} role="alert">
                    {this.state.message}
                </div>
            );
        }

        return (
            <form>

                {jsxmessage}

                <h3>Forgot password</h3>

                <div className="mb-3">
                    <label htmlFor="emailInput" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="name@example.com"
                        value={this.state.email}
                        onChange={this.handleChange("email")}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                    Submit
                </button>
            </form>
        );
    }
}