> Minimal [react](https://reactjs.org/) project that consumes a [JWT authentication backend](https://github.com/brianbianchi/auth-server).

## Usage

```console
$ docker build -t auth-client:latest .
$ docker run --name auth-client -p 3000:3000 auth-client:latest
```