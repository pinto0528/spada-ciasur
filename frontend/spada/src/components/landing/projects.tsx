// src/components/Projects.tsx
import React from 'react';
import { ProjectCard } from '../widgets/projectCard';
import { Heading } from '@chakra-ui/react';

export const Projects: React.FC = () => (
  <section className="section">
    <Heading style={{marginBottom:'20px'}}>Proyectos</Heading>
    <ul>
      <li className='card'>
        <ProjectCard 
          title="Project 1"
          description="This is a description for project 1."
          image="https://picsum.photos/200/300" // Imagen para el proyecto 1
        />
      </li>
      <li className='card'>
        <ProjectCard 
          title="Project 2"
          description="This is a description for project 2."
          image="https://picsum.photos/200/300?random=2" // Imagen para el proyecto 2
        />
      </li>
      <li className='card'>
        <ProjectCard 
          title="Project 3"
          description="This is a description for project 3."
          image="https://picsum.photos/200/300?random=3" // Imagen para el proyecto 3
        />
      </li>
    </ul>
  </section>
);
