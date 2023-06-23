declare module '@ioc:Adonis/Core/HttpContext' {
  interface HttpContextContract {
    auth: {
      use(type: string): {
        check: () => Promise<boolean>;
      };
      isAuthenticated: boolean;
      user?: {
        isAdmin: boolean;
      };
    };
  }
}
