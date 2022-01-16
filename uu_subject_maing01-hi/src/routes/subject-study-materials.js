//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataObject, useDataList, useState } from "uu5g04-hooks";
import Uu5Elements from "uu5g05-elements";
import Config from "./config/config";
import Calls from "../calls";
import StudyProgramDetail from "./study-program-detail";
import StudyMaterialDetail from "./study-material-detail";
import Uu5Tiles from "uu5tilesg02";
import Data2 from "../bricks/data2";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyMaterialDetail",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};


export const SubjectDetail = Data2(
createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const [materialToDelete, setMaterialToDelete] = useState(null);

    //@@viewOn:private
    const subjectData = useDataObject({
      handlerMap: {
        load: Calls.subjectDetail,
      },
      itemHandlerMap: {
        delete: Calls.studyMaterialDelete,
      },
      initialDtoIn: {
        id: props.params.id,
        
      },
    });


    const studyMaterialDataList = useDataObject({
      handlerMap: {
        load: Calls.studyMaterialData,
      },
      itemHandlerMap: {
        delete: Calls.feDataRemove,
      },
      initialDtoIn: {
        id: props.params.id,
      },
    });
    
    async function handleDeleteMaterial() {
      await Calls.feDataRemove({id:subjectData.data.id, code: materialToDelete });
      await Calls.studyMaterialDelete({code: materialToDelete})
      setMaterialToDelete(null);
      window.location.reload(false);
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);


   
    const _resolveState = () => {
      switch (studyMaterialDataList.state) {
        case "pendingNoData":
          return <UU5.Bricks.Loading />;
        case "errorNoData":
          return <h2>
          <UU5.Bricks.Label colorSchema='blue' content='Zatiaľ žiadne súbory'/>
        </h2>
        default:
  
          return (
            
            <ul>   
      
      {studyMaterialDataList.data.map((id) =>
      <ul>
        <hr></hr>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gridGap: 20 }}>
          
        <div>
          
        <div style={{ paddingLeft: "50px"}}>  
        <li>
        <StudyMaterialDetail studyMaterialId={id} nestingLevel={"inline"}   />
        </li>
        </div>
        </div>

        <div >
        <UU5.Bricks.Button
                    colorSchema="danger"
                    style = "margin-right: 10px; margin-left: 100px;"
                      onClick={() => {
                        setMaterialToDelete(id)
                        console.log(id)
                      }}
                    >DELETE</UU5.Bricks.Button>
        </div>
        </div>
        <hr></hr>
        </ul>
      )}
    </ul>
            
          );
          }
          
    };

    function getResult() {
      
      let result;          
                  
      if (subjectData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (subjectData.state.includes("error")) {
        result = <UU5.Common.Error errorData={subjectData.errorData} />;
      } else {
        result = (

      
<UU5.Bricks.Jumbotron>
  <UU5.Bricks.Header level="5" className="center" content={"Štúdijne materialy pre predmet " + subjectData.data.name}/>  
  <UU5.Bricks.Button
                    colorSchema="info"
                    style = "margin-right: 10px; margin-left: 100px;"
                      onClick={() => {
                        UU5.Environment.getRouter().setRoute("subjectDetail", { id: subjectData.data.id });
                      }}
                    > Späť</UU5.Bricks.Button>

  <_resolveState></_resolveState>
</UU5.Bricks.Jumbotron>


      //@@viewOff:render
    )
      }
      return result;
      
    }

    return currentNestingLevel ? (
      <div {...attrs } >{getResult()}
        
        {materialToDelete && (
          <UU5.Bricks.Modal header={"Naozaj chcete zmazat zaznam ?"} shown={true} onClose={() => setMaterialToDelete(null)}>
            <div className={"center uu5-common-padding-s"}>
              <UU5.Bricks.Button onClick={() => setMaterialToDelete(null)}>NE</UU5.Bricks.Button>{" "}
              <UU5.Bricks.Button colorSchema={"red"} onClick={handleDeleteMaterial}>
                ANO
              </UU5.Bricks.Button>
            </div>
          </UU5.Bricks.Modal>
        )}
        
      </div>
      
    ) : null;
    //@@viewOff:render
  },
})
);


export default SubjectDetail;
