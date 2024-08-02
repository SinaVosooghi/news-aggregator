# News application

## Developing and Debugging

Assuming you have:

- [`git`](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [`Node v20.18.2 & yarn v1.22.19`](https://nodejs.org/en)
- [`Docker`](https://www.docker.com/) and [`Docker Compose`](https://docs.docker.com/compose/install/)

Running following commands will start development server, which runs UI at localhost:5173

```bash
yarn
yarn dev
```

## Deploying

just ensure to have [`Docker`](https://www.docker.com/) installed on your machine and run:

```bash
docker compose -f docker-compose up -d
```

and app will be available at: localhost:5173

## IDE

The suggested IDE for working in this repo is VSCode, because the repo has special configs to improve the DX there (auto-format & auto-lint, recommended extensions etc.).


