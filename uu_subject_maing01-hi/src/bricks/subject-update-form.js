//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Data from "./data";
import Calls from "calls"

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectUpdateForm",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};
const subjectData = useDataObject({
  handlerMap: {
    load: Calls.subjectDetail,
  },
  initialDtoIn: {
    id: props.params.id,
  },
});
export const SubjectUpdateForm = Data(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {
      selectedSubject: UU5.PropTypes.object,
      setSelectedSubject: UU5.PropTypes.func,
      handleCreateBook: UU5.PropTypes.func,
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

      async function handleOnSave(opt) {
        opt.component.setPending();
        try {
          if (props.selectedSubject?.id) await props.handleUpdateBook({ id: props.selectedSubject.id, ...opt.values });
          else await props.handleCreateBook(opt.values);
          opt.component.setReady();
          props.setselectedSubject(null);
        } catch {
          opt.component.getAlertBus().setAlert({
            content: <UU5.Bricks.Lsi lsi={Lsi.unsuccessful} />,
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
      console.log(subjectData.data.name)
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
              label={"Nazov"}
              value={subjectData.data.name?.name || ""}
              controlled={true}
            />
            <UU5.Forms.TagSelect
              label={"Štúdijný program"}
              name={"studyProgramList"}
              value={props.selectedSubject?.studyProgramList || []}
              availableTags={studyPrograms}
              multiple
              required={true}
              controlled={true}
            />
            <UU5.Bricks.Line size={"s"} />
            <UU5.Forms.Controls />
          </UU5.Forms.Form>
        </div>
      ) : null;
      //@@viewOff:render
    },
  })
);

export default SubjectUpdateForm;
