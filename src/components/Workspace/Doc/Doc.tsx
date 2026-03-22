import React from 'react';
import './Doc.css';

interface DocProps {
    imageUrl: string;
}

function Doc({ imageUrl }: DocProps) {
  return (
    <img src={imageUrl} className='doc-image' alt="Document"/>
  );
};

export default Doc;