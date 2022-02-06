"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory, ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-program-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.Create.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.DeleteStudyProgram.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.GetStudyProgram.UC_CODE}unsupportedKeys`,
  },

};

class StudyProgramAbl {

  constructor() {
   
      this.validator = Validator.load();
      this.dao = DaoFactory.getDao("studyProgram") 
    
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("getStudyProgramDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.GetStudyProgram.InvalidDtoIn
    );

    let studyProgram = await this.dao.get(awid, dtoIn.id);
    if (!studyProgram) {
      throw new Errors.Get.studyProgramDoesNotExist(uuAppErrorMap, { studyProgramId: DtoIn.id });
    }

    studyProgram.uuAppErrorMap = uuAppErrorMap;
    return studyProgram;
  
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("deleteStudyProgramDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.DeleteStudyProgram.InvalidDtoIn
    );

    let studyProgram = await this.dao.get(awid, dtoIn.id);
    let uuId = session.getIdentity().getUuIdentity();
    if (
      uuId !== studyProgram.creatorIdentity
    ) {
      throw new Errors.DeleteStudyProgram.UserNotAuthorized({ uuAppErrorMap });
    }

      await this.dao.delete(awid, dtoIn.id);
   
    return{
      uuAppErrorMap

    }
    
  }

  async list(awid, dtoIn, authorizationResult) {
    let result
    let authorizedProfiles = authorizationResult.getAuthorizedProfiles();
    result = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    result.authorizedProfileList = authorizedProfiles;
    return result 
  }

  async load(awid, dtoIn) {
    
  }

  async create(awid, dtoIn, session) {

// HDS 1
let validationResult = this.validator.validate("createStudyProgramDtoInType", dtoIn);
// A1, A2
let uuAppErrorMap = ValidationHelper.processValidationResult(
  dtoIn,
  validationResult,
  WARNINGS.createUnsupportedKeys.code,
  Errors.Create.InvalidDtoIn
);

dtoIn.awid = awid;
dtoIn.creatorName = session.getIdentity().getName()
dtoIn.creatorIdentity = session.getIdentity().getUuIdentity()

let dtoOut;

try{
   await this.dao.create(dtoIn);
}catch(e){
  if (e instanceof ObjectStoreError){
    throw new Errors.Create.studyProgramDaoCreateFailed({uuAppErrorMap}, e)
  }
  throw e;
}

    
 
return{
  
  uuAppErrorMap

}
  }

}

module.exports = new StudyProgramAbl();
