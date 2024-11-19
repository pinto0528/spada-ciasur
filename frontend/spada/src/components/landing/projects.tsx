// src/components/Projects.tsx
import React from 'react';
import { ProjectCard } from '../widgets/projectCard';
import { Heading, Center } from '@chakra-ui/react';

export const Projects: React.FC = () => (
  <section className="section">
    <Heading style={{marginBottom:'20px'}}>Proyectos</Heading>
    <Center>
      <ul>
      <li className='card'>
        <ProjectCard 
          title="Project 1"
          description="This is a description for project 1."
          image="https://images.unsplash.com/photo-1705964586021-24cb78a96598?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Imagen para el proyecto 1
        />
      </li>
      <li className='card'>
        <ProjectCard 
          title="Project 2"
          description="This is a description for project 2."
          image="https://images.unsplash.com/photo-1705964586021-24cb78a96598?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Imagen para el proyecto 2
        />
      </li>
      <li className='card'>
        <ProjectCard 
          title="Project 3"
          description="This is a description for project 3."
          image="https://images.unsplash.com/photo-1705964586021-24cb78a96598?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Imagen para el proyecto 3
        />
      </li>
    </ul>
    </Center>
  </section>
);
