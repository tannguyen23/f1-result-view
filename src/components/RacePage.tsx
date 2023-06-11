import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import TablePaginationActions from '@mui/material/TablePagination/TablePaginationActions';
import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import { Race } from '../types/raceResultType';
import { getArrYear } from '../utils/getArrYear';
import { getMaxLapFromRaceJson, getMinLapFromRaceJson } from '../utils/getDataFromJson';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

function getStyles(
	name: string,
	positionName: readonly string[],
	theme: Theme
) {
	return {
		fontWeight:
			positionName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

interface RacePageProps {
	races: Race[];
	filter: (
		name: string,
		winner: string,
		car: string,
		laps: number[],
		year: number
	) => void;
}

export default function RacePage(props: RacePageProps) {
	const theme = useTheme();
	var currentTime = new Date();
	var currenYear: number = currentTime.getFullYear();
	const minLap: number = getMinLapFromRaceJson();
	const maxLap: number = getMaxLapFromRaceJson();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [name, setName] = useState("");
	const [winner, setWinner] = useState("");
	const [car, setCar] = useState("");
	const [lapRange, setLapRange] = useState<number[]>([minLap, maxLap]);
	const [year, setYear] = useState<number>(currenYear);

	//Handle change filter

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handleChangeWinner = (event: React.ChangeEvent<HTMLInputElement>) => {
		setWinner(event.target.value);
	};
	const handleChangeCar = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCar(event.target.value);
	};

	const handleChangeLapRange = (event: Event, newValue: number | number[]) => {
		setLapRange(newValue as number[]);
	};

	const handleChangeYear = (event: SelectChangeEvent<number>) => {
		if (typeof event.target.value === "number") {
			setYear(event.target.value);
		} else {
			setYear(-1);
		}
	};

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	useEffect(() => {
		console.log("Co chay vo useEffect()");
		setPage(0);
		props.filter(name, winner, car, lapRange, year);
	}, [name, winner, car, lapRange, year]);

	const columns: GridColDef[] = [
		{
			field: "index",
			headerName: "Order",
			width: 150,
			sortable: false,
			align: "center",
			headerAlign: "center",
		},
		{
			field: "name",
			headerName: "Name",
			width: 280,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "date",
			headerName: "Date",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "winner",
			headerName: "Winner",
			width: 180,
			type: "number",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "car",
			headerName: "Car",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "laps",
			headerName: "Laps",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "time",
			headerName: "Times",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "year",
			headerName: "Year",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
	];

	const rows = props.races.map((race, index) => {
		return {
			id: race.id,
			index: index + 1,
			name: race.name,
			date: race.date,
			winner: race.winner,
			car: race.car,
			laps: race.laps,
			time: race.times,
			year: race.year,
		};
	});

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const positions = ["1", "2", "3", "4", "5", "6"];
	const yearsDropdown = getArrYear();

	return (
		<Container>
			<Typography variant="h4" padding={1} textAlign={"center"}>
				RACE F1 RESULT
			</Typography>
			<Box
				display={"flex"}
				justifyContent={"space-between"}
				paddingY={1}
				alignItems={"center"}
				flexWrap={"wrap"}
				gap={3}
			>
				<FormControl sx={{ minWidth: 120 }} size="small">
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						label=""
						placeholder="Name Race"
						variant="outlined"
						size="small"
						value={name}
						onChange={handleChangeName}
					/>
				</FormControl>
				<FormControl sx={{ minWidth: 120 }} size="small">
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						label=""
						placeholder="Winner Race"
						variant="outlined"
						size="small"
						value={winner}
						onChange={handleChangeWinner}
					/>
				</FormControl>
				<FormControl sx={{ minWidth: 120 }} size="small">
					<TextField
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<SearchIcon />
								</InputAdornment>
							),
						}}
						label=""
						placeholder="Car"
						variant="outlined"
						size="small"
						value={car}
						onChange={handleChangeCar}
					/>
				</FormControl>

				<FormControl sx={{ minWidth: 180 }} size="small">
					<Typography>Laps</Typography>
					<Slider
						min={minLap}
						max={maxLap}
						getAriaLabel={() => "Lap range"}
						value={lapRange}
						onChange={handleChangeLapRange}
						valueLabelDisplay="auto"
						getAriaValueText={() => "point"}
					/>
				</FormControl>
				<FormControl sx={{ minWidth: 120 }} size="small">
					<InputLabel id="label-year">Year</InputLabel>
					<Select
						labelId="label-year"
						id="select-year"
						value={year}
						label="Year"
						onChange={handleChangeYear}
						MenuProps={MenuProps}
					>
						{yearsDropdown.map((year, index) => (
							<MenuItem key={index} value={year}>
								{year}
							</MenuItem>
						))}
						<MenuItem key={""} value={-1}>
							All
						</MenuItem>
					</Select>
				</FormControl>
			</Box>

			<TableContainer component={Paper}>
				<Table aria-label="table">
					<TableHead>
						<TableRow sx={{ background: "#3b3b3b" }}>
							{columns.map((column) => (
								<TableCell
									align="center"
									sx={{ color: "#ffffff" }}
									key={column.field}
								>
									{column.headerName}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{(rowsPerPage > 0
							? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							: rows
						).map((row) => (
							<TableRow key={row.id}>
								<TableCell style={{ width: 160 }} align="center">
									{row.index}
								</TableCell>
								<TableCell style={{ width: 160 }} align="left">
									{row.name}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.date}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.winner}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.car}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.laps}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.time}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.year}
								</TableCell>
							</TableRow>
						))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={columns.length} />
							</TableRow>
						)}
					</TableBody>
					<TableFooter>
						<TableRow>
							<TablePagination
								rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
								colSpan={columns.length}
								count={rows.length}
								rowsPerPage={rowsPerPage}
								page={page}
								SelectProps={{
									inputProps: {
										"aria-label": "rows per page",
									},
									native: true,
								}}
								onPageChange={handleChangePage}
								onRowsPerPageChange={handleChangeRowsPerPage}
								ActionsComponent={TablePaginationActions}
							/>
							{/* <Stack spacing={2}>
								<Pagination
									count={10}
									renderItem={(item) => (
										<PaginationItem
											slots={{
												previous: ArrowBackIcon,
												next: ArrowForwardIcon,
											}}
											{...item}
										/>
									)}
								/>
							</Stack> */}
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Container>
	);
}
