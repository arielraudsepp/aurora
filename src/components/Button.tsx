import React from 'react'
import { Button } from 'semantic-ui-react'

interface ButtonProps {text: string,
                       onClick?: (_: any) => void; };

const UIButton = (name: ButtonProps) => {
  let {text, onClick} = name;
  return (
      <div>
          <button className='ui primary button' onClick={onClick}>{text}</button>
      </div>
  )
}

export default UIButton
