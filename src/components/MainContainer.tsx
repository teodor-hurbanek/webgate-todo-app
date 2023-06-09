import React from 'react'
import { modals } from '@mantine/modals'
//hooks
import { useData } from '../hooks/useData'
// components
import { Container, Flex, Grid, ActionIcon } from '@mantine/core'
import Navbar from './Navbar'
import TaskCard from './TaskCard'
import AddIcon from '@mui/icons-material/Add'

export default function MainContainer() {
  const { tasks } = useData()

  const openNewTaskModal = () => {
    modals.openContextModal({
      modal: 'addNewTask',
      centered: true,
      title: 'Add a new task card',
      sx: { section: { overflow: 'inherit' } },
      innerProps: {},
    })
  }

  return (
    <Container py={'md'}>
      <Flex direction="column">
        <Navbar />

        <Grid gutter={10}>{tasks.map(item => <TaskCard key={item.id} item={item} />).reverse()}</Grid>

        <ActionIcon
          onClick={openNewTaskModal}
          color="blue"
          variant="filled"
          size={'xl'}
          radius={'xl'}
          sx={{ alignSelf: 'center', position: 'fixed', bottom: '2rem' }}
        >
          <AddIcon />
        </ActionIcon>
      </Flex>
    </Container>
  )
}
