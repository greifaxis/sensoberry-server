import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { AuthProvider } from './hooks/useAuth';
import Login from './layout/Login';
import Dashboard from './layout/Dashboard';

function App() {
	return (
		<BrowserRouter>
			<Container>
				<AuthProvider>
					<Switch>
						<Redirect exact from='/' to={'/dashboard'} />
						<Route path='/login'>
							<Login />
						</Route>
						<Route path='/dashboard'>
							<Dashboard />
						</Route>
					</Switch>
				</AuthProvider>
			</Container>
		</BrowserRouter>
	);
}

export default App;
