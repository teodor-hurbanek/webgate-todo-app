import { modals } from '@mantine/modals'
// hooks
import { useState } from 'react'
import { useData } from '../hooks/useData'
// components
import { Grid, Card, Flex, Box, Badge, Title, Text, Checkbox, CloseButton, Button } from '@mantine/core'
// functions
import { getPriorityColor, getFormattedTitle, getFormattedDeadline } from '../helpers/formatters'

export default function TodoCard({ item }) {
  const { id, title, priority, isCompleted, deadline } = item
  const [checked, setChecked] = useState(isCompleted)
  const { updateTask, deleteTask } = useData()

  const handleUpdateTask = () => {
    setChecked(checked => !checked)
    updateTask(id, !checked)
  }

  const openDeleteModal = id =>
    modals.openConfirmModal({
      title: 'Delete this task',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this task card? This action is destructive and you won't be able to take it
          back.
        </Text>
      ),
      labels: { confirm: 'Delete task', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onCancel: () => console.log('Canceled'),
      onConfirm: () => deleteTask(id),
    })

  return (
    <Grid.Col xs={6} md={4}>
      <Card shadow="sm" padding="lg" radius="md" withBorder sx={{ cursor: 'pointer' }}>
        {priority && (
          <Badge
            h={'.5rem'}
            w={'2rem'}
            variant="filled"
            radius="xl"
            color={getPriorityColor(priority)}
            sx={{ position: 'absolute', top: '.5rem', left: '.5rem' }}
          />
        )}
        <Flex align={'center'} gap={'1rem'}>
          <Checkbox checked={checked} onChange={handleUpdateTask} sx={{ input: { cursor: 'pointer' } }} />

          <Flex align={'center'} justify={'space-between'} w={'100%'}>
            <Box>
              <Title order={5}>{getFormattedTitle(title, 25)}</Title>
              <Text>{getFormattedDeadline(deadline)}</Text>
              <Button
                variant="subtle"
                onClick={
                  () =>
                    modals.openContextModal({
                      modal: 'taskDetailsModal',
                      centered: true,
                      sx: { section: { position: 'relative' } },
                      taskId: id,
                    })
                  // TODO: Fix - Warning: React does not recognize the `taskId` prop on a DOM element.
                }
              >
                Open task details
              </Button>
            </Box>

            <CloseButton onClick={() => openDeleteModal(id)} title="Delete task card" size="md" iconSize={20} />
          </Flex>
        </Flex>
      </Card>
    </Grid.Col>
  )
}
