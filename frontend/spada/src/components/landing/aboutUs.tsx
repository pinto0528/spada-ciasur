// src/components/AboutUs.tsx
import React from 'react';
import { Box } from "@chakra-ui/react";
import { Heading } from '@chakra-ui/react';
import { Image } from "@chakra-ui/react"

export const AboutUs: React.FC = () => (
  
    <section className="section">
    <div style={{display:'flex'}}>
      <div style={{margin:'0px 15px 0px 15px'}}>
      <Heading style={{marginBottom:'20px'}}>CIASUR</Heading>
      <h4>Centro de Investigacion de la Atmósfera Superior y Radiotransmisiones</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae voluptatem commodi
        adipisci ducimus illo cumque debitis itaque fugiat. Eveniet veritatis eaque, autem officiis
        accusantium quae fugit voluptatem quam deserunt!
      </p>
      </div>
    <Image 
    maxWidth='35vw'
    rounded='md'
    src='https://images.unsplash.com/photo-1602052577122-f73b9710adba?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    />
    </div>
  </section>
);
