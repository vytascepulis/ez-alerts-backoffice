import style from './style.module.sass';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from 'containers/App/utils.ts';
import classnames from 'classnames';

const Sidebar = () => {
  const { pathname } = useLocation();

  return (
    <div className={style.sidebar}>
      {Object.entries(ROUTES).map((route) => {
        const routeId = route[0];
        const routeData = route[1];

        const isActive = pathname === routeData.url;

        const routeLinkClassname = classnames(style.routeLink, {
          [style.isActive]: isActive,
        });

        return (
          <Link className={routeLinkClassname} to={routeData.url} key={routeId}>
            {routeData.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Sidebar;
