import { join } from 'path';
import * as sinkStatic from '@adonisjs/sink';
// import { string } from '@poppinss/utils/build/helpers';
import { ApplicationContract } from '@ioc:Adonis/Core/Application';
import * as fs from 'fs';

type InstructionsState = {
  appName: string;
  storyType: string;
  chapterType: string;
  logoUrl: string;

  hasEditReview: boolean;
};

export default async function instructions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
) {
  const state: InstructionsState = {
    appName: 'Story CMS',
    storyType: 'Edition',
    chapterType: 'Devotion',
    logoUrl:
      'https://res.cloudinary.com/onesheep/image/upload/v1686316788/cmsplayground/bsivel4ubfkzdep51psi.svg',
    hasEditReview: false,
  };

  makeConfig(projectRoot, app, sink, state);

  // models
  makeModels(projectRoot, app, sink);

  //migrations
  makeBaseMigrations(projectRoot, app, sink, state);
}

function makeBaseMigrations(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  state: InstructionsState,
) {
  const migrationNames = templateNames('migrations');
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database';

  for (const name of migrationNames) {
    const migrationPath = join(migrationsDirectory, `${Date.now()}_${name}.ts`);

    const template = new sink.files.MustacheFile(
      projectRoot,
      migrationPath,
      getStub(`migrations/${name}.txt`),
    );

    if (hasMigrationFile(app, name)) {
      sink.logger.action('create').skipped(`${migrationPath} file already exists`);
      continue;
    }

    template.apply(state).commit();
    sink.logger.action('create').succeeded(migrationPath);
  }

  // remove existing users migration
  removeUsersMigration(app, sink);
}

function makeModels(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
) {
  const modelNames = templateNames('models');
  const modelsDirectory = app.directoriesMap.get('models') || 'app/Models';

  for (const modelName of modelNames) {
    const outPath = join(modelsDirectory, `${modelName}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`models/${modelName}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeConfig(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
  state: InstructionsState,
) {
  const configDirectory = app.directoriesMap.get('config') || 'config';
  const configPath = join(configDirectory, 'story.ts');

  const template = new sink.files.MustacheFile(
    projectRoot,
    configPath,
    getStub('config/story.txt'),
  );
  template.overwrite = true;

  template.apply(state).commit();
  sink.logger.action('create').succeeded(configPath);
}

function removeUsersMigration(app: ApplicationContract, sink: typeof sinkStatic) {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database';

  // remove existing users migration
  sink.logger.log('checking existing users migration');
  const files = fs
    .readdirSync(migrationsDirectory)
    .filter((file) => file.endsWith(`_users.ts`));

  if (files.length == 0) {
    sink.logger.log('no existing users migration');
    return;
  }
  const migrationPath = join(migrationsDirectory, files[0]);
  fs.rmSync(migrationPath);
  sink.logger.action('delete').succeeded(migrationPath);
  // fs.existsSync())
}

// -------------------
// utilities
// -------------------

function hasMigrationFile(app: ApplicationContract, migrationName: string): boolean {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database';

  const files = fs.readdirSync(migrationsDirectory);
  return files.some((file) => file.endsWith(`_${migrationName}.ts`));
}

function templateNames(folder: string): string[] {
  return fs.readdirSync(join(__dirname, 'templates', folder)).map((file): string => {
    return file.split('.')[0];
  });
}

/**
 * Returns absolute path to the stub relative from the templates
 * directory
 */
function getStub(...relativePaths: string[]) {
  return join(__dirname, 'templates', ...relativePaths);
}
