# projects-stack

This project was bootstrapped with `create-syl-app`.

## Usage

Describe end-user usage instructions here.

## Development

To get started with development, perform the following. If you've freshly bootstrapped from the CLI, skip directly to step 4.

1. Clone this repository. `git clone <repository_url>`
2. Enter the project folder. `cd <folder_name>`
3. Install dependencies. `pnpm install`
4. Copy the provided `.env.example` file to a `.env` file. Ensure this file isn't committed (it should already exist in the ignore.) `cp .env.example .env`
5. Provide the environment variables as shown in your editor of choice. `nvim .env`
6. Run the dev server. `pnpm dev`

The project is configured with (mostly) Next.js defaults, and thus can be accessed at [http://localhost:3000] when the dev server is running.

The project is also configured to use Turbopack with Next. If you run into an issue with it, please file an issue with [Turbopack](https://github.com/vercel/turborepo). You can disable Turbopack usage by removing `--turbopack` in the `dev` script in the `package.json`.

## Deployment

Deploying on Vercel is assumed to be a default because of lack of friction. You are encouraged to use [OpenNext](https://opennext.js.org/) to deploy whenever projects get large enough to move off Vercel.

If deploying on Vercel, please ensure that you have the [Vercel CLI](https://vercel.com/docs/cli) installed. Or head to your [dashboard](https://vercel.com/).

If not deploying on Vercel, please ensure that you update these documents to reflect CI/CD steps.