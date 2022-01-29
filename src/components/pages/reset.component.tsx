import React, { Component } from "react";
import { Navigate, useParams } from "react-router-dom";
import authRequests from "../../services/auth.service";

interface IProps {
}

interface IState {
    isReset: boolean;
    password: string;
    confirmPassword: string;
    showPassword: boolean;
}

export default class Reset extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = { password: '', confirmPassword: '', isReset: false, showPassword: false };
    }

    handleSubmit = (event: any): void => {
        event.preventDefault();
        const params = useParams();
        const data = {
            resetCode: params.id,
            password: this.state.password
        };
        if (this.state.password !== this.state.confirmPassword) {
            console.log('passwords do not match');
        } else {
            authRequests.reset(data).then((res): void => {
                this.setState({ isReset: true });
            }).catch((error): void => {
                console.error(error);
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
        if (this.state.isReset) {
            return (
                <Navigate to={'/login'} replace />
            );
        }

        return (
            <form>
                <h3>Reset password</h3>

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
                    Reset
                </button>
            </form>
        );
    }
}