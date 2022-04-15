import * as React from 'react';
import {Tabs,AppBar,Tab} from '@mui/material';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function tabbar(){
    const [val,setVal]=React.useState(0);
    const handleTabs=(e,val)=>{
       console.warn(val);
       setVal(val);
    }
    return(
        <div>
            <h1>Tabs</h1>
            <AppBar position="static" >
                <Tabs value={0} onChange={handleTabs}>
                    <Tab label="Table" />
                    <Tab label="Litter Assessment" />
                    <Tab label="Pie Chart" />
                    <Tab label="Bar Chart" />
                    <Tab label="Line Chart" />
                </Tabs>
            </AppBar>
        </div>
    );
}