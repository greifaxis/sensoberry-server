import React, { CSSProperties } from 'react';

interface SectionContainerProps {
	title: string;
	shouldHaveSeparator?: boolean;
}

const SectionContainer: React.FC<SectionContainerProps> = ({ title, shouldHaveSeparator = true, children }) => {
	return (
		<>
			<h2 className='my-4'>{title}</h2>
			{children}
			{shouldHaveSeparator && <hr style={hrStyles} />}
		</>
	);
};

const hrStyles: CSSProperties = {
	borderTop: '2px solid #bbb',
};

export default SectionContainer;
