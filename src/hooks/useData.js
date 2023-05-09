import { createContext, useContext, useState } from 'react'
// data
import data from '../data'

const DataContext = createContext({
  tasks: data,
  createTask: () => null,
  updateTask: () => null,
  deleteTask: () => null,
})

export const useProvidedData = () => {
  const [tasks, setTasks] = useState(data)

  const createTask = data => {
    const lastId = tasks.length ? Number([...tasks].pop()?.id) + 1 : '1'
    const newObj = { id: lastId, ...data, isCompleted: false }
    setTasks([...tasks, newObj])
  }

  const updateTask = (id, isCompleted) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = isCompleted
      }
      return task
    })
    setTasks(newTasks)
  }

  const deleteTask = id => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  return { tasks, createTask, updateTask, deleteTask }
}

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  const tasks = useProvidedData()
  return <DataContext.Provider value={tasks}>{children}</DataContext.Provider>
}
