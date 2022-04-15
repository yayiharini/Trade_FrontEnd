import React from "react";
import SimpleAccordion from "./Accordion";
import Tabbar1 from "./Tabbar1";


const Main1 = () => {
    const [tabledata,settabledata]=React.useState('');
    return (
        
        <div>

           
            <SimpleAccordion settabledata={settabledata}/>
            <br />
            

        </div>
    )
}
export default Main1;