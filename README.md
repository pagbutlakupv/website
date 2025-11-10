<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Build Status][build-status-shield]][build-status-url]
[![License][license-shield]][license-url]
[![Stars][stars-shield]][stars-url]

# Pagbutlak Website

Official website of Pagbutlak UPV

## About The Project

This project serves as the official website for Pagbutlak, the student and community publication of the College of Arts and Sciences (CAS) at UP Visayas.

## Getting Started

### Prerequisites

- Node.js (recommended to use [nvm](https://github.com/nvm-sh/nvm))

- [pnpm](https://pnpm.io/installation/)

- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository
1. `cp .env.example .env` to copy the example environment variables
1. Create a local PostgreSQL database and update the `DATABASE_URI` in the `.env` file

   ```bash
   -- Switch to postgres user and open psql
   sudo -i -u postgres
   psql

   -- Create user and database
   CREATE USER pagbutlakuser WITH PASSWORD 'pagbutlakpass';
   CREATE DATABASE pagbutlakdb OWNER pagbutlakuser;
   GRANT ALL PRIVILEGES ON DATABASE pagbutlakdb TO pagbutlakuser;
   ```

1. `pnpm install` to install dependencies
1. `pnpm dev` start the dev server
1. Open [http://localhost:3000](http://localhost:3000) to open the app in your browser

## Contributing

1. Fork this repository
1. Create a new branch and make your changes
   ```bash
   git switch -c feature/my-feature
   ```
1. Commit your changes (follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification)
   ```bash
   git add .
   git commit -m "feat: my feature"
   -- or use commitlint to commit with conventional commits
   pnpm commit
   ```
1. Push your branch to your fork
   ```bash
   git push origin feature/my-feature
   ```
1. Create a pull request

## Acknowledgments

- [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website) for bootstrapping the project

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[build-status-shield]: https://github.com/pagbutlakupv/website/actions/workflows/ci.yml/badge.svg
[build-status-url]: https://github.com/pagbutlakupv/website/actions
[license-shield]: https://img.shields.io/github/license/pagbutlakupv/website.svg
[license-url]: https://github.com/pagbutlakupv/website/blob/main/LICENSE
[stars-shield]: https://img.shields.io/github/stars/pagbutlakupv/website.svg?style=social&label=Star
[stars-url]: https://github.com/pagbutlakupv/website/stargazers
