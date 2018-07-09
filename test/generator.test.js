const assert = require('yeoman-assert');
const path = require('path');
const test = require('yeoman-test');

const files = require('../generators/app/files');

describe('Generator Tests', () => {
  beforeAll((done) => {
    test
      .run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        project: 'statik-project',
        description: 'A statik project'
      })
      .on('end', done);
  });

  it('should create a project', (done) => {
    files.forEach((file) => {
      assert.file(file.destination);
    });

    done();
  });
});
