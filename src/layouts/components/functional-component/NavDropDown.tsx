import React, { useState } from "react";

const NavDropDown = ({ menu, pathname }: { menu: any; pathname: any }) => {
  const [showContent, setShowContent] = useState(false);

  const handleChildMenuClick = () => {
    setShowContent(!showContent);
  };
  return (
      <li
        className="nav-item nav-dropdown group"
      >
        <a
          href={menu.url}
          className={`nav-link text-base-sm ${
            (pathname === `${menu.url}/` || pathname === menu.url) && "active"
          }`}
          onClick={(e) => {
            // On mobile, toggle dropdown on first click
            if (window.innerWidth < 1024) {
              e.preventDefault();
              handleChildMenuClick();
            }
            // On desktop, let the link work normally (dropdown shows on hover via CSS)
          }}
        >
          {menu.name}
        </a>
        <ul
          className={`nav-dropdown-list ${
            showContent && "max-lg:block"
          }`}
        >
          {menu.children?.map((child: any, index: number) => (
            <li key={index} className="nav-dropdown-item">
              <a
                href={child.url}
                aria-label={child.name}
                className={`nav-dropdown-link text-base-sm block ${
                  (pathname === `${child.url}/` || pathname === child.url) &&
                  "active"
                }`}
              >
                {child.name}
              </a>

              {/* Render nested children if they exist */}
              {child.hasChildren && child.children && (
                <ul className="nav-dropdown-sublist ml-4">
                  {child.children.map((subChild: any, subIndex: number) => (
                    <li key={subIndex}>
                      <a
                        href={subChild.url}
                        aria-label={subChild.name}
                        className={`nav-dropdown-sublink text-base-sm block py-1.5 px-2 rounded transition hover:text-primary hover:bg-primary/5 ${
                          (pathname === `${subChild.url}/` || pathname === subChild.url) &&
                          "text-primary bg-primary/5"
                        }`}
                      >
                        {subChild.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </li>
  );
};

export default NavDropDown;
