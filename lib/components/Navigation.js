import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function NavLink(props, context) {
  const { activeClassName, inactiveClassName, ...otherProps } = props;
  const isActive = context.router.isActive(props.to, true);
  const className = isActive ? activeClassName : inactiveClassName;

  return <Link {...otherProps} className={[props.className, className].join(' ')} />;
}

NavLink.propTypes = {
  className: PropTypes.string.isRequired,
  activeClassName: PropTypes.string.isRequired,
  inactiveClassName: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

NavLink.contextTypes = {
  router: PropTypes.object.isRequired,
};

// TODO(juliac): toggle children on click of title
function SubMenu(props) {
  const { title, children } = props;

  return (
    <div>
      <div className="sans-serif text-l bold px2 block mb1">
        {title}
      </div>
      <div className="px2">
        {children}
      </div>
    </div>
  );
}

SubMenu.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default function Navigation(props, context) {
  const { router } = context;
  const { menu, location } = props;

  /* Links for menu on large screens */
  const navBar = Object.keys(menu).map((item, idx) => {
    const pages = Object.keys(menu[item].children).map((ns, i) =>
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

    /* Create submenu if we are dealing with a group of items*/
    if (menu[item].inGroup) {
      return (
        <SubMenu title={item} key={idx}>
          {pages}
        </SubMenu>
      );
    }
    return pages;
  });

  /* Native dropdown options. No groups apply */
  const options = Object.keys(menu).map((item) => {
    const pages = Object.keys(menu[item].children).map((ns, i) => {
      const to = `/${ns}`;
      return <option value={to} key={i}>{ns}</option>;
    });
    return pages;
  });


  return (
    <div>
      <div className="md-hide lg-hide p2">
        <select
          className="block col-12"
          defaultValue={location.pathname}
          onChange={(e) => router.push(e.target.value)}
        >
          {options}
        </select>
      </div>


      <div className="xs-hide sm-hide py2 gray">
        {navBar}
      </div>
    </div>
  );
}

Navigation.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

Navigation.propTypes = {
  menu: PropTypes.any,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};
