export type BoardFormProps = {
  onBoardRegister: (values: BoardFormValuesProps) => void
}

export type BoardFormValuesProps = {
  title: string
  members:Array
}
