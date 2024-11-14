// src/widgets/projectCard.tsx
import { Card } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// Define las props que acepta el componente
interface ProjectCardProps {
  title: string;
  description: string;
  image: string; // Nueva prop para la imagen
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image }) => {
  return (
    <Card.Root width="320px">
      <Card.Body gap="2">
        <Avatar 
          src={image}  // Usar la prop 'image' para la imagen
          name={title}  // Se puede usar el 'title' como nombre para el avatar
          size="full"
          shape="rounded"
          style={{ height: "40vh", width: "auto" }}
        />
        <Card.Title mb="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline">View</Button>
      </Card.Footer>
    </Card.Root>
  )
}
