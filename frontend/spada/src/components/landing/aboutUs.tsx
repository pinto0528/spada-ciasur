// src/components/AboutUs.tsx
import React from 'react';
import { Box } from "@chakra-ui/react";

export const AboutUs: React.FC = () => (
  <Box
    data-state="open"
    _open={{
    animationName: "fade-in, scale-in",
    animationDuration: "3000ms",
    }}
    _closed={{
    animationName: "fade-out, scale-out",
    animationDuration: "1200ms",
    }}
      ><section className="section">
    <h2>CIASUR</h2>
    <h4>Centro de Investigacion de la Atmósfera Superior y Radiotransmisiones</h4>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas quae voluptatem commodi
      adipisci ducimus illo cumque debitis itaque fugiat. Eveniet veritatis eaque, autem officiis
      accusantium quae fugit voluptatem quam deserunt!
    </p>
  </section>
  </Box>
);
