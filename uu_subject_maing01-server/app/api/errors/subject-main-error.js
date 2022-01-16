"use strict";
const SubjectMainUseCaseError = require("./subject-main-use-case-error.js");

const Init = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}init/`,

  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SchemaDaoCreateSchemaFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.status = 500;
      this.code = `${Init.UC_CODE}schemaDaoCreateSchemaFailed`;
      this.message = "Create schema by Dao createSchema failed.";
    }
  },

  SetProfileFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}sys/setProfileFailed`;
      this.message = "Set profile failed.";
    }
  },

  CreateAwscFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Init.UC_CODE}createAwscFailed`;
      this.message = "Create uuAwsc failed.";
    }
  },
};

const SayHello = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}sayHello/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${SayHello.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

module.exports = {
  SayHello,
  Init,
};
