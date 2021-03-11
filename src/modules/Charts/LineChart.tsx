import React from 'react';
import { ResponsiveLine, Serie } from '@nivo/line';
import { formatDateTimestamp, getChartConfig } from './helpers';
import * as P from './parts';
import { ReadingIntervalMode } from '../../apiModels';

interface LineChartProps {
	data: Serie[];
	mode: ReadingIntervalMode;
	unit: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, unit, mode }) => {
	const { minDate, maxDate, bottomAxisFormat, tickValues } = getChartConfig(mode, new Date());
	console.log(mode);
	return (
		<P.ChartContainer>
			<ResponsiveLine
				data={data}
				margin={{ top: 10, right: 110, bottom: 50, left: 60 }}
				xScale={{
					type: 'time',
					format: '%d.%m.%Y %H:%M:%S',
					useUTC: false,
					precision: 'second',
					min: minDate,
					max: maxDate,
				}}
				xFormat='time:%d.%m.%Y %H:%M:%S'
				yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
				yFormat=' >-.2f'
				axisBottom={{
					format: bottomAxisFormat,
					orient: 'bottom',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'data odczytu',
					legendOffset: 30,
					legendPosition: 'middle',
					tickValues: tickValues,
				}}
				axisLeft={{
					orient: 'left',
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: unit,
					legendOffset: -55,
					legendPosition: 'middle',
				}}
				pointSize={5}
				pointColor={{ theme: 'background' }}
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-12}
				useMesh={true}
				legends={[
					{
						anchor: 'bottom-right',
						direction: 'column',
						justify: false,
						translateX: 100,
						translateY: 0,
						itemsSpacing: 0,
						itemDirection: 'left-to-right',
						itemWidth: 80,
						itemHeight: 20,
						itemOpacity: 0.75,
						symbolSize: 12,
						symbolShape: 'circle',
						symbolBorderColor: 'rgba(0, 0, 0, .5)',
						effects: [
							{
								on: 'hover',
								style: {
									itemBackground: 'rgba(0, 0, 0, .03)',
									itemOpacity: 1,
								},
							},
						],
					},
				]}
			/>
			<P.LegendContainer>
				<P.Legend>
					<P.TitleSpan>Pierwszy odczyt</P.TitleSpan>
					<P.DateSpan>{formatDateTimestamp(data[0]?.timestamp)}</P.DateSpan>
				</P.Legend>

				<P.Legend>
					<P.TitleSpan>Ostatni odczyt</P.TitleSpan>
					<P.DateSpan>{formatDateTimestamp(data[data.length - 1]?.timestamp)}</P.DateSpan>
				</P.Legend>
			</P.LegendContainer>
			<P.ChartHr />
		</P.ChartContainer>
	);
};

export default LineChart;
