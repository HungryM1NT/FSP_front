import React from 'react';
import './Controls.css';
import Button from '../../Button/Button';


function Controls() {
  return (
    <div>
        <Button
            name={"Prev"}
            onclick={() => {console.log('todo')}}/>
        <Button
            name={"Next"}
            onclick={() => {console.log('todo')}}/>
    </div>
  );
};

export default Controls;