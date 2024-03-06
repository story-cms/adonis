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
  helpUrl: string;
  microCopySource: string;
  hasEditReview: boolean;
  hasAppPreview: boolean;
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
    helpUrl: 'https://www.markdownguide.org',
    microCopySource:
      'https://raw.githubusercontent.com/partner_organization/partner_project/main/lib/src/localization/app_en.arb',
    hasEditReview: false,
    hasAppPreview: false,
  };

  state.appName = await sink.getPrompt().ask('Enter the name of the app', {
    default: state.appName,
    validate(view) {
      return !!view.length || 'This cannot be left empty';
    },
  });

  state.storyType = await sink.getPrompt().ask('Enter the story type', {
    default: state.storyType,
    validate(view) {
      return !!view.length || 'This cannot be left empty';
    },
  });

  state.chapterType = await sink.getPrompt().ask('Enter the chapter type', {
    default: state.chapterType,
    validate(view) {
      return !!view.length || 'This cannot be left empty';
    },
  });

  state.logoUrl = await sink.getPrompt().ask('Enter the url for the hosted app logo', {
    default: state.logoUrl,
    validate(view) {
      return !!view.length || 'This cannot be left empty';
    },
  });

  state.helpUrl = await sink.getPrompt().ask('Enter the url for the hosted help page', {
    default: state.helpUrl,
    validate(view) {
      return !!view.length || 'This cannot be left empty';
    },
  });

  state.microCopySource = await sink
    .getPrompt()
    .ask('Enter the url where the micro copy can be pulled from', {
      default: state.microCopySource,
      validate() {
        return true;
      },
    });

  makeConfig(projectRoot, app, sink, state);
  makeModels(projectRoot, app, sink);
  makeServices(projectRoot, sink);
  makeValidators(projectRoot, sink);
  makeControllers(projectRoot, app, sink);
  makeRoutes(projectRoot, sink);
  makeBaseMigrations(projectRoot, app, sink, state);
  makeCommands(projectRoot, sink);
  makeContracts(projectRoot, sink);
  makeStart(projectRoot, sink);
  makeExceptions(projectRoot, app, sink);
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

    const file = migrationFile(app, name);
    if (file != null) {
      sink.logger.action('create').skipped(`${file} file already exists`);
      continue;
    }

    template.apply(state).commit();
    sink.logger.action('create').succeeded(migrationPath);
  }

  // remove existing users migration
  removeUsersMigration(app, sink);
}

function makeServices(projectRoot: string, sink: typeof sinkStatic) {
  const entity = 'services';
  const serviceNames = templateNames(entity);
  const targetDirectory = 'app/Services';

  for (const name of serviceNames) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeCommands(projectRoot: string, sink: typeof sinkStatic) {
  const entity = 'commands';
  const names = templateNames(entity);
  const targetDirectory = 'commands';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeContracts(projectRoot: string, sink: typeof sinkStatic) {
  const entity = 'contracts';
  const names = templateNames(entity);
  const targetDirectory = 'contracts';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeStart(projectRoot: string, sink: typeof sinkStatic) {
  const entity = 'start';
  const names = templateNames(entity);
  const targetDirectory = 'start';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeExceptions(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
) {
  const entity = 'exceptions';
  const names = templateNames(entity);
  const targetDirectory = app.directoriesMap.get('exceptions') || 'app/Exceptions';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeValidators(projectRoot: string, sink: typeof sinkStatic) {
  const entity = 'validators';
  const names = templateNames(entity);
  const targetDirectory = 'app/Validators';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = false;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeControllers(
  projectRoot: string,
  app: ApplicationContract,
  sink: typeof sinkStatic,
) {
  const names = templateNames('controllers');
  const targetDirectory = app.directoriesMap.get('controllers') || 'app/Controllers/Http';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`controllers/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function makeRoutes(projectRoot: string, sink: typeof sinkStatic) {
  const names = templateNames('routes');
  const targetDirectory = 'start/routes';
  // fs.mkdirSync(join(projectRoot, 'start', 'routes'), { recursive: true });

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`routes/${name}.txt`),
    );
    template.overwrite = true;

    template.commit();
    sink.logger.action('create').succeeded(outPath);
  }
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
  const entity = 'config';
  const names = templateNames(entity);
  const targetDirectory = app.directoriesMap.get('config') || 'config';

  for (const name of names) {
    const outPath = join(targetDirectory, `${name}.ts`);
    const template = new sink.files.MustacheFile(
      projectRoot,
      outPath,
      getStub(`${entity}/${name}.txt`),
    );
    template.overwrite = true;

    template.apply(state).commit();
    sink.logger.action('create').succeeded(outPath);
  }
}

function removeUsersMigration(app: ApplicationContract, sink: typeof sinkStatic) {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database';

  const file = migrationFile(app, 'users');

  if (file === null) {
    sink.logger.log('no existing users migration');
    return;
  }
  const migrationPath = join(migrationsDirectory, file);
  fs.rmSync(migrationPath);
  sink.logger.action('delete').succeeded(migrationPath);
  // fs.existsSync())
}

// -------------------
// utilities
// -------------------

function migrationFile(app: ApplicationContract, migrationName: string): string | null {
  const migrationsDirectory = app.directoriesMap.get('migrations') || 'database';

  const files = fs
    .readdirSync(migrationsDirectory)
    .filter((file) => file.endsWith(`_${migrationName}.ts`));
  if (files.length == 0) return null;
  return files[0];
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
