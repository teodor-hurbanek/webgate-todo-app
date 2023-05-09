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

  return (
    <Container py={'md'}>
      <Flex direction="column">
        <Navbar />

        <Grid gutter={10}>
          {tasks.map(item => (
            <TaskCard
              key={item.id}
              item={item}
              //   onClick={() =>
              //     modals.openContextModal({
              //       modal: 'taskDetailsModal',
              //       centered: true,
              //       title: 'Add a new task card',
              //     })
              //   }
            />
          ))}
        </Grid>

        <ActionIcon
          onClick={() =>
            modals.openContextModal({
              modal: 'addNewTask',
              centered: true,
              title: 'Add a new task card',
              sx: { section: { overflow: 'inherit' } },
            })
          }
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
