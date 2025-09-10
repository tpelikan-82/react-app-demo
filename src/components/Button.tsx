
interface Props {
    children: string;
    color?: string;
    onClick: () => void;
}

function Button({color = 'primary', children, onClick}: Props ) {

  const classButton = `btn btn-${color}`

  return (
    <div>
      <button type="button" className={'btn btn-' + color} onClick={onClick}>{children}</button>
    </div>
  )
}

export default Button
