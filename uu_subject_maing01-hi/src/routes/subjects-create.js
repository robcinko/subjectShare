//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectsCreate",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectsCreate = createVisualComponent({
  
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps


  render(props) {
    const subjectsDataList = useDataList({
      handlerMap: {
        load: Calls.subjectList,
        createItem: Calls.subjectCreate,
      },

    });

    const studyProgramDataList = useDataList({
      handlerMap: {
        load: Calls.studyProgramList,
        
      },
      itemHandlerMap: {
        
      }
    });

    const studyPrograms = [];
    if (studyProgramDataList.data) {
      studyProgramDataList.data.forEach((studyProgram) => {
        studyPrograms.push({
          value: studyProgram.data.id,
          content: studyProgram.data.name,
        });
      });
    }

console.log(studyPrograms)


    const _resolveState = () => {
          return (
            <div>
              <UU5.Bricks.Section header="Pridanie noveho predmetu">
            <UU5.Forms.Form onSave={_saveForm}>
                <UU5.Forms.Text label="Nazov predmetu" name="name" required/>
                <UU5.Forms.TextArea label="Popis predmetu" name="description"/>
                <UU5.Forms.Number label="Kredity" name="creditLoad" required />
                <UU5.Forms.Text label="Supervisor predmetu" name="supervisor" required/>
                <UU5.Forms.TextArea label="Ciel predmetu" name="courseGoal"/>
                <UU5.Forms.TagSelect
              name={"studyDegree"}
              label={"Štúdium"}
              availableTags={[{value: 'Bc.', content: 'Bc.'},{value: 'Ing.', content: 'Ing.'}]}
              multiple={false}
              controlled={true}
              required
            />
                <UU5.Forms.Text label="Jazyk" name="languageStudy" />
              <UU5.Forms.TagSelect
              name={"studyProgramList"}
              label={"Štúdijný program"}
              availableTags={studyPrograms}
              multiple={false}
              controlled={true}
              required
            />
                <UU5.Forms.Controls buttonSubmitProps={{ enabled: !subjectsDataList.handlerMap.createItem }}/>
            </UU5.Forms.Form>
            </UU5.Bricks.Section>
            </div>
            
          );
      
    };
    const _saveForm = ({ values }) => {
      values.studyDegree = values.studyDegree[0]
      subjectsDataList.handlerMap.createItem(values)
    };
    
    return <UU5.Bricks.Container>{_resolveState()}</UU5.Bricks.Container>;
    
  },
  
});

export default SubjectsCreate;

