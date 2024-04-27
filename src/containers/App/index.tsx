import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../Dashboard';
import { ROUTES } from './utils';
import Layout from '../Layout';
import Users from '../Users';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTES.DASHBOARD.url}
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path={ROUTES.USERS.url}
          element={
            <Layout>
              <Users />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
