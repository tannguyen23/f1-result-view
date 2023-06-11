import { Container, Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';

import { loadChart as loadChartDriver, loadPieChart as loadPieChartDriver } from '../redux/features/DriverSlice';
import { loadChart as loadChartRace } from '../redux/features/RaceSlice';
import { loadChart as loadChartTeam, loadPieChart as loadPieChartTeam } from '../redux/features/TeamSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { getAllDriverFromDriverJson, getAllRacesFromRacesJson, getAllTeamFromTeamJson } from '../utils/getDataFromJson';
import ColumnChart from './ColumnChart';
import LineColumnChart from './LineColumnChart';
import PieChart from './PieChart';

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

export default function DashboardPage() {
	const teamChart = useAppSelector((state) => state.team.teamChart);
	const raceChart = useAppSelector((state) => state.race.raceChart);
	const driverChart = useAppSelector((state) => state.driver.driverChart);
	const driverPieChart = useAppSelector((state) => state.driver.driverPieChart);
	const teamPieChart = useAppSelector((state) => state.team.teamPieChart);
	const dispatch = useAppDispatch();
	const teamDropDown: { id: string; name: string }[] = getAllTeamFromTeamJson();
	const raceDropDown: { id: string; name: string }[] =
		getAllRacesFromRacesJson();
	const driverDropDown: { id: string; name: string }[] =
		getAllDriverFromDriverJson();

	const [currentTeam, setCurrentTeam] = useState<string>(teamDropDown[2].name);
	const [currentRace, setCurrentRace] = useState<string>(raceDropDown[2].name);
	const [currentDriver, setCurrentDriver] = useState<string>(
		driverDropDown[2].name
	);

	const handleChangeCurrentTeam = (event: SelectChangeEvent<string>) => {
		setCurrentTeam(event.target.value);
	};
	const handleChangeCurrentDriver = (event: SelectChangeEvent<string>) => {
		setCurrentDriver(event.target.value);
	};
	const handleChangeCurrentRace = (event: SelectChangeEvent<string>) => {
		setCurrentRace(event.target.value);
	};

	useEffect(() => {
		dispatch(loadChartRace({ nameRace: currentRace }));
	}, [currentRace]);

	useEffect(() => {
		dispatch(loadChartTeam({ nameTeam: currentTeam }));
	}, [currentTeam]);

	useEffect(() => {
		dispatch(loadChartDriver({ nameDriver: currentDriver }));
	}, [currentDriver]);

	useEffect(() => {
		dispatch(loadPieChartDriver());
		dispatch(loadPieChartTeam());
	}, []);

	return (
		<Container maxWidth={"lg"}>
			<Grid
				container
				display={"flex"}
				sx={{ flexDirection: "row", alignItems: "center",justifyContent : 'space-around', marginY : 2 }}
			>
				{driverPieChart && (
					<PieChart
						title="Percent top 1 of nationality"
						pieData={driverPieChart?.countWin}
						pieTitle="1111"
						categories={driverPieChart?.categories}
					></PieChart>
				)}
				{teamPieChart && (
					<PieChart
						title="Percent of championships of the teams "
						pieData={teamPieChart?.countWin}
						pieTitle="1111"
						categories={teamPieChart?.categories}
					></PieChart>
				)}
			</Grid>
			<Divider sx={{ marginY: 1 }} />
			<Grid
				container
				display={"flex"}
				sx={{ flexDirection: "row", alignItems: "flex-start" }}
			>
				<Grid md={4}>
					<Typography>Select a team to view Achievements </Typography>
					<FormControl sx={{ minWidth: 240, marginY: 2 }} size="medium">
						<InputLabel id="label-team">Team</InputLabel>
						<Select
							labelId="label-team"
							id="select-team"
							value={currentTeam}
							label="Team"
							onChange={handleChangeCurrentTeam}
							MenuProps={MenuProps}
						>
							{teamDropDown.map((team, index) => (
								<MenuItem key={index} value={team.name}>
									{team.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{currentTeam && teamChart && (
					<Grid md={8}>
						<LineColumnChart
							title="Achievements year by year"
							columnTitle={"Position"}
							lineTitle={"Point"}
							categories={teamChart?.categories}
							columnData={teamChart?.positions}
							lineData={teamChart?.points}
							nameTeam={currentTeam}
						/>
					</Grid>
				)}
			</Grid>
			<Divider sx={{ marginY: 1 }} />
			<Grid
				container
				display={"flex"}
				sx={{ flexDirection: "row", alignItems: "flex-start" }}
			>
				<Grid md={4}>
					<Typography>Select a driver to view Achievements </Typography>
					<FormControl sx={{ minWidth: 240, marginY: 2 }} size="medium">
						<InputLabel id="label-driver">Driver</InputLabel>
						<Select
							labelId="label-driver"
							id="select-driver"
							value={currentDriver}
							label="Driver"
							onChange={handleChangeCurrentDriver}
							MenuProps={MenuProps}
						>
							{driverDropDown.map((driver, index) => (
								<MenuItem key={index} value={driver.name}>
									{driver.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				{currentDriver && driverChart && (
					<Grid md={8}>
						<LineColumnChart
							title="Achievements year by year"
							columnTitle={"Position"}
							lineTitle={"Point"}
							categories={driverChart?.categories}
							columnData={driverChart?.positions}
							lineData={driverChart?.points}
							nameTeam={currentDriver}
						/>
					</Grid>
				)}
			</Grid>
			<Divider sx={{ marginY: 1 }} />
			<Grid
				container
				display={"flex"}
				sx={{ flexDirection: "row", alignItems: "flex-start" }}
			>
				<Grid md={4}>
					<Typography>Select a race to view Achievements </Typography>
					<FormControl sx={{ minWidth: 240, marginY: 2 }} size="medium">
						<InputLabel id="label-driver">Race</InputLabel>
						<Select
							labelId="label-race"
							id="select-race"
							value={currentRace}
							label="Race"
							onChange={handleChangeCurrentRace}
							MenuProps={MenuProps}
						>
							{raceDropDown.map((race, index) => (
								<MenuItem key={index} value={race.name}>
									{race.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{raceChart && raceChart && (
					<Grid md={8}>
						<ColumnChart
							title="Laps of the race year by year"
							columnTitle={"Laps"}
							categories={raceChart.categories}
							columnData={raceChart?.laps}
							nameTeam={currentRace}
						/>
					</Grid>
				)}
			</Grid>
		</Container>
	);
}
