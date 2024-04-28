import { ReactNode } from 'react';
import style from './style.module.sass';
import Sidebar from 'components/Sidebar';
import TopBar from 'components/TopBar';
import ToastProvider from '../../contexts/ToastProvider';

const Layout = ({ children }: { children: ReactNode }) => (
  <ToastProvider>
    <main className={style.main}>
      <TopBar />
      <Sidebar />
      <div className={style.content}>{children}</div>
    </main>
  </ToastProvider>
);

export default Layout;
