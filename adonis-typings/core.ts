declare module '@ioc:StoryCms/Core' {
  export type StoryConfig = {
    meta: {
      name: string;
      storyType: string;
      chapterType: string;
      logo: string;
    };
    hasEditReview: boolean;
    languages: {
      locale: string;
      language: string;
      languageDirection: string;
    }[];
    schemaVersion: number;
    stories: {
      id: number;
      name: string;
      fields: {
        label: string;
        name: string;
        widget: string;
      }[];
      chapterLimit: number;
    }[];
    pages: {
      schemaVersion: number;
      tracking: string;
    };
  };
}
