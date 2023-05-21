export type Data = {
  id: number
  title: string
  description?: string
  priority?: Priority
  isCompleted: boolean
  deadline: string
}

export type NewData = {
  title: string
  description?: string
  priority?: Priority
  deadline: string
}

export type Priority = 'high' | 'medium' | 'low'
