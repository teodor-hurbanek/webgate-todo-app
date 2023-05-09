import React from 'react'
// hooks
import { DataProvider } from './hooks/useData'
import { useState } from 'react'
// components
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import NewTaskModal from './modals/NewTaskModal'
import MainContainer from './components/MainContainer'
import TaskDetailsModal from './modals/TaskDetailsModal'

function App() {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark')
  const toggleColorScheme = (value: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{ colorScheme }}>
        <DataProvider>
          <ModalsProvider modals={{ addNewTask: NewTaskModal, taskDetailsModal: TaskDetailsModal }}>
            <MainContainer />
          </ModalsProvider>
        </DataProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}

export default App
