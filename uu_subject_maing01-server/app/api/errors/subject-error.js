"use strict";

const SubjectMainUseCaseError = require("./subject-main-use-case-error.js");
const CREATE_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}createSubject/`;
const UPDATE_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}updateSubject/`;
const LOAD_ERROR_PREFIX = `${SubjectMainUseCaseError.ERROR_PREFIX}loadSubject/`;

const CreateSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}createSubject/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  StudyProgramDoesNotExist: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${CreateSubject.UC_CODE}categoryDoesNotExist`;
      this.message = "StudyProgramDoesNotExist";
    }
  },
  
};

const UpdateSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}updateSubject/`,

  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SubjectDaoUpdateFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${UpdateSubject.UC_CODE}subjectDaoCreateFailed`;
      this.message = "Subject update failed.";
    }
  },
  SubjectNotExist: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSubject.UC_CODE}subjectNotExist`;
      this.message = "Subject does not exist";
    }
  },
  
};

const DeleteSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}deleteSubject/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectDaoDeleteFailed: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSubject.UC_CODE}subjectDaoDeleteFailed`;
      this.message = "Subject delete failed.";
    }
  },
  UserNotAuthorized: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${DeleteSubject.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
};



const GetSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}get/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  SubjectNotExist: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetSubject.UC_CODE}subjectNotExist`;
      this.message = "Subject does not exist";
    }
  },
  UserNotAuthorized: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${GetSubject.UC_CODE}userNotAuthorized`;
      this.message = "User not authorized.";
    }
  },
  
};

const LoadSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}load/`,
  InvalidDtoIn: class extends SubjectMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${LoadSubject.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};



const GetStudyMaterial = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}studyMaterialGet/`,
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
      this.code = `${GetStudyMaterial.UC_CODE}studyMaterialNotExist`;
      this.message = "StudyMaterial does not exist";
    }
  },
  
};

const StudyMaterialToSubject = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}studyMaterialToSubject/`,
  
};

const FeDataRemove = {
  UC_CODE: `${SubjectMainUseCaseError.ERROR_PREFIX}feDataRemove/`,
  
};

module.exports = {
  FeDataRemove,
  StudyMaterialToSubject,
  GetStudyMaterial,
  LoadSubject,
  GetSubject,
  DeleteSubject,
  CreateSubject,
  UpdateSubject
};


