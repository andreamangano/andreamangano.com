const Metalsmith = require('metalsmith'),
  layouts = require('metalsmith-layouts'),
  markdown = require('metalsmith-markdown');

const builder = Metalsmith(__dirname)
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(markdown())
  .use(layouts({
    engine: 'pug',
    directory: './templates'
  }))
  .build(function (err) {
    if (err) throw err;
  });