//@@viewOn:imports
import UU5 from "uu5g04";
import { createVisualComponent, useDataList } from "uu5g04-hooks";
import Config from "./config/config";
import Uu5Tiles from "uu5tilesg02";
import Calls from "calls";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:statics
  displayName: Config.TAG + "StudyProgramCreate",
  nestingLevel: "bigBoxCollection",
  //@@viewOff:statics
};

export const StudyProgramCreate = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const studyProgramDataList = useDataList({
      handlerMap: {
        load: Calls.studyProgramList,
        createItem: Calls.studyProgramCreate,
      },
      itemHandlerMap: {
        delete: Calls.studyProgramDelete,
      }
    });
    
    const _resolveState = () => {
      switch (studyProgramDataList.state) {
        case "pendingNoData":
          return <UU5.Bricks.Loading />;
        case "errorNoData":
          return <UU5.Common.Error />;
        default:
  
          return (
            <div>
              <UU5.Bricks.Section header="Štúdijné programy"></UU5.Bricks.Section>
              <Uu5Tiles.List
                data={studyProgramDataList.data}
                columns={[
                  {
                    key: "name",
                    cell: (cellProps) => cellProps.data.data.name,
                    header: "Meno",
                  },
                  {
                    key: "delete",
                    cell: (cellProps) => (
                      <UU5.Bricks.Button
                        disabled={!cellProps.data.handlerMap.delete}
                        colorSchema="danger"
                        onClick={() => {
                          cellProps.data.handlerMap.delete();
                        }}
                      >
                        <UU5.Bricks.Icon icon="mdi-delete" />
                      </UU5.Bricks.Button>
                    ),
                    header: "Delete",
                  },
                ]}
              />

              <UU5.Bricks.Section header="Nový štúdijný program">
            <UU5.Forms.Form onSave={_saveForm}>
                <UU5.Forms.Text label="Nazov štúdijného programu" name="name" />
                <UU5.Forms.Controls buttonSubmitProps={{ enabled: !studyProgramDataList.handlerMap.createItem }}/>
            </UU5.Forms.Form>
            </UU5.Bricks.Section>
            </div>
          );
          }
    };
    const _saveForm = ({ values }) => {
      studyProgramDataList.handlerMap.createItem(values)
      alert("Štúdijný program sa pridal")
    };
    return <UU5.Bricks.Container>{_resolveState()}</UU5.Bricks.Container>;
  },
  
});


export default StudyProgramCreate;
