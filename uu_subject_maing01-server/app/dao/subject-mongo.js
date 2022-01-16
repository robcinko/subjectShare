"use strict";

const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class SubjectMongo extends UuObjectDao {
  async createSchema() {
  }

  async create(subject) {
    
    return await super.insertOne(subject);
  }

  async update(awid, id, updateData) {
    
   return await super.findOneAndUpdate({awid, id}, updateData, "NONE");
 }

 async delete(awid, id) {
    
   return await super.deleteOne({awid, id});
 }

 async list(awid, sortBy, order, pageInfo) {

  return await super.find({ awid });
}

async get(awid, id) {
  return await super.findOne({ id, awid });
}


async getStudyMaterials(awid, id) {
  let filter = {
    awid: awid,
    
  };
  return await super.findOne(filter);
}

async updateStudyMaterials(awid, id, updateData) {
    
  return await super.findOneAndUpdate({awid, id}, updateData, "NONE");
}

}



module.exports = SubjectMongo;
