//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useState, useDataList, useDataObject } from "uu5g04-hooks";
import Uu5Tiles from "uu5tilesg02";
import Config from "./config/config";

import StudyProgramDetail from "./study-program-detail";
import Data from "../bricks/data";
import Calls from "../calls";
import SubjectUpdateForm from "./subject-update";

//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "SubjectList",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const SubjectList = Data(
  createVisualComponent({
    ...STATICS,

    //@@viewOn:propTypes
    propTypes: {},
    //@@viewOff:propTypes

    //@@viewOn:defaultProps
    defaultProps: {},
    //@@viewOff:defaultProps

    render(props) {
      //@@viewOn:private
      const [selectedSubject, setSelectedSubject] = useState(null);
      const [subjectToDelete, setSubjectToDelete] = useState(null);

      const subjectData = useDataList({
        handlerMap: {
          load: Calls.subjectList,
          createItem: Calls.subjectCreate,
        },
        itemHandlerMap: {
          update: Calls.subjectUpdate,
          delete: Calls.subjectDelete,
        },
        initialDtoIn: {},
      });

      const auth = useDataObject({
        handlerMap: {
          load: Calls.subjectList,
          
        }
      });

      const studyPrograms = [];
      if (props.data) {
        props.data.forEach((studyProgram) => {
          studyPrograms.push({
            value: studyProgram.data.id,
            content: studyProgram.data.name,
          });
        });
      }
    
      //@@viewOff:private

      //@@viewOn:interface
      function handleCreateSubject(subjectData) {
        return subjectData.handlerMap.createItem(subjectData);
      }

      function handleUpdateSubject(newSubjectData) {
        return selectedSubject.handlerMap.update(newSubjectData);
      }

      async function handleDeleteSubject() {
        await subjectToDelete.handlerMap.delete({ id: subjectToDelete.data.id });
        setSubjectToDelete(null);
      }
      //@@viewOff:interface
      //@@viewOn:render
      const className = Config.Css.css``;
      const attrs = UU5.Common.VisualComponent.getAttrs(props, className);
      const currentNestingLevel = UU5.Utils.NestingLevel.getNestingLevel(props, STATICS);
      
      //authoriazation check
      const array = auth.data?.authorizedProfileList||[]
      let isLogedInA = array.includes('Authorities');
      
      

      function getColumns() {
      
        return [
          {
            header: "Názov predmetu",
            style : "fontWeight: bold; fontSize: 20px",
            sorterKey: "name",
            cell: (cellProps) => cellProps.data.data.name,
            
            
          },
          {
            header: "Štúdijný program",
            style : "fontWeight: bold;",
            cell: (cellProps) => {
              let studyProgramArray = [];
              cellProps.data.data.studyProgramList.map((studyProgram) => {
                studyProgramArray.push(
                  <div key={studyProgram}>
                    <StudyProgramDetail studyProgramId={studyProgram} nestingLevel={"inline"} />
                    <br />
                  </div>
                );
              });
              return <>{studyProgramArray}</>;
            },
          },
          {
            header: "Popis",
            sorterKey: "courseGoal",
            cell: (cellProps) => cellProps.data.data.courseGoal,
          },
          {
            cell: (cellProps) => {
              if (cellProps.data.state.includes("pending")) {
                return <UU5.Bricks.Loading />;
              } else {
                return (
                  <>
                    <UU5.Bricks.Button
                    colorSchema="blue-rich"
                    style = "margin-right: 10px; margin-left: 100px;"
                      onClick={() => {
                        UU5.Environment.getRouter().setRoute("subjectDetail", { id: cellProps.data.data.id });
                      }}
                    >
                      <UU5.Bricks.Icon icon="mdi-text-subject" />
                    </UU5.Bricks.Button>

                  {isLogedInA&&(<>
                    <UU5.Bricks.Button colorSchema="green" style = "margin-right: 10px" onClick={() => {
                      setSelectedSubject(cellProps.data)
                      }}>
                      <UU5.Bricks.Icon icon="mdi-file-document-edit" />
                    </UU5.Bricks.Button>
                    
                    <UU5.Bricks.Button colorSchema="red"  onClick={() => setSubjectToDelete(cellProps.data)}>
                      <UU5.Bricks.Icon icon="mdi-delete" />
                    </UU5.Bricks.Button>
                    </> )}
                  </>
                );
              }
            },
          },
        ];
      }

      const Filters = [
        {
          key: "name",
          label: "Nazov",
          filterFn: (item, value) => {
            return item.data.name.toLowerCase().includes(value.toLowerCase());
          },
        },
        {
          key: "studyProgram",
          label: "Štúdijný program",
          filterFn: (item, value) => {
            return item.data.studyProgramList.includes(value[0]);
          },
          component: (
            <UU5.Forms.TagSelect
              name={"studyProgramList"}
              label={"Štúdijný program"}
              availableTags={studyPrograms}
              multiple={false}
              required={true}
              controlled={true}
            />
          ),
          getValueLabel: (value) => {
            let studyObject = studyPrograms.find((findValue) => findValue.value === value[0]);
            return studyObject.content;
          },
        },
      ];

      let Sorters = [
        {
          key: "nameAsc",
          label: { cs: "Názov", en: "Name" },
          sorterFn: (a, b) => {
            return a.data.name.localeCompare(b.data.name);
          },
        },
        {
          key: "nameDsc",
          label: { cs: "Názov", en: "Name" },
          ascending: false,
          sorterFn: (a, b) => {
            return a.data.name.localeCompare(b.data.name);
          },
        },
      ];

      return currentNestingLevel ? (
        <div {...attrs}>
          {selectedSubject && (
            

            
            <UU5.Bricks.Modal
            header="Edit predmetu"
            shown={!!selectedSubject}
            onClose={() => setSelectedSubject(null)}
          >
            <SubjectUpdateForm
              selectedSubject={selectedSubject.data}
              setSelectedSubject={setSelectedSubject}
              handleCreateSubject={handleCreateSubject}
              handleUpdateSubject={handleUpdateSubject}
            />
          </UU5.Bricks.Modal>
          )}
          {subjectToDelete && (
            <UU5.Bricks.Modal header={"Naozaj chcete zmazat zaznam ?"} shown={true} onClose={() => setSubjectToDelete(null)}>
              <div className={"center uu5-common-padding-s"}>
                <UU5.Bricks.Button onClick={() => setSubjectToDelete(null)}>NE</UU5.Bricks.Button>{" "}
                <UU5.Bricks.Button colorSchema={"red"} onClick={handleDeleteSubject}>
                  ANO
                </UU5.Bricks.Button>
              </div>
            </UU5.Bricks.Modal>
          )}
          <UU5.Bricks.Container>
            <Uu5Tiles.ControllerProvider data={subjectData.data || []} filters={Filters} sorters={Sorters}>
              <Uu5Tiles.ActionBar
                searchable={true}
                
              
              />
              <Uu5Tiles.FilterBar />
              <Uu5Tiles.InfoBar sortable={false} />
              <Uu5Tiles.List columns={getColumns()} rowAlignment="center" rowHeight={150} />
            </Uu5Tiles.ControllerProvider>
          </UU5.Bricks.Container>
        </div>
      ) : null;
      //@@viewOff:render
    },
  })
);

export default SubjectList;