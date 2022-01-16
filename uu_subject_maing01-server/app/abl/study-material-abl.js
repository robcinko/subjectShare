"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/study-material-error.js");

const WARNINGS = {
  getUnsupportedKeys: {
    code: `${Errors.GetStudyMaterial.UC_CODE}unsupportedKeys`,
  },
};

class StudyMaterialAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("studyMaterial");
  }
    async get(awid, dtoIn) {
      let validationResult = this.validator.validate("getStudyMaterialDtoInType", dtoIn);
      let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        WARNINGS.getUnsupportedKeys.code,
        Errors.GetStudyMaterial.InvalidDtoIn
      );
  
      let studyMaterial = await this.dao.get(awid, dtoIn.id);
      if (!studyMaterial) {
        throw new Errors.Get.studyMaterialDoesNotExist(uuAppErrorMap, { studyMaterialId: DtoIn.id });
      }
  
      studyMaterial.uuAppErrorMap = uuAppErrorMap;
      return studyMaterial;
    
    }
  

}

module.exports = new StudyMaterialAbl();
