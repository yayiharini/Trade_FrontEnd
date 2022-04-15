import React from "react";
import SimpleAccordion from "./Accordion";
import ResponsiveAppBar from "./Appbar";
import BasicTabs from "./Tabbar1";

const Main = () => {
    const [tabledata,settabledata]=React.useState('');
    return (
        <div>

           
            <SimpleAccordion />
            <br />
           

        </div>
    )
}
export default Main;