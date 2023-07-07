declare module '@ioc:StoryCms/Core/VersionContext' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

  export default class VersionContext {
    public handle(ctx: HttpContextContract, next: () => Promise<void>);
  }
}

declare module '@ioc:StoryCms/Core/AdminMiddleware' {
  import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

  export default class AdminMiddleware {
    public handle(ctx: HttpContextContract, next: () => Promise<void>);
  }
}
