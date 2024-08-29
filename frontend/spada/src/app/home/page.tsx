'use client';
import { FC } from 'react';
import Link from 'next/link';
import buttonstyles from '../../styles/button.module.css'
import contentstyles from '../../styles/content.module.css'
import MainLayout from '../../components/layout/MainLayout';


const Home: FC = () => {
  return (
    <MainLayout>
    <main className={contentstyles.content}>
      <div>
       
          <h1>SPADA</h1>
            <h3>CIASUR - FRT</h3>
              <p>SPADA es una aplicación innovadora diseñada para la gestión eficiente de datos atmosféricos. <br/>Ofrece funcionalidades para:<br/>
              <br/>
      Recopilación de Datos: Descarga y almacena datos atmosféricos en intervalos regulares desde fuentes externas.<br/>
      Análisis y Visualización: Proporciona herramientas para visualizar datos en gráficos interactivos y analizar 
      tendencias a través de diferentes intervalos de tiempo.<br/>
      Interfaz Amigable: Facilita una navegación intuitiva y la configuración de filtros para un análisis detallado.<br/>
      <br/><br/>Con SPADA, obtener y gestionar datos atmosféricos es más sencillo y eficiente, permitiendo una visión clara y 
      accesible de la información esencial.</p>

      <p> CIASUR Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>       
      </div>
    </main>
    </MainLayout>
  );
};

export default Home;
