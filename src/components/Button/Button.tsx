import './Button.css';

interface Props {
  name: string,
  onclick: () => void,
}

function Button(props: Props) {
  return (
    <button
      className='button'
      onClick={props.onclick}
    >
        {props.name}
    </button>
  );
};

export default Button;