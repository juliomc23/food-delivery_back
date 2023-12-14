<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

Food delivery backend app build with [Nestjs](https://nestjs.com/)

## Installation

```bash
$ pnpm install
```

## Launch docker compose to initialize postgres database

After you launch this command you should copy the `.env.template` and rename it to `.env`
<br/>

<p><b>This file should be completed with his correct data.</b></p>

```bash
$ docker compose up -d
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
