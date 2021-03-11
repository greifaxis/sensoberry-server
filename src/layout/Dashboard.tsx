import React, { useContext, useEffect } from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import { AuthContext } from '../hooks/useAuth';
import SensorPage from '../modules/SensorPage';
import SensorsList from '../modules/SensorsList';
import Settings from '../modules/Settings/Settings';
import TopBar from './TopBar';

const Dashboard: React.FC = () => {
	const match = useRouteMatch();
	const { isAuth, logout } = useContext(AuthContext);

	useEffect(() => {
		document.title = 'Sensoberry - Dashboard';
	}, []);

	if (!isAuth) {
		return <Redirect to='/login' />;
	}

	return (
		<>
			<TopBar onLogoutClick={logout} />
			<Container>
				<Switch>
					<Route exact path={match.path}>
						<Jumbotron>
							<h1>Dashboard</h1>
						</Jumbotron>
					</Route>
					<Route exact path={`${match.path}/sensors`}>
						<SensorsList />
					</Route>

					<Route path={`${match.path}/sensors/:id`}>
						<SensorPage />
					</Route>

					<Route path={`${match.path}/settings`}>
						<Settings />
					</Route>
				</Switch>
			</Container>
		</>
	);
};

export default Dashboard;
