import dataDrivers from '../storage/dataDrivers.json';
import dataRaces from '../storage/dataRaces.json';
import dataTeams from '../storage/dataTeams.json';
import { Driver } from '../types/driverResultType';
import { Race } from '../types/raceResultType';
import { Team } from '../types/teamResultType';

const getDataFromDriversJson = (): Driver[] => {
	return dataDrivers;
};
const getDataFromTeamsJson = (): Team[] => {
	return dataTeams;
};
const getDataFromRacesJson = (): Race[] => {
	return dataRaces;
};
const getMaxPointsFromTeamJson = () => {
	const points: number[] = dataTeams.map((value) => value.point);
	const maxPoint = Math.max(...points);
	console.log(`maxPoints: ${maxPoint}`);
	return maxPoint;
};

const getMinPointsFromTeamJson = () => {
	const points: number[] = dataTeams.map((value) => value.point);
	const minPoint = Math.min(...points);
	console.log(`minPoints : ${minPoint}`);
	return minPoint;
};

const getMaxPosFromTeamJson = () => {
	const positions: number[] = [];
	dataTeams.map((value) => {
		if (value.position !== null) positions.push(value.position);
	});
	const maxPos = Math.max(...positions);
	return maxPos;
};

const getMinPosFromTeamJson = () => {
	const positions: number[] = [];
	dataTeams.map((value) => {
		if (value.position !== null) positions.push(value.position);
	});
	const minPos = Math.min(...positions);
	return minPos;
};

const getMaxPointsFromDriverJson = () => {
	const points: number[] = dataDrivers.map((value) => value.point);
	const maxPoint = Math.max(...points);
	console.log(`maxPoints: ${maxPoint}`);
	return maxPoint;
};

const getMinPointsFromDriverJson = () => {
	const points: number[] = dataDrivers.map((value) => value.point);
	const minPoint = Math.min(...points);
	console.log(`minPoints : ${minPoint}`);
	return minPoint;
};

const getMaxPosFromDriverJson = () => {
	const positions: number[] = [];
	dataDrivers.map((value) => {
		if (value.position !== null) positions.push(value.position);
	});
	const maxPos = Math.max(...positions);
	return maxPos;
};

const getMinPosFromDriverJson = () => {
	const positions: number[] = [];
	dataDrivers.map((value) => {
		if (value.position !== null) positions.push(value.position);
	});
	const minPos = Math.min(...positions);
	return minPos;
};

const getMaxLapFromRaceJson = () => {
	const laps: number[] = [];
	dataRaces.map((value) => {
		if (value.laps !== undefined && value.laps !== null) laps.push(value.laps);
	});
	const maxLaps = Math.max(...laps);
	return maxLaps;
};

const getMinLapFromRaceJson = () => {
	const laps: number[] = [];
	dataRaces.map((value) => {
		if (value.laps !== undefined && value.laps !== null) laps.push(value.laps);
	});
	const minLaps = Math.min(...laps);
	return minLaps;
};

const getAllTeamFromTeamJson = () => {
	const teams: { id: string; name: string }[] = [];
	dataTeams.map((value) => {
		if (teams.filter((e) => e.name === value.name).length <= 0)
			teams.push({id : value.id, name: value.name});
	});
	return teams;
};

const getAllDriverFromDriverJson = () => {
	const drivers : {id : string ; name : string}[] = [];
	dataDrivers.map((value) => {
		if (drivers.filter((e) => e.name === value.name).length <= 0)
		drivers.push({id : value.id, name: value.name});
	});
	return drivers;
}

const getAllRacesFromRacesJson = () => {
	const races :{id : string ; name : string}[] = [];
	dataRaces.map((value)=> {
		if (races.filter((e) => e.name === value.name).length <= 0)
		races.push({id : value.id, name: value.name});
	})
	return races;
}

const getAllNationalityFromDriverJson = () => {
	const nat :{id : string ; name : string}[] = [];
	dataDrivers.map((value)=> {
		if (nat.filter((e) => e.name === value.nationality).length <= 0)
		nat.push({id : value.id, name: value.nationality});
	})
	return nat;
}

export {
	getDataFromDriversJson,
	getDataFromTeamsJson,
	getDataFromRacesJson,
	getMaxPointsFromTeamJson,
	getMinPointsFromTeamJson,
	getMaxLapFromRaceJson,
	getMinLapFromRaceJson,
	getMaxPointsFromDriverJson,
	getMinPointsFromDriverJson,
	getMaxPosFromTeamJson,
	getMinPosFromTeamJson,
	getMaxPosFromDriverJson,
	getMinPosFromDriverJson,
	getAllTeamFromTeamJson,
	getAllDriverFromDriverJson,
	getAllRacesFromRacesJson,
	getAllNationalityFromDriverJson
};
