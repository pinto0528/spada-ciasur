"use client"

import { Button } from "@/components/ui/button"
import {
  DrawerActionTrigger,
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri";
import { Separator, Stack, Text, Link } from "@chakra-ui/react"
import { motion } from 'framer-motion';
import AnimatedButton from "./AnimatedButton";


const Sidebar = () => {
  const [open, setOpen] = useState(false)
  const [buttonVariant, setButtonVariant] = useState<'outline' | 'solid' | 'subtle' | 'ghost' | 'plain'>('outline');

  useEffect(() => {
    setButtonVariant('solid');
    const timer = setTimeout(() => {
      setButtonVariant('outline'); 
    }, 2500);

    return () => clearTimeout(timer); // Limpiamos el temporizador si el componente se desmonta
  }, []);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
      <DrawerBackdrop />
      <DrawerTrigger asChild>
      <Button
        variant={buttonVariant}
        size="sm"
        style={{
          position: 'fixed',
          zIndex: 1,
          top: '2vh',
          left: '1.5vw',
          padding: '0.8rem',
        }}
        data-state="open"
        _open={{
          animationName: "slide-to-right-full",
          animationDuration: "500ms",
          animationDelay: "2.5s"
        }}
      >
        <RiArrowRightLine />
      </Button>
      </DrawerTrigger>
      <DrawerContent offset="4" rounded="md">
        <DrawerHeader>
          <DrawerTitle>SPADA</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
        <Stack>
            <Link href="/home"> <RiArrowLeftLine/> Home</Link>
            <Separator />
            <Link href="/dashboard">Dashboard</Link>
            <Separator />
            <Link href="/settings">Settings</Link>
            <Separator />
            <Link href="/login">Sign in</Link>
        </Stack>
        </DrawerBody>
        <DrawerFooter>
        </DrawerFooter>
        <DrawerCloseTrigger />
      </DrawerContent>
    </DrawerRoot>
  )
}

export default Sidebar;