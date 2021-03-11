import React, { CSSProperties } from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

interface NavLinkProps {
	title: string;
	to?: string;
	onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ title, to, onClick, children }) => {
	if (typeof to === 'string') {
		return (
			<LinkContainer style={linkWithIconStyle} to={to}>
				<Nav.Link>
					{children}
					<p>&nbsp;</p>
					{title}
				</Nav.Link>
			</LinkContainer>
		);
	}

	if (typeof onClick === 'function') {
		return (
			<Nav.Link style={linkWithIconStyle} onClick={onClick}>
				{children}
				<p>&nbsp;</p>
				{title}
			</Nav.Link>
		);
	}

	return null;
};

const linkWithIconStyle: CSSProperties = { display: 'flex', alignItems: 'center' };

export default NavLink;
