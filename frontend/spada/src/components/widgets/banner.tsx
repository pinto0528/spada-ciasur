import { Box, Flex, Heading } from '@chakra-ui/react';

export const Banner = () => (
  <Box maxW="100%" mx="0" p="0" m="0"
  
        data-state="open"
        _open={{
          animationName: "fade-in",
          animationDuration: "2000ms",
        }}
    >
    <Flex position="relative" align="center" justify="center">
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'relative',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: 'scaleX(-1)',
        }}
      >
        <source src="/earth.mp4" type="video/mp4" />
      </video>

      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="rgba(0, 0, 0, 0.7)"
      />

      <Box
        position="absolute"
        bottom="0"
        left="0"
        color="white"
        textAlign="left"
        p={6}
        ml="2vw"
        mb="2vh"        borderRadius="md"
        width="100%"
        style={{
          fontSize: '3rem',  // Tamaño ajustable
          lineHeight: '1.2', // Altura de línea ajustable
        }}
        data-state="open"
        _open={{
          animationName: "slide-from-left",
          animationDuration: "2000ms",
        }}
        
      >
        <Heading size="6xl" style={{ fontSize: '13rem', marginBottom: '6vw'}}>
          SPADA
        </Heading>
        <Heading size="xl" fontWeight="normal" mt={2} style={{ fontSize: '1.5rem', marginBottom: '25vh'}}>
          Sistema de Procesamiento y Almacenamiento de Datos Atmosféricos
        </Heading>
      </Box>
    </Flex>
  </Box>
);
