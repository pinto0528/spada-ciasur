import { useState, useEffect } from "react";
import {Profile} from '../widgets/Profile'
import { Button } from "@/components/ui/button"
import { Separator, Stack, Link, Flex } from "@chakra-ui/react";
import { RiLoginBoxFill, RiLogoutBoxLine } from "react-icons/ri";
import { Tooltip } from "@/components/ui/tooltip"

import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const SessionButton = ({ onSessionChange }: { onSessionChange: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleSession = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
      window.location.reload();
      setIsLoggedIn(false);
      
    } else {
      window.location.href = "/login";
    }
    onSessionChange(); // Llama al callback para actualizar el padre
  };

  return (
    <>
    {isLoggedIn ? (
          <>
          <div style={{display:'flex', flexDirection:'row'}}>
            <Profile/>
            <DialogRoot>
                <DialogTrigger asChild>
                    <Button 
                        style={{marginLeft:"50px", marginTop:"5px"}} 
                        size='sm' variant="surface" 
                        colorPalette='red' 
                        >
                            <RiLogoutBoxLine/>
                    </Button>
                </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you sure you watn to log out?</DialogTitle>
                </DialogHeader>
                <DialogFooter>
                    <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                    </DialogActionTrigger>

                    <Button  
                    size='sm' variant="surface" 
                    colorPalette='red' 
                    onClick={handleSession}
                    >
                        Log Out
                    </Button>
                </DialogFooter>
                <DialogCloseTrigger />
            </DialogContent>
            </DialogRoot>
        </div>
          </>
        ) : (
          <>
            <Button size='sm' onClick={handleSession}>
            <RiLoginBoxFill /> Log in
            </Button>
          </>
        )}
    
    </>
  );
};

export default SessionButton;
