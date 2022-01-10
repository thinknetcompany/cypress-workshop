# Cypress Workshop

## Installation

- [Using Docker](#using-docker)
- [Install Locally](#install-locally)

---

### Using [Docker](https://www.docker.com)

Start docker then start project using `docker-compose` command

```
docker-compose up
```

This will open Cypress test runner in browser.

Visit web demo [http://localhost:3000](http://localhost:3000).

---

### Install Locally

[NodeJS](https://nodejs.org/en/download) and Browser ([Chrome](https://www.google.com/chrome) recommended) is required.

#### Start Web Demo
```
cd web-demo
npm install
npm run build
npm run start
```

Visit web demo [http://localhost:3000](http://localhost:3000).

#### Start Cypress
```
cd system-test
npm install
npm run cypress:open
```

This will open Cypress test runner in browser.
