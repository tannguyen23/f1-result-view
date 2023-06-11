import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';

interface PieChartProps {
	title: string;
	pieData: number[];
	pieTitle: string;
	categories: string[];
}

export default function PieChart(props: PieChartProps) {
	const options: ApexOptions = {
		chart: {
			width: 380,
			type: "pie",
		},
		labels: props.categories,
		title: { align: "center", text: props.title },
	};

	const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined =
		props.pieData;

	return (
		<>
			<ReactApexChart
				options={options}
				series={props.pieData}
				type="pie"
				label={true}
				width="480"
			/>
		</>
	);
}
