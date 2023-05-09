import React from 'react'
import {modals} from '@mantine/modals'
// hooks
import {useState} from 'react'
import {useData} from '../hooks/useData'
// components
import {Grid, Card, Flex, Box, Badge, Title, Text, Checkbox, CloseButton, Button, Center, Space} from '@mantine/core'
// functions
import {getPriorityColor, getFormattedTitle, getFormattedDeadline, getExpired} from '../utils/helpers'
// types
import {Data} from '../types/general'

type TaskCardProps = {
  item: Data
}

export default function TaskCard({item}: TaskCardProps) {
  const {id, title, priority, isCompleted, deadline} = item
  const [checked, setChecked] = useState(isCompleted)
  const {setTaskId, updateTask, deleteTask} = useData()
  const isExpired = getExpired(deadline, isCompleted)

  const handleUpdateTask = () => {
    setChecked((checked: boolean) => !checked)
    updateTask(id, !checked)
  }

  const openTaskDetailsModal = () => {
    setTaskId(id)
    modals.openContextModal({
      modal: 'taskDetailsModal',
      centered: true,
      sx: {section: {position: 'relative'}},
      innerProps: {},
    })
  }

  const openDeleteModal = (id: number) => {
    modals.openConfirmModal({
      title: 'Delete this task',
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this task card? This action is destructive and you won't be able to take it
          back.
        </Text>
      ),
      labels: {confirm: 'Delete task', cancel: 'Cancel'},
      confirmProps: {color: 'red'},
      onCancel: () => console.log('Canceled'),
      onConfirm: () => deleteTask(id),
    })
  }

  return (
    <Grid.Col xs={6} md={4}>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        sx={isExpired ? {border: '1px solid red !important'} : undefined}
      >
        {priority && (
          <Badge
            h={'.5rem'}
            w={'2rem'}
            variant="filled"
            radius="xl"
            color={getPriorityColor(priority)}
            sx={{position: 'absolute', top: '.5rem', left: '.5rem'}}
          />
        )}
        <Flex align={'center'} gap={'1rem'}>
          <Checkbox checked={checked} onChange={handleUpdateTask} sx={{input: {cursor: 'pointer'}}} />

          <Flex align={'center'} justify={'space-between'} w={'100%'}>
            <Box>
              <Title order={5}>{getFormattedTitle(title, 25)}</Title>
              <Text color={isExpired ? 'red' : undefined}>{getFormattedDeadline(deadline)}</Text>
            </Box>

            <CloseButton
              onClick={() => openDeleteModal(id)}
              title="Delete task card"
              size="md"
              iconSize={20}
              className="target"
            />
          </Flex>
        </Flex>
        <Space h="sm" />
        <Center>
          <Button onClick={openTaskDetailsModal} variant="light">
            Open task details
          </Button>
        </Center>
      </Card>
    </Grid.Col>
  )
}
