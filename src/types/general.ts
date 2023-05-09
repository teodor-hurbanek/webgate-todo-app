export type Data = {
  id: number
  title: string
  description?: string
  priority?: string
  isCompleted: boolean
  deadline: string
}

export type NewData = {
  title: string
  description?: string
  priority?: string
  deadline: string
}
