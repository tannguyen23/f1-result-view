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

import { Driver } from '../types/driverResultType';
import { getArrYear } from '../utils/getArrYear';
import {
  getMaxPointsFromDriverJson,
  getMaxPosFromDriverJson,
  getMinPointsFromDriverJson,
  getMinPosFromDriverJson,
} from '../utils/getDataFromJson';

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

function getNumberRangeArr(min: number, max: number) {
	const result: number[] = [];
	for (let i = min; i <= max; i++) {
		result.push(i);
	}
	return result;
}

interface DriverPageProps {
	drivers: Driver[];
	filter: (
		name: string,
		nationality: string,
		car: string,
		position: number ,
		pointRange: number[],
		year: number
	) => void;
}

export default function DriverPage(props: DriverPageProps) {
	const theme = useTheme();
	var currentTime = new Date();
	var currenYear: number = currentTime.getFullYear();
	const minPoint: number = getMinPointsFromDriverJson();
	const maxPoint: number = getMaxPointsFromDriverJson();
	const minPos: number = getMinPosFromDriverJson();
	const maxPos: number = getMaxPosFromDriverJson();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);

	const [name, setName] = useState("");
	const [nationality, setNationality] = useState("");
	const [car, setCar] = useState("");
	const [position, setPosition] = useState<number>(-1);
	const [pointRange, setPointRange] = useState<number[]>([minPoint, maxPoint]);
	const [year, setYear] = useState<number>(currenYear);

	//Handle change filter

	const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};
	const handleChangeNationality = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setNationality(event.target.value);
	};
	const handleChangeCar = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCar(event.target.value);
	};

	const handleChangePointRange = (
		event: Event,
		newValue: number | number[]
	) => {
		setPointRange(newValue as number[]);
	};

	const handleChangeYear = (event: SelectChangeEvent<number>) => {
		if (typeof event.target.value === "number") {
			setYear(event.target.value);
		} else {
			setYear(-1);
		}
	};

	const handleChangePosition = (event: SelectChangeEvent<number>) => {
		if (typeof event.target.value === "number") {
			setPosition(event.target.value);
		} else {
			setPosition(-1);
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
		props.filter(name,nationality,car, position, pointRange, year);
	}, [name,nationality,car, position, pointRange, year]);

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
			field: "nationality",
			headerName: "Nationality",
			width: 180,
			type: "number",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "position",
			headerName: "Position",
			width: 180,
			type: "number",
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
		{
			field: "point",
			headerName: "Point",
			width: 180,
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
			field: "year",
			headerName: "Year",
			width: 180,
			align: "center",
			headerAlign: "center",
			sortable: false,
		},
	];

	const rows = props.drivers.map((driver, index) => {
		return {
			id: driver.id,
			index: index + 1,
			name: driver.name,
			nationality: driver.nationality,
			position: driver.position,
			point: driver.point,
			car: driver.car,
			year: driver.year,
		};
	});

	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	const positions = getNumberRangeArr(minPos, maxPos);
	const yearsDropdown = getArrYear();

	return (
		<Container>
			<Typography variant="h4" padding={1} textAlign={"center"}>
				DRIVER F1 RESULT
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
						placeholder="Name Driver"
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
						placeholder="Nationality"
						variant="outlined"
						size="small"
						value={nationality}
						onChange={handleChangeNationality}
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
				<FormControl sx={{ width: 300 }}>
					<InputLabel>Position</InputLabel>
					<Select
						size="small"
						labelId="label-position"
						id="select-position"
						value={position}
						label="Position"
						onChange={handleChangePosition}
						MenuProps={MenuProps}
					>
						{positions.map((currentPosition, index) => (
							<MenuItem key={index} value={currentPosition}>
								{currentPosition}
							</MenuItem>
						))}
						<MenuItem key={""} value={-1}>
							All
						</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ minWidth: 180 }} size="small">
					<Typography>Point</Typography>
					<Slider
						min={minPoint}
						max={maxPoint}
						getAriaLabel={() => "Point range"}
						value={pointRange}
						onChange={handleChangePointRange}
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

			{/* <DataGrid
			getRowId={(row) => row.id}
				disableColumnMenu
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
			/> */}

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
									{row.nationality}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.position}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.point}
								</TableCell>
								<TableCell style={{ width: 160 }} align="center">
									{row.car}
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
						</TableRow>
					</TableFooter>
				</Table>
			</TableContainer>
		</Container>
	);
}
