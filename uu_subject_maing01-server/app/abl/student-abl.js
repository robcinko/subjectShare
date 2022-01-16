"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/student-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.CreateStudent.UC_CODE}unsupportedKeys`,
  },
};

class StudentAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("student");
  }

  async create(awid, dtoIn) {

// HDS 1
let validationResult = this.validator.validate("createStudentDtoInType", dtoIn);
// A1, A2
let uuAppErrorMap = ValidationHelper.processValidationResult(
  dtoIn,
  validationResult,
  WARNINGS.createUnsupportedKeys.code,
  Errors.CreateStudent.InvalidDtoIn
);

dtoIn.awid = awid;

let dtoOut;

try{
  dtoOut = await this.dao.create(dtoIn);
}catch(e){
  if (e instanceof ObjectStoreError){
    throw new Errors.Create.SubjectDaoCreateFailed({uuAppErrorMap}, e)
  }
  throw e;
}
dtoOut.uuAppErrorMap = uuAppErrorMap;
return{
  
  dtoOut,

}
  }

}

module.exports = new StudentAbl();
