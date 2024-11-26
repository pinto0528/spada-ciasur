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
    <Card.Root width="20vw" minWidth='200px' >
      <Card.Body gap="4" padding='0'>
        <Avatar 
          src={image} 
          name={title} 
          size="full"
          shape="rounded"
          style={{ height: "40vh", width: "auto" }}
        />
        <Card.Title ml='10px'>{title}</Card.Title>
        <Card.Description ml='10px' mr='10px'>{description}</Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Button variant="outline" mt='15px'>More</Button>
      </Card.Footer>
    </Card.Root>
  )
}
