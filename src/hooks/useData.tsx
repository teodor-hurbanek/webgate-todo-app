import React, { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from 'react'
// data
import data from '../data'
// types
import { Data } from '../types/general'

interface DataInterface {
  tasks: Data[]
  taskId: number | undefined
  setTasks: Dispatch<SetStateAction<Data[]>>
  setTaskId: Dispatch<SetStateAction<number | undefined>>
  createTask: (data: Data) => void
  updateTask: (id: number | undefined, isCompleted: boolean) => void
  deleteTask: (id: number | undefined) => void
}

const DataContext = createContext<DataInterface>({
  tasks: data,
  taskId: 0,
  setTasks: () => null,
  setTaskId: () => null,
  createTask: (data: Data) => null,
  updateTask: (id: number | undefined, isCompleted: boolean) => null,
  deleteTask: (id: number | undefined) => null,
})

export const useProvidedData = (): DataInterface => {
  const [tasks, setTasks] = useState<Data[]>(data)
  const [taskId, setTaskId] = useState<number | undefined>(0)

  const createTask = (data: Data) => {
    const lastId = tasks.length ? Number([...tasks].pop()?.id) + 1 : 1
    const newObj = { id: lastId, ...data, isCompleted: false }
    setTasks([...tasks, newObj])
  }

  const updateTask = (id: number | undefined, isCompleted: boolean) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = isCompleted
      }
      return task
    })
    setTasks(newTasks)
  }

  const deleteTask = (id: number | undefined) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  return { tasks, taskId, setTaskId, setTasks, createTask, updateTask, deleteTask }
}

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const tasks = useProvidedData()
  return <DataContext.Provider value={tasks}>{children}</DataContext.Provider>
}
