import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class Admin {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    await auth.use('web').check();

    if (!auth.isAuthenticated) {
      response.unauthorized({ error: 'You have to be logged in' });
      return;
    }

    if (!auth.user?.isAdmin) {
      response.forbidden({ error: 'Only for site administrators' });
      return;
    }

    await next();
  }
}
