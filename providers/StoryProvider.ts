import { ApplicationContract } from "@ioc:Adonis/Core/Application";
export default class StoryProvider {
  public static needsApplication = true;
  constructor(protected app: ApplicationContract) {}
  public register() {
    // Register our bindings
    this.app.container.singleton("StoryCms/Core", () => {
      // import middleware etc
      // return middleware etc
    });
  }
}
