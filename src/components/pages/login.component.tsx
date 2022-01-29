import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import authRequests from "../../services/auth.service";

interface IProps {
  user?: any;
  setUser?: any;
}

interface IState {
  email: string;
  message: string;
  password: string;
  loggedIn: boolean;
  showPassword: boolean;
}

export default class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { email: "", message: "", password: "", loggedIn: false, showPassword: false };
    if (this.props.user) {
      this.setState({ loggedIn: true });
    }
  }

  handleSubmit = (event: any): void => {
    event.preventDefault();
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    authRequests
      .login(data)
      .then((res): void => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        this.setState({ loggedIn: true });
        this.props.setUser(res.data.userobj);
      })
      .catch((err): void => {
        this.setState({
          message: err.response.data.error,
        });
      });
  }

  handleChange = (prop: keyof IState): ((event: React.ChangeEvent<HTMLInputElement>) => void) => {
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
    if (this.state.loggedIn) {
      return <Navigate to="/" replace />;
    }

    let error = <div></div>;
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

        <h3>Login</h3>

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
            onChange={this.handleChange('password')} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>
          Login
        </button>
        <p>
          <Link to={"/forgot"}>Forgot password?</Link>
        </p>
      </form>
    );
  }
}
