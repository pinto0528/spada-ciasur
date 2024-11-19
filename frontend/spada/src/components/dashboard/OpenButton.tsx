import React from "react";
import { Button } from "@/components/ui/button";

interface OpenButtonProps {
    onClick: () => void;
}

const OpenButton: React.FC<OpenButtonProps> = ({ onClick }) => {
    return (
        <Button onClick={onClick}>
            New Chart
        </Button>
    );
};

export default OpenButton;
