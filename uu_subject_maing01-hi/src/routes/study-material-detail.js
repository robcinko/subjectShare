//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyMaterialDetail = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    studyMaterialId: UU5.PropTypes.string,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const studyMaterialData = useDataObject({
      handlerMap: {
        load: Calls.studyMaterialGet,
      },
      initialDtoIn: {
        code: props.studyMaterialId || props.params.id,
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
      if (studyMaterialData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (studyMaterialData.state.includes("error")) {
        result = <UU5.Common.Error errorData={studyMaterialData.errorData} />;
      } else {
        if (currentNestingLevel) {
          result = (
            <Uu5Elements.Block>
              <b>{studyMaterialData.data.filename}</b>
            </Uu5Elements.Block>
          );
        } else {
          result = (
            <UU5.Bricks.Link
            download
            href = {"http://localhost:8080/uu-subject-man/22222222222222222222222222222222/uu-app-binarystore/getBinaryData?code=" + studyMaterialData.data.code}
            content = {studyMaterialData.data.filename}
            />
              
          );
        }
      }
      return result;
    }

    return getResult();
    //@@viewOff:render
  },
});

export default StudyMaterialDetail;
