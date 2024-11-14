
import React from 'react';
import { Box } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react';
import  { PeopleCard } from '@/components/widgets/peopleCard'
import { SimpleGrid } from "@chakra-ui/react"

export const Team: React.FC = () => (
  
    <section className="section">
    <Heading style={{marginBottom:'20px'}}>Investigadores</Heading>
    <p  style={{marginBottom: '3vh'}}>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae voluptatem commodi
      adipisci ducimus illo cumque debitis itaque fugiat. Eveniet veritatis eaque, autem officiis
      accusantium quae fugit voluptatem quam deserunt!
    </p>
    <SimpleGrid columns={[null, null, 5]} gap="40px">
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
        <PeopleCard/>
    </SimpleGrid>
    
  </section>
);
