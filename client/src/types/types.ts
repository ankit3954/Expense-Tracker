export interface ButtonProps{
    label : string
    handleFunc : () => void
}

export interface InputBoxProps{
    label: string,
    id: string
    handleChange: (event: any) => void,
    value: string
}