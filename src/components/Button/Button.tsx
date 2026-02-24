import React from 'react';
import './Button.css';

interface Props {
  name: string
}

function Button(props: Props) {
  return (
    <button className='button'>
        {props.name}
    </button>
  );
};

export default Button;