declare module '@ioc:StoryCms/Core' {
  import type { Specifier, FieldSpec } from '@story-cms/ui';

  export type StoryConfig = {
    meta: {
      name: string;
      logo: string;
      storyType: string;
      chapterType: string;
      helpUrl?: string;
      microCopySource?: string;
      hasEditReview: boolean;
      hasAppPreview: boolean;
    };
    languages: {
      locale: string;
      language: string;
      languageDirection: string;
      bibleVersion?: string;
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
