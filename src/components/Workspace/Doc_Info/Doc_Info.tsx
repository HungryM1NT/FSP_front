import React from 'react';
import './Doc_Info.css';
import Button from '../../Button/Button';


function Doc_Info() {
  return (
    <div className='doc-info'>
        <span className='doc-name'>Doc1.jpg</span>
        <span className='doc-time'>22:39 24.02.2026</span>
        <Button
            name={"Delete"}
        />
    </div>
  );
};

export default Doc_Info;