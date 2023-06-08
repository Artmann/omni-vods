# Omni VODs

A better way to watch Destiny VODs (The Woman, Not the Game).

Instead of having to deal with the atrocity that is the Rumble and Kick video
players, we'll try provide a player more similar to the Youtube player.

## Development

Start the Remix development asset server and the Express server by running:

```sh
yarn dev
```

This starts your app in development mode, which will purge the server require
cache when Remix rebuilds assets so you don't need a process manager restarting
the express server.

## Deployment

First, build your app for production:

```sh
yarn build
```

Then run the app in production mode:

```sh
yarn start
```
