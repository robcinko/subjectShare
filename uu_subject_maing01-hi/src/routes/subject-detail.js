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
    const [response, setResponse] = useState(null);

    //@@viewOn:private
    const subjectData = useDataObject({
      handlerMap: {
        load: Calls.subjectDetail,
        studyMaterial: Calls.studyMaterialToSubject
      },
      initialDtoIn: {
        id: props.params.id,
      },
    });


    const studyMaterialDataList = useDataObject({
      handlerMap: {
        
        load: Calls.studyMaterialData,
        createBinary: Calls.studyMaterialCreate,
  
      },
      initialDtoIn: {
        id: props.params.id,
      },
    });
    

    const studyMaterialsList = [];
      if (props.data) {
        props.data.forEach((studyMaterial) => {
          studyMaterialsList.push({
            code: studyMaterial.data.code,
            filename: studyMaterial.data.filename,
          });
        });
      }
    
  
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const className = Config.Css.css``;
    const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
    const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);

   
    const _saveForm = ({ values }) => {
      studyMaterialDataList.handlerMap.createBinary(values).then((response)=>
      Calls.studyMaterialToSubject({"id":subjectData.data.id, "code":response.code}),
      alert("Material sa pridal")
      )
      
    };

    function getResult() {
      
      let result;          
                  
      if (subjectData.state.includes("pending")) {
        result = <UU5.Bricks.Loading />;
      } else if (subjectData.state.includes("error")) {
        result = <UU5.Common.Error errorData={subjectData.errorData} />;
      } else {
        result = (
          <UU5.Bricks.Card  display="flex">
        <UU5.Bricks.Header className="center" content={subjectData.data.name} level="3" underline={true}></UU5.Bricks.Header>
        <UU5.Bricks.Column width="100%">
          <UU5.Bricks.Text className="uu5-common-font-size-m" className="center" style="paddingTop: 20px" content={subjectData.data.courseGoal} />
        </UU5.Bricks.Column>
        <UU5.Bricks.Column className="center" width="20%">
          <UU5.Bricks.Header level="5" content={subjectData.data.studyDegree} />
          <UU5.Bricks.Text className="uu5-common-font-size-xs" content="Stupen Studia"/>
        </UU5.Bricks.Column>
        <UU5.Bricks.Column className="center" width="20%">
          <UU5.Bricks.Header level="5" content={subjectData.data.creditLoad} />
          <UU5.Bricks.Text className="uu5-common-font-size-xs" content="Pocet kreditů"/>
        </UU5.Bricks.Column>
        <UU5.Bricks.Column className="center" width="20%">
          <UU5.Bricks.Header level="5" content={subjectData.data.languageStudy} />
          <UU5.Bricks.Text className="uu5-common-font-size-xs" content="Jazyk výuky" />
        </UU5.Bricks.Column>
        <UU5.Bricks.Column className="center" width="20%">
          <UU5.Bricks.Header level="5" content={<StudyProgramDetail studyProgramId={subjectData.data.studyProgramList} nestingLevel={"inline"} />} />
          <UU5.Bricks.Text className="uu5-common-font-size-xs" content="Štúdijný program" />
        </UU5.Bricks.Column>
        <UU5.Bricks.Column className="center" width="20%" style="paddingBottom: 40px">
          <UU5.Bricks.Header level="5" content={subjectData.data.supervisor} />
          <UU5.Bricks.Icon icon="uu5-person" />
        </UU5.Bricks.Column>
        
        <UU5.Bricks.Header level="5" className="center" content="Popis predmetu"/>
          <UU5.Bricks.Text width="80%"  header="Detail předmětu" className="center" content={subjectData.data.description} />
          
          
          <UU5.Bricks.Jumbotron>
          <UU5.Bricks.Header level="5" className="center" content="Štúdijne materialy"/>

          <UU5.Forms.Form onSave={_saveForm}>
            <UU5.Forms.File
              label="Uploaduj štúdijný materiál"
              placeholder="Upload"
              name="data"
              />
              <UU5.Forms.Controls buttonSubmitProps={{ enabled: !subjectData.handlerMap.createItem }}/>
          
          
          </UU5.Forms.Form>

                  <UU5.Bricks.Button
                    colorSchema="blue-rich"
                    style = "margin-right: 10px; margin-left: 100px;"
                      onClick={() => {
                        UU5.Environment.getRouter().setRoute("subjectStudyMaterials", { id: subjectData.data.id });
                      }}
                    >Zobraziť štúdijné materiály</UU5.Bricks.Button>

          </UU5.Bricks.Jumbotron>
      </UU5.Bricks.Card>



      //@@viewOff:render
    )
      }
      return result;
      
    }

    return currentNestingLevel ? <div {...attrs}>{getResult()}</div> : null;
    //@@viewOff:render
  },
})
);


export default SubjectDetail;
