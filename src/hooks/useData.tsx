import React, {Dispatch, ReactNode, SetStateAction, createContext, useContext, useState} from 'react'
// types
import {Data, NewData} from '../types/general'
// data
import data from '../data'

interface DataInterface {
  tasks: Data[]
  taskId: number
  setTasks: Dispatch<SetStateAction<Data[]>>
  setTaskId: Dispatch<SetStateAction<number>>
  createTask: (data: NewData) => void
  updateTask: (id: number, isCompleted: boolean) => void
  deleteTask: (id: number) => void
}

const DataContext = createContext<DataInterface>({
  tasks: data,
  taskId: 0,
  setTasks: () => null,
  setTaskId: () => null,
  createTask: (data: NewData) => null,
  updateTask: (id: number, isCompleted: boolean) => null,
  deleteTask: (id: number) => null,
})

export const useProvidedData = (): DataInterface => {
  const [tasks, setTasks] = useState<Data[]>(data)
  const [taskId, setTaskId] = useState<number>(0)

  const createTask = (data: NewData) => {
    const lastId = tasks.length ? Number([...tasks].pop()?.id) + 1 : 1
    const newObj = {id: lastId, ...data, isCompleted: false}
    setTasks([...tasks, newObj])
  }

  const updateTask = (id: number, isCompleted: boolean) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        task.isCompleted = isCompleted
      }
      return task
    })
    setTasks(newTasks)
  }

  const deleteTask = (id: number) => {
    const newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }
  return {tasks, taskId, setTaskId, setTasks, createTask, updateTask, deleteTask}
}

export const useData = () => useContext(DataContext)

export const DataProvider = ({children}: {children: ReactNode}) => {
  const tasks = useProvidedData()
  return <DataContext.Provider value={tasks}>{children}</DataContext.Provider>
}
