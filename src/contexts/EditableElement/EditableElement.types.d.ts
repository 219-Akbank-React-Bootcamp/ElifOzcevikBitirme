import { JSXElementConstructor } from "react"

export type EditableElementProps = JSXElementConstructor & ReactFragment & ReactPortal & {
    innerText:string
    value:string
}