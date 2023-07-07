import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { StoryConfig } from '@ioc:StoryCms/Core';
import { Version } from '@story-cms/ui';

export default class VersionContext {
  constructor(private config: StoryConfig) {}

  public async handle(
    { request, session }: HttpContextContract,
    next: () => Promise<void>,
  ) {
    if (this.shouldIgnore(request)) {
      await next();
      return;
    }

    // const storySpec = config.get('story');

    // determine the version
    const storyId = session.get('storyId');
    const story =
      this.config.stories.find((s) => s.id === storyId) || this.config.stories[0];
    const version: Version = {
      apiVersion: this.config.schemaVersion,
      locale: session.get('locale') || 'en',
      storyId: story.id,
    };

    // attach it to the context
    request.all().version = version;
    request.all().story = story;
    await next();
  }

  private shouldIgnore(request): boolean {
    if (request.matchesRoute('/switch')) return true;

    if (request.url().startsWith('/api/')) return true;

    return false;
  }
}
