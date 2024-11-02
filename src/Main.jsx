import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import { UserProvider } from './context/UserProvider.jsx';
import Profile from './pages/Profile.jsx';
import LogInPage from './pages/LogInPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import ViewportProvider from './context/ViewportProvider.jsx';
import ItemsPage from './pages/ItemsPage.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ItemDetailPage from './pages/ItemDetailPage.jsx';

const queryClient = new QueryClient();

function Main() {
	return (
		<QueryClientProvider client={queryClient}>
			<UserProvider>
				<ViewportProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<App />}>
								<Route index element={<HomePage />} />
								<Route path="login" element={<LogInPage />} />
								<Route path="signup" element={<SignUpPage />} />
								<Route path="profile" element={<Profile />} />
								<Route path="items">
									<Route index element={<ItemsPage />} />
									<Route path=":productId" element={<ItemDetailPage />} />
								</Route>
								<Route path="*" element={<NotFoundPage />} />
							</Route>
						</Routes>
					</BrowserRouter>
				</ViewportProvider>
			</UserProvider>
		</QueryClientProvider>
	);
}

export default Main;
