const devBuild = process.env.NODE_ENV === 'development';

const Metalsmith = require('metalsmith'),
  layouts = require('metalsmith-layouts'),
  markdown = require('metalsmith-markdown'),
  sass= require('metalsmith-sass'),
  rewrite = require('metalsmith-rewrite'),
  autoprefixer = require('metalsmith-autoprefixer'),
  pkg = require('./package.json'),
  contents = require('./contents/'),
  config = require('./config/metalsmith');

console.log(`${devBuild ? 'Development' : 'Production'} build, version ${pkg.version}`);

Metalsmith(__dirname)
  .metadata(Object.assign({}, contents, {version: pkg.version}))
  .source(config.sourceDir)
  .destination(config.destinationDir)
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: 'pug',
    directory: config.templateDir
  }))
  .use(sass({
    outputDir: config.cssOutputDir,
    outputStyle: devBuild ? 'expanded' : 'compressed',
    sourceMap: devBuild,
    sourceMapContents: devBuild,
    sourceMapEmbed: devBuild,
    includePaths: ['node_modules']
  }))
  .use(autoprefixer())
  .use(rewrite({
    pattern: `**/*.css`,
    filename: `{path.dir}/{path.name}__${pkg.version}.css`
  }))
  .build(function (err) {
    if (err) throw err;
  });