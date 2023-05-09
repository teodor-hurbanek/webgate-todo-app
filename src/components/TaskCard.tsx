import React from 'react'
import { modals } from '@mantine/modals'
// hooks
import { useState } from 'react'
import { useData } from '../hooks/useData'
// components
import { Grid, Card, Flex, Box, Badge, Title, Text, Checkbox, CloseButton, Button } from '@mantine/core'
// functions
import { getPriorityColor, getFormattedTitle, getFormattedDeadline, getExpired } from '../utils/helpers'
// types
import { Data } from '../types/general'

type TodoCardProps = {
  item: Data
}

export default function TodoCard({ item }: TodoCardProps) {
  const { id, title, priority, isCompleted, deadline } = item
  const [checked, setChecked] = useState(isCompleted)
  const { setTaskId, updateTask, deleteTask } = useData()
  const isExpired = getExpired(deadline, isCompleted)

  const handleUpdateTask = () => {
    setChecked((checked: boolean | undefined) => !checked)
    updateTask(id, !checked)
  }

  const openTaskDetailsModal = () => {
    setTaskId(id)
    modals.openContextModal({
      modal: 'taskDetailsModal',
      centered: true,
      sx: { section: { position: 'relative' } },
      innerProps: {},
    })
  }

  const openDeleteModal = (id: number | undefined) =>
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
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={isExpired ? { border: '1px solid red !important' } : undefined}
      >
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
              <Text color={isExpired ? 'red' : undefined}>{getFormattedDeadline(deadline)}</Text>
              <Button variant="subtle" onClick={openTaskDetailsModal}>
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
