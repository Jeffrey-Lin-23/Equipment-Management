import React, { useState } from "react"
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from "reactstrap"
import { Link } from "react-router-dom"
import "./NavMenu.css"

export const NavCopy = () => {
  const [collapsed, setCollapsed] = useState({
    collapsed: true
  })

  const toggleNavbar = () => {
    setCollapsed({
      collapsed: !collapsed
    })
  }

  return (
    <div>
      <header>
        <Navbar
          className='navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'
          light>
          <Container>
            <NavbarBrand tag={Link} to='/'>
              AlphaSystem
            </NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className='mr-2' />
            <Collapse
              className='d-sm-inline-flex flex-sm-row-reverse'
              isOpen={!collapsed}
              navbar>
              <ul className='navbar-nav flex-grow'>
                <NavItem>
                  <NavLink tag={Link} className='text-dark' to='/TotalItems'>
                    Total Items
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  )
}
