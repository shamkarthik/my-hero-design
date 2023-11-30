import React, { ReactNode } from 'react'
import { stylesClasses } from './styleClasses'

const Container = ({children, id,classes="",}:{children:ReactNode,id:string,classes?:string}) => {
  return (
    <section id={id} className={`${classes} ${stylesClasses.withPadding}`} >{children}</section>
  )
}

export default Container