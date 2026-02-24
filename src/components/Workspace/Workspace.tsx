import React from 'react';
import './Workspace.css';
import Doc from './Doc/Doc';
import Controls from './Controls/Controls';
import Doc_Info from './Doc_Info/Doc_Info';


function Workspace() {
  return (
    <div className='workspace'>
        <Doc_Info/>
        <Doc/>
        <Controls/>
    </div>
  );
};

export default Workspace;