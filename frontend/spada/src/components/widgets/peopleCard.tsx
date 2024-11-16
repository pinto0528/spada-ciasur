import { Button, Card, Image, Text } from "@chakra-ui/react"

export const PeopleCard = () => {
  return (
    <Card.Root w="15vw" overflow="hidden">
      <Image
        src="https://plus.unsplash.com/premium_vector-1721131162874-d8bcb33d6bad?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Investigador en el ciasur"
      />
      <Card.Body gap="0">
        <Card.Title>Investigador/a</Card.Title>
        <Card.Description>
          Lorem ipsum dolor
        </Card.Description>
      </Card.Body>
      <Card.Footer gap="2">
      </Card.Footer>
    </Card.Root>
  )
}
