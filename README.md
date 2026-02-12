<a id="readme-top"></a>

<!-- PROJECT SHIELDS -->

[![Build Status][build-status-shield]][build-status-url]
[![License][license-shield]][license-url]
[![Stars][stars-shield]][stars-url]

# Pagbutlak Website

Official website of Pagbutlak UPV

## About The Project

This project is the official website for the student and community publication of CAS in UP Visayas, Pagbutlak.

## Getting Started

### Prerequisites

- Node.js (recommended to use [nvm](https://github.com/nvm-sh/nvm))

- [pnpm](https://pnpm.io/installation/)

- [PostgreSQL](https://www.postgresql.org/) (optional)

- [Docker](https://docs.docker.com/get-docker/) (optional)

### Installation

1. Clone the repository
1. `cp .env.example .env` to copy the example environment variables

#### Option 1: Local (Manual Setup)

1. Create a local PostgreSQL database.
1. `pnpm install` to install dependencies
1. `pnpm dev` start the dev server

#### Option 2: Docker

1. Start the services
   ```bash
   docker-compose up
   ```

### Usage

1. Open [http://localhost:3000](http://localhost:3000) to open the app in your browser
1. Go to [http://localhost:3000/admin](http://localhost:3000/admin) to open the admin panel
1. Seed the database by clicking the seed button.

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
