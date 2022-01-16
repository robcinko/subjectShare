//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent } from "uu5g04-hooks";
import Config from "./config/config";
import withDataList from "../bricks/data";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectUpdateForm = withDataList(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      selectedSubject: UU5.PropTypes.object,
      setSelectedSubject: UU5.PropTypes.func,
      handleCreateSubject: UU5.PropTypes.func,
      handleUpdateSubject: UU5.PropTypes.func,
    },
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const studyPrograms = [];
      if (props.data) {
        props.data.forEach((studyProgram) => {
          studyPrograms.push({
            value: studyProgram.data.id,
            content: studyProgram.data.name,
          });
        });
      }
      console.log(props.selectedSubject)

      async function handleOnSave(opt) {
        
        opt.component.setPending();
        try {
          if (props.selectedSubject?.id) await props.handleUpdateSubject({ id: props.selectedSubject.id, ...opt.values });
          else await props.handleCreateSubject(opt.values);
          opt.component.setReady();
          props.setSelectedSubject(null);
        } catch {
          opt.component.getAlertBus().setAlert({
            content: "AJAJ",
            colorSchema: "red",
          });
          opt.component.setReady();
        }
      }
      //@@viewOff:private

      //@@viewOn:interface
      //@@viewOff:interface

      //@@viewOn:render
      const className = Config.Css.css``;
      const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
      const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

      return currentNestingLevel ? (
        <div {...attrs}>
          <UU5.Forms.Form
            labelColWidth={"xs-12 s-12 m-4 l-3 xl-3"}
            valueColWidth={"xs-12 s-12 m-8 l-7 xl-7"}
            onSave={handleOnSave}
            onCancel={() => props.setSelectedSubject(null)}
            controlled={true}
          >
            <UU5.Forms.Text
              name={"name"}
              required={true}
              label={"Nazov predmetu"}
              value={props.selectedSubject.name}
              controlled={true}
            />

            <UU5.Forms.TextArea 
            label="Popis predmetu" 
            name="description"
            controlled={true}
            value={props.selectedSubject.description}
             />
            <UU5.Forms.Number 
            label="Kredity" 
            name="creditLoad"
            controlled={true}
            value={props.selectedSubject.creditLoad}
             />
             <UU5.Forms.TextArea 
             label="Ciel predmetu" 
             name="courseGoal" 
             controlled={true}
             value={props.selectedSubject.courseGoal}
             />
             <UU5.Forms.Text 
             label="Studium" 
             name="studyDegree"
             controlled={true}
             value={props.selectedSubject.studyDegree} 
             />
             <UU5.Forms.Text 
             label="Jazyk" 
             name="languageStudy" 
             controlled={true}
             value={props.selectedSubject.languageStudy} 
             />

            <UU5.Forms.TagSelect
              name={"studyProgramList"}
              label={"Štúdijný program"}
              value={props.selectedSubject.studyProgramList || []}
              availableTags={studyPrograms}
              multiple
              controlled={true}
            />
            
            <UU5.Bricks.Line size={"l"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </div>
      ) : null;
      //@@viewOff:render
    },
  })
);

export default SubjectUpdateForm;
