//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList,useDataObject } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Calls from "../calls";
import Data2 from "../bricks/data2";
import StudyProgramDetail from "./study-program-detail";
import StudyMaterialDetail from "./study-material-detail";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyProgramCreate",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyProgramCreate = Data2(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {


    const studyProgramDataList = useDataObject({
      handlerMap: {
        load: Calls.studyMaterialData,
      },
      initialDtoIn: {
        id: "61e2dc37caf56926e5d8a597"
      },
    });
   
console.log(studyProgramDataList.data)


    



    const _resolveState = () => {
      switch (studyProgramDataList.state) {
        case "pendingNoData":
          return <UU5.Bricks.Loading />;
        case "errorNoData":
          return <UU5.Common.Error />;
        default:
  
          return (
            <ul>

            
      {studyProgramDataList.data.map((id) =>
        <StudyMaterialDetail studyMaterialId={id} nestingLevel={"inline"} />
                  
      )}
    </ul>
            
          );
          }
          
    };
    
    return <UU5.Bricks.Container>{_resolveState()}</UU5.Bricks.Container>;
  },
  
})
)

export default StudyProgramCreate;
