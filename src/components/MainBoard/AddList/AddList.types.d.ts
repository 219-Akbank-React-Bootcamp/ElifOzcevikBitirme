export type ListFormProps = {
    onListRegister: (values: ListFormValuesProps) => void
  }
  
  export type ListFormValuesProps = {
    title: string,
    boardId:number,
    order: number,
  }
  