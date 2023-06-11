import { Container, Tab, Tabs } from '@mui/material';
import React from 'react';
import styled from 'styled-components';

import DashboardPage from '../components/DashboardPage';
import DriverPage from '../components/DriverPage';
import RacePage from '../components/RacePage';
import TeamPage from '../components/TeamPage';
import { filter as filterDriver } from '../redux/features/DriverSlice';
import { filter as filterRace } from '../redux/features/RaceSlice';
import { filter as filterTeam } from '../redux/features/TeamSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';

const MainContainer = styled.div`
	background: #ffffff;
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 0;
`;
const ImageWrapper = styled.div`
	borderradius: 4px;
	width: 100%;
	overflow: hidden;
	padding: 4px;
	height: 220px;
	minheight: 220px;
`;

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <>{children}</>}
		</div>
	);
}

export default function MainPage() {
	const dispatch = useAppDispatch();
	const teams = useAppSelector((state) => state.team.teams);
	const races = useAppSelector((state) => state.race.races);
	const drivers = useAppSelector((state) => state.driver.drivers);

	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const handleFilterTeam = (
		name: string,
		position: number,
		pointRange: number[],
		year: number
	) => {
		dispatch(filterTeam({ name, position, pointRange, year }));
	};

	const handleFilterDriver = (
		name: string,
		nationality: string,
		car: string,
		position: number,
		pointRange: number[],
		year: number
	) => {
		dispatch(
			filterDriver({ name, nationality, car, position, pointRange, year })
		);
	};

	const handleFilterRace = (
		name: string,
		winner: string,
		car: string,
		laps: number[],
		year: number
	) => {
		dispatch(filterRace({ name, winner, car, laps, year }));
	};

	return (
		<MainContainer>
			<ImageWrapper>
				<img
					src={process.env.PUBLIC_URL + "/imgs/backgroundF1_2.jpg"}
					alt="background"
					style={{
						borderRadius: "4px",
						width: "100%",
						height: "220px",
						minHeight: "220px",
						objectFit: "cover",
						imageRendering: "pixelated",
					}}
				/>
			</ImageWrapper>
			<Container sx={{ minWidth: "100%", overflow: "auto" }}>
				<Tabs value={value} onChange={handleChange} aria-label="tabs">
					<Tab label="Dashboard" />
					<Tab label="Race"/>
					<Tab label="Team" />
					<Tab label="Driver" />
				</Tabs>
				<TabPanel value={value} index={0}>
					<DashboardPage></DashboardPage>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<RacePage filter={handleFilterRace} races={races}></RacePage>
				</TabPanel>
				<TabPanel value={value} index={2}>
					<TeamPage filter={handleFilterTeam} teams={teams}></TeamPage>
				</TabPanel>
				<TabPanel value={value} index={3}>
					<DriverPage
						filter={handleFilterDriver}
						drivers={drivers}
					></DriverPage>
				</TabPanel>
			</Container>
		</MainContainer>
	);
}
