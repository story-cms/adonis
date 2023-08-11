declare module '@ioc:StoryCms/Core' {
  import { Specifier, FieldSpec } from '@story-cms/ui';

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
      fields: FieldSpec[];
      chapterLimit: number;
    }[];
    pages: {
      schemaVersion: number;
      tracking: string;
    };
  };

  import { BaseModel } from '@ioc:Adonis/Lucid/Orm';
  export class Chapter extends BaseModel {
    locale: string;
    bundle: string;
    specifier: Specifier;
  }
}
