"use strict";

const SubjectMainUseCaseError = require("./subject-main-use-case-error.js");
const STUDY_MATERIAL_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}studyMaterial/`;

const GetStudyMaterial = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyMaterial.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyMaterialNotExist: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyMaterial.UC_CODE}StudyMaterialDoesNotExist`;
      this.message = "Study matrial does not exist";
    }
  },
};

module.exports = {
  GetStudyMaterial
};
