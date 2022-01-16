//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config";
import Calls from "../calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyProgramDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyProgramDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    studyProgramId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const studyProgramData = useDataObject({
      handlerMap: {
        load: Calls.studyProgramGet,
      },
      initialDtoIn: {
        id: props.studyProgramId.toString() || props.params.id,
      },
    });
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

    function getResult() {
      let result;
      if (studyProgramData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (studyProgramData.state.includes("error")) {
        result = <UU5.Common.Error errorData={studyProgramData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <Uu5Elements.Block>
              <b>{studyProgramData.data.name}</b>
            </Uu5Elements.Block>
          );
        } else {
          result = (
            <UU5.Bricks.Link
              
            >
              {studyProgramData.data.name}
            </UU5.Bricks.Link>
          );
        }
      }
      return result;
    }

    return getResult();
    //@@viewOff:render
  },
});

export default StudyProgramDetail;
