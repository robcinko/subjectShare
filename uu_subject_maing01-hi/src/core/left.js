//@@viewOn:imports
import UU5 from "uu5g04";
import "uu5g04-bricks";
import { createVisualComponent, useDataObject } from "uu5g04-hooks";
import Plus4U5 from "uu_plus4u5g01";
import "uu_plus4u5g01-app";
import Calls from "calls"

import Config from "./config/config.js";
import Lsi from "../config/lsi.js";
//@@viewOff:imports

const STATICS = {
  //@@viewOn:static
  displayName: Config.TAG + "Left",
  //@@viewOff:static
};


export const Left = createVisualComponent({
  ...STATICS,
  


  //@@viewOn:propTypes
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  //@@viewOff:defaultProps

  render(props) {
    const auth = useDataObject({
      handlerMap: {
        load: Calls.subjectList,
        
      }
    });
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Plus4U5.App.Left
        {...props}
        logoProps={{
          backgroundColor: UU5.Environment.colors.blue.c700,
          backgroundColorTo: UU5.Environment.colors.blue.c500,
          title: "uuSubject",
          companyLogo: Plus4U5.Environment.basePath + "assets/img/unicorn-logo.svg",
          generation: "1",
        }}
        aboutItems={[{ content: <UU5.Bricks.Lsi lsi={Lsi.left.about} />, href: "about" }]}
        helpHref={null}
      >
        <Plus4U5.App.MenuTree
          borderBottom
          // NOTE Item "id" equals to useCase so that item gets automatically selected when route changes (see spa-autheticated.js).
          items={[{ id: "home", href: "home", content: <UU5.Bricks.Lsi lsi={Lsi.left.home} />, },
          {id: "subjectList", href: "subjectList", content: <UU5.Bricks.Lsi lsi={{en: "Zobraziť predmety"}} />},
          
          {id: "subjectCreate", href: "subjectCreate", content: <UU5.Bricks.Lsi lsi={{en: "Pridať predmet"}} />},
          {id: "studyProgramCreate", href: "studyProgramCreate", content: <UU5.Bricks.Lsi lsi={{en: "Štúdijné programy"}} />},
        ]}
        
        />
      </Plus4U5.App.Left>
    );
    //@@viewOff:render
  },
});

export default Left;
