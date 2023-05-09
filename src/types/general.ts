export type Data = {
  id?: number
  title: string
  description?: string | null
  priority: string
  isCompleted?: boolean
  deadline: string
}

export type Priority = 'high' | 'medium' | 'low'
