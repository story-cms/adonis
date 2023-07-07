import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import AdminMiddleware from '../src/middleware/Admin';
import VersionContext from '../src/middleware/VersionContext';
import { ConfigContract } from '@ioc:Adonis/Core/Config';

export default class StoryProvider {
  public static needsApplication = true;
  constructor(protected app: ApplicationContract) {}
  public register() {
    // Register our bindings
    // this.app.container.bind('StoryCms/Core/AdminMiddleware', () => AdminMiddleware);
    // this.app.container.bind('StoryCms/Core/VersionContext', () => VersionMiddleware);
    // this.app.container.singleton('StoryCms/Core', () => {
    //   // import middleware etc
    //   // return middleware etc
    // });
  }

  public boot(): void {
    this.app.container.withBindings(
      [
        'Adonis/Core/Config',
        // 'Adonis/Core/Application',
      ],
      (Config) => {
        this.registerMiddleware(Config);
        this.app.container.singleton('StoryCms/Core', () => ({}));
      },
    );
  }

  public registerMiddleware(config: ConfigContract): void {
    this.app.container.bind('StoryCms/Core/AdminMiddleware', () => AdminMiddleware);
    this.app.container.singleton('StoryCms/Core/VersionContext', () => {
      const storyConfig = config.get('story.storyConfig');
      return new VersionContext(storyConfig);
    });
  }
}
