export interface Todo {
  id: number
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  completedAt?: Date
  priority: 'low' | 'medium' | 'high'
}
