import { Flex, Text, Space, Switch, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'

export default function Navbar() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  return (
    <>
      <Flex align={'center'} justify={'space-between'}>
        <Text>Add a new task by clicking the plus button.</Text>

        <Group position="center">
          <Switch
            checked={colorScheme === 'dark'}
            onChange={() => toggleColorScheme()}
            size="md"
            onLabel={<LightModeIcon color={theme.white} fontSize="small" stroke={1.5} />}
            offLabel={<DarkModeIcon color={theme.colors.gray[6]} fontSize="small" stroke={1.5} />}
          />
        </Group>
      </Flex>
      <Space h="md" />
    </>
  )
}
