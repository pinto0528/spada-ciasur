import { HStack, Stack, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import SessionButton from "../secure/SessionButton";

export const Profile = () => {
  // Recuperar la información del usuario desde el localStorage
  const userInfo = localStorage.getItem("userInfo");

  // Si no hay datos de usuario, no se renderiza nada (o puedes agregar un mensaje de error)
  if (!userInfo) {
    return <Text>No user data found</Text>;
  }

  // Convertir el string JSON a un objeto
  const user = JSON.parse(userInfo);
  const formattedName = 
  user.name.charAt(0).toUpperCase() + user.name.slice(1) 
  + ' ' + 
  user.last_name.charAt(0).toUpperCase() + user.last_name.slice(1);

  return (
    <Stack gap="8">
      {/* Usamos la información del usuario recuperada */}
      <HStack key={user.email} gap="4">
        <Avatar name={user.name} size="sm" src={user.avatar} />
        <Stack gap="0">
          <Text fontWeight="medium">{formattedName}</Text>
          <Text color="fg.muted" textStyle="sm">
            {user.email}
          </Text>
        </Stack>
      </HStack>
    </Stack>
  )
}
