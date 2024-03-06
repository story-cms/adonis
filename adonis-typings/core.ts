declare module '@ioc:StoryCms/Core' {
  import type { Specifier, FieldSpec, Meta } from '@story-cms/ui';

  export type StoryConfig = {
    meta: Meta;
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
