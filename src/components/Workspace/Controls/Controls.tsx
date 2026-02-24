import React from 'react';
import './Controls.css';
import Button from '../../Button/Button';


function Controls() {
  return (
    <div>
        <Button
            name={"Prev"}/>
        <Button
            name={"Next"}/>
    </div>
  );
};

export default Controls;