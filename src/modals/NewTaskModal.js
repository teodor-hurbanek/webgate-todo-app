// hooks
import { useForm } from '@mantine/form'
import { useData } from '../hooks/useData'
// components
import { Button, Box, TextInput, Textarea, Group, Space, Radio } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'

const NewTaskModal = ({ context, id }) => {
  const { createTask } = useData()
  const form = useForm({
    initialValues: {
      title: '',
      description: '',
      deadline: '',
      priority: '',
    },

    validate: {
      title: value => (value.length < 2 ? 'Title must have at least 2 letters' : null),
      description: value => (value.length > 280 ? 'Description cannot have more than 280 characters' : null),
      deadline: value => (value.length === 0 ? 'Deadline is required' : null),
    },
  })

  const handleSubmit = () => {
    createTask(form.values)
    context.closeModal(id)
    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} id="task-form">
      <TextInput placeholder="Title" label="Task title" data-autofocus withAsterisk {...form.getInputProps('title')} />
      <Space h="md" />
      <Textarea placeholder="Description" label="Task description" {...form.getInputProps('description')} />
      <Space h="md" />
      <DateTimePicker
        label="Task deadline"
        placeholder="Pick date and time"
        mx="auto"
        withAsterisk
        minDate={new Date()}
        valueFormat="DD MMM YYYY hh:mm"
        sx={{ position: 'relative', zIndex: '1000' }}
        {...form.getInputProps('deadline')}
      />
      <Space h="md" />

      <Radio.Group name="priority" label="Select priority" {...form.getInputProps('priority')}>
        <Group mt="xs">
          <Radio value="high" label="High" />
          <Radio value="medium" label="Medium" />
          <Radio value="low" label="Low" />
        </Group>
      </Radio.Group>

      <Box sx={{ textAlign: 'right' }}>
        <Button mt="md" mr="md" variant="default" onClick={() => context.closeModal(id)}>
          Cancel
        </Button>
        <Button type="submit" mt="md" disabled={!form.values.title || !form.values.deadline}>
          Add new task
        </Button>
      </Box>
    </form>
  )
}

export default NewTaskModal
