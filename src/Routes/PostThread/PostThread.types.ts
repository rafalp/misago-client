export interface CategoryChoiceChild {
  id: string
  name: string
  icon: string
  color: string
  isClosed: boolean
}

export interface CategoryChoice extends CategoryChoiceChild {
  children: Array<CategoryChoiceChild>
}
