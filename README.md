# StoryCMS Adonis

StoryCMS package for the AdonisJS framework

## Prerequisites

This library depends on three `AdonisJS` core libraries: `@adonisjs/auth`,
`@adonisjs/lucid` and `@adonisjs/session`.

## Installation

```shell
# NPM
npm i @story-cms/adonis
node ace configure @story-cms/adonis
```

Complete the installation by registering the below named middleware inside your
`start/kernel.ts` file.

```ts
Server.middleware.register([
  () => import('@ioc:EidelLev/Inertia/Middleware'),
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:StoryCms/Core/VersionContext'), // 👈
]);

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  admin: () => import('@ioc:StoryCms/Core/AdminMiddleware'), // 👈
});
```

## Contributing

This project happily accepts contributions.

## Issues

If you have a question or found a bug, feel free to
[open an issue](https://github.com/story-cms/adonis/issues).
