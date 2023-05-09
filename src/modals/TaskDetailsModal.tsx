import React from 'react'
import { ContextModalProps, modals } from '@mantine/modals'
//hooks
import { useState } from 'react'
import { useData } from '../hooks/useData'
// components
import { Badge, Flex, Text, Title, Checkbox, Space, Box, Button } from '@mantine/core'
// functions
import { getPriorityColor, getFormattedDeadline, getExpired } from '../utils/helpers'

export default function TaskDetailsModal({ context, id }: ContextModalProps) {
  const { tasks, taskId, updateTask, deleteTask } = useData()

  const task = tasks.find(task => task.id === taskId)
  // TODO: remove ! and provide better typing
  const { title, description, deadline, priority, isCompleted } = task!
  const [checked, setChecked] = useState(isCompleted)
  const isExpired = getExpired(deadline, isCompleted)

  const handleUpdateTask = () => {
    setChecked((checked: boolean) => !checked)
    const id = taskId
    updateTask(id, !checked)
  }

  const handleDeleteTask = (id: number) => {
    deleteTask(id)
    modals.closeAll()
  }

  const openDeleteModal = (id: number) =>
    modals.openConfirmModal({
      title: 'Delete this task',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this task card? This action is destructive and you won't be able to take it
          back.
        </Text>
      ),
      labels: { confirm: 'Delete task', cancel: 'Back' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleDeleteTask(id),
    })

  return (
    <>
      <Flex align={'center'} gap={'sm'} style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: '1000' }}>
        <Badge h={'.5rem'} w={'2rem'} variant="filled" radius="xl" color={getPriorityColor(priority)} />
        <Text color={isExpired ? 'red' : undefined} size="sm">
          {getFormattedDeadline(deadline)}
        </Text>
      </Flex>
      <Title order={4}>{title}</Title>
      <Text mih={'10rem'} size="sm">
        {description}
      </Text>
      <Space h="md" />
      <Checkbox
        checked={checked}
        onChange={handleUpdateTask}
        label="Select as completed"
        sx={{ input: { cursor: 'pointer' } }}
      />
      <Box mt={'auto'} sx={{ textAlign: 'right' }}>
        <Button mt="md" mr="md" variant="default" onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
        <Button color="red" mt="md" onClick={() => openDeleteModal(taskId)}>
          Delete task
        </Button>
      </Box>
    </>
  )
}
