import React from 'react'
import { Button } from 'semantic-ui-react'

interface ButtonProps {text: string,
                       onClick?: (_: any) => void; };

const ButtonExampleButton = (name: ButtonProps) => {
  let {text, onClick} = name;
  return (
      <div>
          <Button onClick={onClick}>{text}</Button>
      </div>
  )
}

export default ButtonExampleButton
