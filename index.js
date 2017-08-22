const devBuild = process.env.NODE_ENV === 'development';

const Metalsmith = require('metalsmith'),
  layouts = require('metalsmith-layouts'),
  markdown = require('metalsmith-markdown'),
  pkg = require('./package.json'),
  config = require('./config/metalsmith');

console.log(`${devBuild ? 'Development' : 'Production'} build, version ${pkg.version}`);

const builder = Metalsmith(__dirname)
  .source(config.sourceDir)
  .destination(config.destinationDir)
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: 'pug',
    directory: config.templateDir
  }))
  .build(function (err) {
    if (err) throw err;
  });