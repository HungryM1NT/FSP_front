import './AuthForm.css';
import { HTMLInputTypeAttribute } from 'react';
import Button from '../Button/Button';


interface Line {
    lineName: string,
    inputType: HTMLInputTypeAttribute,
    isRequired?: boolean,
    minLength?: number
}

export interface Props {
    title: string,
    lines: Array<Line>
}

function AuthForm(props: Props) {
  return (
    <>
      <div className='auth_form'>
        <p className='form_title'>{props.title}</p>
        <form>
            {props.lines.map(
                (line: Line) => 
                <label>
                    {line.lineName}
                    <input
                        type={line.inputType}
                        required={line.isRequired}
                        minLength={line.minLength}
                    />
                </label>
            )}
            <Button name={"TEMP"} onclick={() => {}}/>
        </form>
      </div>
    </>
  );
}

export default AuthForm;
