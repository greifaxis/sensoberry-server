import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BoxArrowLeft, Gear, ListUl, ClipboardData, BellFill } from 'react-bootstrap-icons';
import NavLink from '../components/NavLink';

interface TopBarProps {
	onLogoutClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLogoutClick }) => {
	return (
		<Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
			<LinkContainer to='/'>
				<Navbar.Brand>Sensoberry</Navbar.Brand>
			</LinkContainer>

			<Navbar.Toggle aria-controls='responsive-navbar-nav' />
			<Navbar.Collapse id='responsive-navbar-nav'>
				<Nav className='mr-auto'>
					<NavLink title='Pomiary' to='/dashboard'>
						<ClipboardData />
					</NavLink>

					<NavLink title='Lista czujników' to='/dashboard/sensors'>
						<ListUl />
					</NavLink>

					<NavLink title='Powiadomienia' to='/dashboard/notifications'>
						<BellFill />
					</NavLink>

					{/* <NavDropdown title='Dropdown' id='collapsible-nav-dropdown'>
						<NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.2'>Another action</NavDropdown.Item>
						<NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item href='#action/3.4'>Separated link</NavDropdown.Item>
					</NavDropdown> */}
				</Nav>
				<Nav>
					<NavLink title='Ustawienia' to='/dashboard/settings'>
						<Gear />
					</NavLink>

					<NavLink title='Wyloguj' onClick={onLogoutClick}>
						<BoxArrowLeft />
					</NavLink>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	);
};

export default TopBar;
