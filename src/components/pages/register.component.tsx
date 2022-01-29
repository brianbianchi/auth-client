import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import authRequests from "../../services/auth.service";

interface IProps {
    user?: any;
    setUser?: any;
}

interface IState {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    message: string;
    loggedIn: boolean;
    isRegistered: boolean;
    showPassword: boolean;
}

export default class Register extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { email: '', username: '', message: '', password: '', confirmPassword: '', loggedIn: false, isRegistered: false, showPassword: false };
        if (this.props.user) {
            this.setState({ loggedIn: true });
        }
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                message: 'Passwords do not match.'
            });
        } else {
            authRequests.signup(data).then((res): void => {
                this.setState({
                    isRegistered: true
                });
            }).catch((err): void => {
                this.setState({
                    message: err.response.data.error
                });
            });
        }
    }

    handleChange =
        (prop: keyof IState): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
            return (event: React.ChangeEvent<HTMLInputElement>): void => {
                this.setState({ ...this.state, [prop]: event.target.value } as Pick<IState, keyof IState>);
            };
        }

    handleClickShowPassword = (): void => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    }

    handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
    }

    render(): JSX.Element {
        if (this.state.isRegistered) {
            return <Navigate to="/login" replace />;
        }

        let error = (
            <div></div>
        );
        if (this.state.message) {
            error = (
                <div className="alert alert-danger" role="alert">
                    {this.state.message}
                </div>
            );
        }

        return (
            <form>

                {error}

                <h3>Register</h3>

                <div className="mb-3">
                    <label htmlFor="usernameInput" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        placeholder="johndoe"
                        value={this.state.username}
                        onChange={this.handleChange("username")}
                    />
                </div>
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
                <div className="mb-3">
                    <label htmlFor="passwordInput" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="passwordInput"
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmPasswordInput" className="form-label">
                        Confirm password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="confirmPasswordInput"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                    />
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
                    Register
                </button>
            </form>
        );
    }
}