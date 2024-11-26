// src/components/Mission.tsx
import React from 'react';
import { Heading, Image } from "@chakra-ui/react"

export const Mission: React.FC = () => (
  <section className="section">
    <div style={{display:'flex'}}>
    <Image 
      maxWidth='35vw'
      rounded='md'
      src='https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    />
    <div style={{margin:'0px 15px 0px 15px'}}>
    <Heading style={{marginBottom:'20px'}}>Nuestra Misión</Heading>
    <p>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet enim voluptatum et veritatis alias
      eos nemo ad magnam tempora fuga quia molestias pariatur quisquam incidunt vitae sit ipsa rem
      possimus, voluptates iste voluptatibus doloremque.
    </p>
    </div>
    </div>
  </section>
);
