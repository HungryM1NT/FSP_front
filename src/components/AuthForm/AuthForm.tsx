import './AuthForm.css';
import { HTMLInputTypeAttribute, ReactElement } from 'react';
import Button from '../Button/Button';


interface Button {
    lineName: string,
    onclick: () => void,
}

interface Line {
    lineName: string,
    inputType: HTMLInputTypeAttribute,
    isRequired?: boolean,
    minLength?: number
}

export interface Props {
    title: string,
    lines: Array<Line>,
    button: Button,
    extraLine?: ReactElement
}

function AuthForm(props: Props) {
  return (
    <>
      <div className='auth_div'>
        <p className='form_title'>{props.title}</p>
        <form className='auth_form'>
            {props.lines.map(
                (line: Line) => 
                <div className='field'>
                    <label>
                        {line.lineName}
                    </label>
                    <input
                        type={line.inputType}
                        required={line.isRequired}
                        minLength={line.minLength}
                    />
                </div>
            )}
        </form>
        <Button name={props.button.lineName} onclick={props.button.onclick}/>
        {props.extraLine}
      </div>
    </>
  );
}

export default AuthForm;
