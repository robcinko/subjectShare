//@@viewOn:imports
import UU5 from "uu5g04";
import { createComponent, useDataList } from "uu5g04-hooks";
import Calls from "calls";
//@@viewOff:imports

function withDataList(Component, displayName) {
  return createComponent({
    //@@viewOn:statics
    displayName,
    //@@viewOff:statics

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    //@@viewOn:render
    render(props) {
      const studyProgramListData = useDataList({
        handlerMap: {
          load: Calls.studyProgramList,
        },
        initialDtoIn: {},
      });

      let result;

      switch (studyProgramListData.state) {
        case "pendingNoData":
        case "pending":
          result = <UU5.Bricks.Loading />;
          break;
        case "readyNoData":
        case "ready":
          result = <Component {...props} data={studyProgramListData.data} />;
          break;
        case "errorNoData":
        case "error":
          result = <UU5.Bricks.Error data={studyProgramListData.error} />;
      }

      return result;
    },
  });
  //@@viewOff:render
}

export default withDataList;
