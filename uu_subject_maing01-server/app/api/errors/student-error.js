"use strict";

const SubjectMainUseCaseError = require("./subject-main-use-case-error.js");
const STUDENT_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}student/`;

const CreateStudent = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}createStudent/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateStudent.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

module.exports = {
  CreateStudent
};
