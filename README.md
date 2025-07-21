# Stacktrack

This project was bootstrapped with `create-syl-app`.

Stacktrack is a ~~fancy todo list~~ projects tracking tool that prioritises recency (FILO).

I find myself being drawn to projects that are more recent in my head, and so a *stack* is the perfect way to *track* what I'm currently doing and what I've done!

Bonus: If you'd like to host a similar version of this yourself, all you need is a very small set of things.

## Usage

You can see the project in action [here](https://projects.sylfr.dev/)!

If you would like to deploy the project yourself, please consult the deployment section.


## Development

To get started with development, perform the following. If you've freshly bootstrapped from the CLI, skip directly to step 4.

1. Clone this repository. `git clone <repository_url>`
2. Enter the project folder. `cd <folder_name>`
3. Install dependencies. `pnpm install`
4. Copy the provided `.env.example` file to a `.env` file. Ensure this file isn't committed (it should already exist in the ignore.) `cp .env.example .env`
5. Provide the environment variables as shown in your editor of choice. `nvim .env`
6. Run the dev server. `pnpm dev`

The project is configured with (mostly) Next.js defaults, and thus can be accessed at [localhost](http://localhost:3000) when the dev server is running.

The project is also configured to use Turbopack with Next. If you run into an issue with it, please file an issue with [Turbopack](https://github.com/vercel/turborepo). You can disable Turbopack usage by removing `--turbopack` in the `dev` script in the `package.json`.

## Deployment

Deploying on Vercel is assumed to be a default because of lack of friction. You are encouraged to use [OpenNext](https://opennext.js.org/) to deploy whenever projects get large enough to move off Vercel.

If deploying on Vercel, please ensure that you have the [Vercel CLI](https://vercel.com/docs/cli) installed. Or head to your [dashboard](https://vercel.com/).

This project does in fact currently use Vercel. If you are intending to deploy a variant of this project yourself, you will require a [Turso](https://turso.tech/) database.

Steps for deployment:

1. Set up a database and grab the appropriate tokens from Turso. Keep them somewhere or just keep the tab open.
2. Fork this repository.
3. On [Vercel](https://vercel.com/), import the freshly forked repository.
4. During deployment, you must set your environment variables. Referring to the the provided `.env.example` file, set all the necessary variables. You MUST set the admin key, turso database URL, and turso auth token.
5. Click deploy!

Once the project is deployed, if the environment variables are set correctly, you can access admin mode on the projects tracker by providing a query param.

E.g. https://projects.sylfr.dev/?admin=your-admin-key-here

This allows you to add new projects, edit the details of existing projects, and prioritise projects you're working on now.