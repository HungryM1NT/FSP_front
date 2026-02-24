import React from 'react';
import './Doc.css';
import testimage from './doc1.jpg'


function Doc() {
  return (
    <img src={testimage} className='doc-image'/>
  );
};

export default Doc;