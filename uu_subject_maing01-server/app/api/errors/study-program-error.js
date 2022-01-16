"use strict";

const SubjectMainUseCaseError = require("./subject-main-use-case-error.js");
const STUDY_PROGRAM_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}studyProgram/`;

const Create = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}createStudyProgram/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};
  

const Load = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}load/`,
  
};

const List = {
  UC_CODE: `${STUDY_PROGRAM_ERROR_PREFIX}list/`,
  
};

const DeleteStudyProgram = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}deleteStudyProgram/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoDeleteFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}studyProgramDaoDeleteFailed`;
      this.message = "DeleteStudyProgram delete failed.";
    }
  },
  UserNotAuthorized: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteStudyProgram.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  
};

const GetStudyProgram = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyProgram.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgramNotExist: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetStudyProgram.UC_CODE}studyProgramNotExist`;
      this.message = "Study Program does not exist";
    }
  },
  
};

module.exports = {
  GetStudyProgram,
  DeleteStudyProgram,
  List,
  Load,
  Create
};
