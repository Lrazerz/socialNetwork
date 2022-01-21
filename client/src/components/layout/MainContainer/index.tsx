import { Outlet } from 'react-router-dom';
import Alerts from 'components/layout/Alerts';

const MainContainer = () => (
  <section className="container">
    <Alerts />
    <Outlet />
  </section>
);

export default MainContainer;
