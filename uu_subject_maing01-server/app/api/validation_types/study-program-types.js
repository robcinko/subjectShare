/* eslint-disable */
const createStudyProgramDtoInType = shape({
   name: uu5String(255).isRequired()
 });

 const deleteStudyProgramDtoInType = shape({
  id: id().isRequired(),
});

const getStudyProgramDtoInType = shape({
  id: id().isRequired(),
});