import { Button } from '@chakra-ui/react';
import { RiArrowRightLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimatedButton = () => {
  // Establecemos el tipo explícito para el estado
  const [buttonVariant, setButtonVariant] = useState<'outline' | 'solid' | 'subtle' | 'ghost' | 'plain'>('outline');

  useEffect(() => {
    // Después de 1 segundo, cambiamos la variante del botón a 'solid'
    setButtonVariant('solid');
    const timer = setTimeout(() => {
      setButtonVariant('outline'); // Cambiamos la variante a 'solid'
    }, 2500); // 1 segundo

    return () => clearTimeout(timer); // Limpiamos el temporizador si el componente se desmonta
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 1,  // Duración de la animación
        delay: 1,     // Retraso antes de empezar
        ease: 'easeOut',
      }}
    >
      <Button
        variant={buttonVariant}  // Cambia entre 'outline' y 'solid'
        size="sm"
        style={{
          position: 'fixed',
          zIndex: 1,
          top: '2vh',
          left: '1.5vw',
          padding: '0.8rem',
        }}
      >
        <RiArrowRightLine />
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
