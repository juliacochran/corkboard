import React, { PropTypes } from 'react';
import { Link, Router } from 'react-router';

function NavLink(props, context) {
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? props.activeClassName : props.inactiveClassName;

  return <Link {...props} className={[props.className, className].join(' ')} />;
}

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired,
  inactiveClassName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavLink.contextTypes = {
  router: PropTypes.instanceOf(Router).isRequired,
};

export default function Navigation(props) {
  const { cards } = props;
  const links = Object.keys(cards).map((ns, i) =>
    <NavLink
        to={`/${ns}`}
        className="sans-serif text-l bold px2 block no-underline mb1"
        key={i}
        inactiveClassName="gray blue-hover"
        activeClassName="dark-gray">
      {ns}
    </NavLink>
  );

  return (
    <div className="py2 gray">
      {links}
    </div>
  );
}

Navigation.propTypes = {
  cards: PropTypes.any,
};
