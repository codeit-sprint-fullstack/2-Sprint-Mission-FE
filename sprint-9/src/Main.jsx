import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { UserProvider } from './context/UserProvider.jsx';
import Profile from './pages/Profile.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ViewportProvider from './context/ViewportProvider.jsx';

function Main() {
	return (
		<UserProvider>
			<ViewportProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<App />}>
							<Route index element={<HomePage />} />
							<Route path="login" element={<LogInPage />} />
							<Route path="signup" element={<SignUpPage />} />
							<Route path="profile" element={<Profile />} />
							<Route path="*" element={<NotFoundPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ViewportProvider>
		</UserProvider>
	);
}

export default Main;
