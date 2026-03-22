import './AuthForm.css';
import { HTMLInputTypeAttribute, ReactElement, ChangeEvent, FormEvent } from 'react';
import Button from '../Button/Button';


interface AuthButtonProps {
    lineName: string,
    onclick: (e: any) => void,
}

interface Line {
    lineName: string,
    inputType: HTMLInputTypeAttribute,
    isRequired?: boolean,
    minLength?: number,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export interface Props {
    title: string,
    lines: Array<Line>,
    button: AuthButtonProps,
    extraLine?: ReactElement
}

function AuthForm(props: Props) {
  return (
    <>
      <div className='auth_div'>
        <p className='form_title'>{props.title}</p>
        <form className='auth_form' onSubmit={props.button.onclick}>
            {props.lines.map(
                (line: Line, index: number) => 
                <div className='field'>
                    <label className='auth_label'>
                        {line.lineName}
                    </label>
                    <input className='auth_input'
                        type={line.inputType}
                        required={line.isRequired}
                        minLength={line.minLength}
                        value={line.value}
                        onChange={line.onChange}
                    />
                </div>
            )}
            <Button name={props.button.lineName} onclick={() => {}}/>
            {props.extraLine}
        </form>
      </div>
    </>
  );
}

export default AuthForm;
