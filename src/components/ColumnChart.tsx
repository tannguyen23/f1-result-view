import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

interface ColumnChartProps {
	title: string;
	columnData: (number | null)[];
	columnTitle: string;
	categories: string[];
	nameTeam: string;
}

export default function ColumnChart (props: ColumnChartProps)  {
	const options: ApexOptions = {
		chart: {
			height: 350,
			type: "line",
			zoom: {
				enabled: true,
			},
		},
		stroke: {
			width: [1.4],
		},
		title: {
			text: `${props.title} of ${props.nameTeam}`,
		},
		xaxis: { 
			categories: props.categories },
	};

	const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [
		{
			name: props.columnTitle ,
			data: props.columnData,
			type: "column",
		},
	];
  

	return (
		<>
			<ReactApexChart
				options={options}
				series={series}
				type="line"
				height={350}
				label={true}
			/>
		</>
	);
};