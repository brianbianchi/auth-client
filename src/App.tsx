import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Forgot from "./components/pages/forgot.component";
import Home from "./components/pages/home.component";
import Login from "./components/pages/login.component";
import Register from "./components/pages/register.component";
import Reset from "./components/pages/reset.component";
import Nav from "./components/shared/nav.component";
import authRequests from "./services/auth.service";

interface IProps {
}

interface IState {
  user?: any;
}

export default class App extends Component<IProps, IState> {
  _isMounted: boolean = false;

  constructor(props: IProps) {
    super(props);
    this.state = { user: undefined };
  }

  componentDidMount(): void {
    this._isMounted = true;
    if (!localStorage.getItem("refreshToken")) {
      return;
    }
    authRequests.getUser().then((res): void => {
      if (this._isMounted) {
        this.setState({ user: res.data });
      }
    }).catch((err): void => {
      console.error(err);
    });
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  setUser = (user: any): void => {
    this.setState({
      user
    });
  }

  render(): JSX.Element {
    return (
      <BrowserRouter>

        <header>
          <Nav user={this.state.user} setUser={this.setUser} />
        </header>

        <main role="main">
          <div className="container py-4">
            <Routes>
              <Route path="/" element={<Home user={this.state.user} />} />
              <Route path="/login" element={<Login user={this.state.user} setUser={this.setUser} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/reset/:id" element={<Reset />} />
            </Routes>
          </div>
        </main>
      </BrowserRouter >
    );
  }
}