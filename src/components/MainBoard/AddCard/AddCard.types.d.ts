export type CardFormProps = {
    onCardRegister: (values: CardFormValuesProps) => void
  }
  
  export type CardFormValuesProps = {
    title: string,
    listId:number,
    order: number,
    description: string,
    duedate: Date,
  }
  