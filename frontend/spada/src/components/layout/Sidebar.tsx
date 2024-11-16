"use client";

import { Button } from "@/components/ui/button";
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerRoot,
} from "@/components/ui/drawer";
import { useState, useEffect } from "react";
import { RiHomeFill, RiLineChartFill, RiSettings3Fill, RiArrowRightLine } from "react-icons/ri";
import { Separator, Stack, Link } from "@chakra-ui/react";
import SessionButton from "../secure/SessionButton"; // Importa el nuevo componente

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [buttonVariant, setButtonVariant] = useState<'outline' | 'solid' | 'subtle' | 'ghost' | 'plain'>('outline');
  const [sessionUpdated, setSessionUpdated] = useState(false);
  
  const handleSessionChange = () => {
    setSessionUpdated((prev) => !prev); // Cambia el estado para forzar render
  };

  useEffect(() => {
    setButtonVariant("solid");
    const timer = setTimeout(() => {
      setButtonVariant("outline");
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
      <DrawerBackdrop />
      <Button
        variant={buttonVariant}
        size="sm"
        style={{
          position: "fixed",
          zIndex: 1,
          top: "2.4vh",
          left: "1.5vw",
          padding: "0.8rem",
        }}
        onMouseEnter={() => setOpen(true)}
        data-state="open"
        _open={{
          animationName: "slide-to-right-full",
          animationDelay: "1.7s",
        }}
      >
        <RiArrowRightLine />
      </Button>

      <DrawerContent
        offset="4"
        rounded="md"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <DrawerHeader>
          <DrawerTitle>SPADA</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <Stack>
            <Link href="/home">
              <RiHomeFill /> Home
            </Link>
            <Separator />
            <Link href="/dashboard">
              <RiLineChartFill /> Dashboard
            </Link>
            <Separator />
            <Link href="/settings">
              <RiSettings3Fill /> Settings
            </Link>
            
          </Stack>
        </DrawerBody>
        <DrawerFooter>
        <SessionButton onSessionChange={handleSessionChange}/>
        </DrawerFooter>
      </DrawerContent>
    </DrawerRoot>
  );
};

export default Sidebar;
