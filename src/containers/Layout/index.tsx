import { ReactNode } from 'react';
import style from './style.module.sass';
import Sidebar from 'components/Sidebar';
import TopBar from 'components/TopBar';

const Layout = ({ children }: { children: ReactNode }) => (
  <main className={style.main}>
    <TopBar />
    <Sidebar />
    <div className={style.content}>{children}</div>
  </main>
);

export default Layout;
