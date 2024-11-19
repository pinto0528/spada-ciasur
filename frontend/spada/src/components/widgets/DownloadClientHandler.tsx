"use client";

import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Toaster,toaster } from "@/components/ui/toaster"

import { API_URL_DWNLD } from '../../utils/api';

const DownloadClientHandler: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false); // Estado para controlar si el cliente de descarga está en ejecución
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  // Inicia el cliente de descarga
  const startDownloadClient = async () => {
    try {
      const response = await fetch(`${API_URL_DWNLD}/download-client/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsRunning(true);
        setError(null);
        toaster.create({
          description: "Download server running",
          type: "success",})
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("Error starting the download client");
    }
  };

  // Detiene el cliente de descarga
  const stopDownloadClient = async () => {
    try {
      const response = await fetch(`${API_URL_DWNLD}/download-client/stop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setIsRunning(false);
        setError(null);
        toaster.create({
          description: "Download server stopped",
          type: "info",})
      } else {
        setError(data.detail);
      }
    } catch (error) {
      setError("Error stopping the download client");
    }
  };

  // Manejador para cambiar el estado del switch
  const handleSwitchChange = (checked: boolean) => {
    if (checked) {
      startDownloadClient();
    } else {
      stopDownloadClient();
    }
  };

  return (
    <div>
      <Toaster />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <Switch
          checked={isRunning}
          onCheckedChange={(e) => handleSwitchChange(e.checked)} // Cambiar estado al hacer click
          colorPalette='green'
        >
        {isRunning ? "  Stop Download Server" : "  Start Download Server"}</Switch>
      </div>
    </div>
  );
};

export default DownloadClientHandler;
