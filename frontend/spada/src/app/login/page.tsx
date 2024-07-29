import { FC } from 'react';
import BackButton from '../../components/backbutton';
import contentstyles from '../../styles/content.module.css'

const DashboardPage: FC = () => {
  return (
    <main className={contentstyles.content}>
      <h1>Login Page</h1>
      {/* Aquí puedes agregar gráficas y estadísticas */}
      <BackButton />
    </main>
  );
};

export default DashboardPage;