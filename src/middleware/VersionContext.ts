import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import type { RequestContract } from '@ioc:Adonis/Core/Request';
import { StoryConfig } from '@ioc:StoryCms/Core';
import { Version } from '@story-cms/ui';

export default class VersionContext {
  constructor(private config: StoryConfig) {}

  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    if (this.shouldIgnore(ctx.request)) {
      await next();
      return;
    }

    // determine the version
    const storyId = ctx.session.get('storyId');
    const story =
      this.config.stories.find((s) => s.id === storyId) || this.config.stories[0];
    const version: Version = {
      apiVersion: this.config.schemaVersion,
      locale: ctx.session.get('locale') || 'en',
      storyId: story.id,
    };

    // attach it to the context
    ctx.version = version;
    ctx.story = story;
    await next();
  }

  private shouldIgnore(request: RequestContract): boolean {
    if (request.matchesRoute('/switch')) return true;

    // public routes
    if (request.matchesRoute('/login')) return true;
    if (request.matchesRoute('/forgot-password')) return true;
    if (request.url().startsWith('/reset-password')) return true;
    if (request.url().startsWith('/api/')) return true;

    return false;
  }
}
