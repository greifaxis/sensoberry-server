import React, { CSSProperties, useEffect, useState } from 'react';
import { Badge, OverlayTrigger, Popover } from 'react-bootstrap';
import { InfoCircle } from 'react-bootstrap-icons';

interface InfoPopoverProps {
	text: string;
	title?: string;
	placement?: 'top' | 'right' | 'bottom' | 'left';
}

const InfoPopover: React.FC<InfoPopoverProps> = ({ text, title, placement = 'top' }) => {
	const [show, setShow] = useState(false);
	const [disableTimeout, setDisableTimeout] = useState<number>();

	useEffect(() => {
		return () => {
			setShow(false);
			clearTimeout(disableTimeout);
		};
	}, []);

	const onPopoverClick = () => {
		setShow(true);

		const disableTimeout = setTimeout(() => {
			setShow(false);
		}, 2500);

		setDisableTimeout((disableTimeout as unknown) as number);
	};

	return (
		<OverlayTrigger
			show={show}
			trigger='click'
			placement={placement}
			overlay={
				<Popover id={`popover-positioned-${placement}`}>
					{title && <Popover.Title as='h3'>{`Popover ${placement}`}</Popover.Title>}
					<Popover.Content>{text}</Popover.Content>
				</Popover>
			}
		>
			<Badge variant='light' style={infoBadgeStyles} onClick={onPopoverClick}>
				<InfoCircle color='royalblue' size={20} />
			</Badge>
		</OverlayTrigger>
	);
};

const infoBadgeStyles: CSSProperties = {
	cursor: 'help',
};

export default InfoPopover;
