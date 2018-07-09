const Generator = require('yeoman-generator');

const files = require('./files');

module.exports = class extends Generator {
  initializing() {
    this.log('Statik Project Generator');
    this.log('Made with ❤️  by Statik');
    this.log();
  }

  prompting() {
    const done = this.async();

    const prompts = [
      {
        type: 'input',
        name: 'project',
        message: 'What is the name of your project?',
        default: 'statik-project'
      },
      {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
        default: 'A statik project'
      }
    ];

    this.prompt(prompts).then((props) => {
      this.props = props;

      done();
    });
  }

  writing() {
    this.log();
    this.log('🚀  Generating project...');
    this.log();

    const { project, description } = this.props;

    const templates = {
      project,
      description,
      year: new Date().getFullYear()
    };

    files.forEach((file) => {
      this.fs.copyTpl(
        this.templatePath(file.template),
        this.destinationPath(file.destination),
        templates
      );
    });
  }

  install() {
    this.log();
    this.log('📦  Installing dependencies...');
    this.log();

    this.npmInstall(
      [
        'eslint',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'prettier'
      ],
      { 'save-dev': true }
    );
  }

  end() {
    this.log();
    this.log('🎉  Successfully generated!');
  }
};
