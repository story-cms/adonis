The Story CMS package `@story-cms/adonis` has been successfully configured. Before you
begin, please register the below named middleware inside your `start/kernel.ts` file.

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
