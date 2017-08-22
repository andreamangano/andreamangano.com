const path = require('path'),
      yaml = require('yamljs');

module.exports = {
  home: yaml.load(path.join(__dirname, 'pages', 'home.yml')),
  site: yaml.load(path.join(__dirname, 'site.yml'))
};