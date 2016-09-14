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

export default function Navigation(props, context) {
  const { router } = context;
  const { cards } = props;
  const links = Object.keys(cards).map((ns, i) =>
    <NavLink
      to={`/${ns}`}
      className="sans-serif text-l bold px2 block no-underline mb1"
      key={i}
      inactiveClassName="gray blue-hover"
      activeClassName="dark-gray"
    >
      {ns}
    </NavLink>
  );
  const options = Object.keys(cards).map((ns, i) => {
    const to = `/${ns}`;
    return <option value={to} selected={router.isActive(to)} key={i}>{ns}</option>;
  });

  return (
    <div>
      <div className="md-hide lg-hide p2">
        <select className="block col-12" onChange={(e) => router.push(e.target.value)}>
          {options}
        </select>
      </div>
      <div className="xs-hide sm-hide py2 gray">
        {links}
      </div>
    </div>
  );
}

Navigation.contextTypes = {
  router: PropTypes.instanceOf(Router).isRequired,
};

Navigation.propTypes = {
  cards: PropTypes.any,
};
