"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/subject-error.js");

const WARNINGS = {
  createUnsupportedKeys: {
    code: `${Errors.CreateSubject.UC_CODE}unsupportedKeys`,
  },
  updateUnsupportedKeys: {
    code: `${Errors.UpdateSubject.UC_CODE}unsupportedKeys`,
  },
  deleteUnsupportedKeys: {
    code: `${Errors.DeleteSubject.UC_CODE}unsupportedKeys`,
  },
  getUnsupportedKeys: {
    code: `${Errors.GetSubject.UC_CODE}unsupportedKeys`,
  },
  loadUnsupportedKeys: {
    code: `${Errors.LoadSubject.UC_CODE}unsupportedKeys`,
  },
  loadUnsupportedKeys: {
    code: `${Errors.GetStudyMaterial.UC_CODE}unsupportedKeys`,
  },

};

class SubjectAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("subject");
    this.studyProgramDao = DaoFactory.getDao("studyProgram") 
  }

  async feDataRemove(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("feDataRemoveDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.UpdateSubject.InvalidDtoIn
    );
    let subject = await this.dao.get(awid, dtoIn.id);
    let subjectStudyMaterials = subject.studyMaterials
    subjectStudyMaterials = subjectStudyMaterials.filter(item => item !== dtoIn.code)
    let payload = {"studyMaterials":subjectStudyMaterials  }
    await this.dao.update(awid, dtoIn.id, payload);
    

  }

  async studyMaterialToSubject(awid, dtoIn) {
    // HDS 1
    let validationResult = this.validator.validate("studyMaterialToSubjectDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.updateUnsupportedKeys.code,
      Errors.UpdateSubject.InvalidDtoIn
    );
    let subject = await this.dao.get(awid, dtoIn.id);
    let subjectStudyMaterials = subject.studyMaterials
    subjectStudyMaterials.push(dtoIn.code)
    let payload = {"studyMaterials":subjectStudyMaterials  }
    await this.dao.update(awid, dtoIn.id, payload);
    

  }

  async studyMaterialGet(awid, dtoIn) {
    let validationResult = this.validator.validate("studyMaterialGetDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.GetStudyMaterial.InvalidDtoIn
    );

    let studyMaterial = await this.dao.get(awid, dtoIn.id);
    let result = studyMaterial.studyMaterials
    

    if (!result) {
      throw new Errors.Get.studyMaterialGetDoesNotExist(uuAppErrorMap, { studyMaterialId: dtoIn.id });
 
    }

    result.uuAppErrorMap = uuAppErrorMap;
    return result;
  }



  async load(awid, dtoIn) {
    let validationResult = this.validator.validate("loadSubjectDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.loadUnsupportedKeys.code,
      Errors.LoadSubject.InvalidDtoIn
    );
    let subject = await this.dao.get(awid, dtoIn.id);
    if(!subject){
      throw new Errors.GetSubject.SubjectNotExist({uuAppErrorMap}, {id:dtoIn.id});
     }

     subject.studyProgramList = (await this.studyProgramDao.listByIdList(awid,subject.studyProgramList)).itemList;
     console.log(subject.studyProgramList)
    return subject
  }

  async get(awid, dtoIn) {
    let validationResult = this.validator.validate("getSubjectDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.getUnsupportedKeys.code,
      Errors.GetSubject.InvalidDtoIn
    );

    let subject = await this.dao.get(awid, dtoIn.id);
    if (!subject) {
      throw new Errors.Get.SubjectDoesNotExist(uuAppErrorMap, { subjectId: dtoIn.id });
    }

    subject.uuAppErrorMap = uuAppErrorMap;
    return subject;
  }

  async list(awid, dtoIn) {
    let result
    result = await this.dao.list(awid, dtoIn.sortBy, dtoIn.order, dtoIn.pageInfo);
    return result 
 
  }

  async delete(awid, dtoIn, session, authorizationResult) {
    let validationResult = this.validator.validate("deleteSubjectDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.deleteUnsupportedKeys.code,
      Errors.DeleteSubject.InvalidDtoIn
    );

    let subject = await this.dao.get(awid, dtoIn.id);
    let uuId = session.getIdentity().getUuIdentity();
    if (
      uuId !== subject.creatorIdentity
    ) {
      throw new Errors.DeleteSubject.UserNotAuthorized({ uuAppErrorMap });
    }

      await this.dao.delete(awid, dtoIn.id);
  
   
    return{
      uuAppErrorMap

    }
  }
  

  async update(awid, dtoIn) {
     // HDS 1
     let validationResult = this.validator.validate("updateSubjectDtoInType", dtoIn);
     // A1, A2
     let uuAppErrorMap = ValidationHelper.processValidationResult(
       dtoIn,
       validationResult,
       WARNINGS.updateUnsupportedKeys.code,
       Errors.UpdateSubject.InvalidDtoIn
     );
     let subject = await this.dao.get(awid, dtoIn.id);
     if(!subject){
      throw new Errors.UpdateSubject.SubjectNotExist({uuAppErrorMap}, {id:dtoIn.id});
     }
     let dtoOut;
    

     try{
       dtoOut = await this.dao.update(awid, dtoIn.id, dtoIn);
     }catch(e){
       if (e instanceof ObjectStoreError){
         throw new Errors.UpdateSubject.SubjectDaoUpdateFailed({uuAppErrorMap}, e)
       }
       throw e;
     }
     
     dtoOut.uuAppErrorMap = uuAppErrorMap;
     return dtoOut;
 
     
   }
  

  async create(awid, dtoIn, session) {
    // HDS 1
    let validationResult = this.validator.validate("createSubjectDtoInType", dtoIn);
    // A1, A2
    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      WARNINGS.createUnsupportedKeys.code,
      Errors.CreateSubject.InvalidDtoIn
    );

    if (! ("studyProgramList" in dtoIn)) dtoIn.studyProgramList  = [];

    let existingStudyProgramList = (await this.studyProgramDao.listByIdList(awid,dtoIn.studyProgramList)).itemList;
    existingStudyProgramList = existingStudyProgramList.map((studyProgram)=>studyProgram.id)
    if (existingStudyProgramList.length !== dtoIn.studyProgramList.length){
      const missingStudyProgramList = [];
      dtoIn.studyProgramList.forEach((id) => {
        if(existingStudyProgramList.find((existingStudyProgramId) => existingStudyProgramId.toString() === id)){
          missingStudyProgramList.push(id);
        }
      })
      throw new Errors.Create.StudyProgramDoesNotExist({uuAppErrorMap}, e)
    }



    dtoIn.awid = awid;
    dtoIn.creatorName = session.getIdentity().getName()
    dtoIn.creatorIdentity = session.getIdentity().getUuIdentity()
    dtoIn.studyMaterials = []

    let dtoOut;
    
    if(dtoIn.code){
      let subject = this.dao.getByCode(awid, dtoIn.code)
      if(subject) throw SubjectAlreadyExist
    }

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

module.exports = new SubjectAbl();
