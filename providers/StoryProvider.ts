import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import AdminMiddleware from '../src/middleware/Admin';

export default class StoryProvider {
  public static needsApplication = true;
  constructor(protected app: ApplicationContract) {}
  public register() {
    // Register our bindings
    this.app.container.bind('StoryCms/Core/AdminMiddleware', () => AdminMiddleware);
    this.app.container.singleton('StoryCms/Core', () => {
      // import middleware etc
      // return middleware etc
    });
  }
}
