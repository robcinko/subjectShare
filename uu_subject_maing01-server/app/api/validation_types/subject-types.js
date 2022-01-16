/* eslint-disable */
const createSubjectDtoInType = shape({
   name: uu5String(255).isRequired(),
   description: uu5String(2000),
   creditLoad: number(),
   supervisor: uu5String(255),
   courseGoal: uu5String(255),
   studyDegree: uu5String(255),
   languageStudy: uu5String(255),
   studyProgramList: array(id()),
   studyMaterials: array(id())
 });

 const updateSubjectDtoInType = shape({
   id: id().isRequired(),
   name: uu5String(255),
   description: uu5String(2000),
   creditLoad: number(),
   supervisor: uu5String(255),
   courseGoal: uu5String(255),
   studyDegree: uu5String(255),
   languageStudy: uu5String(255),
   studyProgramList: array(id()),
   studyMaterials: array(id())
 });

 const deleteSubjectDtoInType = shape({
  id: id().isRequired(),
});

const getSubjectDtoInType = shape({
  id: id().isRequired(),
});

const loadSubjectDtoInType = shape({
  id: id().isRequired(),
});

const deleteSubjectDtoInType = shape({
  id: id().isRequired(),
});

const studyMaterialGetDtoInType = shape({
  id: id().isRequired()
});

const studyMaterialToSubjectDtoInType = shape({
  id: id().isRequired(),
  code: uu5String(255),
  studyMaterials: array(id())
});

const feDataRemoveDtoInType = shape({
  id: id().isRequired(),
  code: uu5String(255),
  studyMaterials: array(id())
});