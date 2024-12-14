import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NProgress from "nprogress";
import HeaderLayout from "./components/Layout/HeaderLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import MarketPage from "./pages/MarketPage/MarketPage";
import AddItemPage from "./pages/AddItemPage/AddItemPage";
import CommunityFeedPage from "./pages/CommunityFeedPage/CommunityFeedPage";
import ItemDetailPage from "./pages/ItemDetailPage/ItemDetailPage";
import SignupPage from "./pages/auth/SignupPage";
import EditItemPage from "./pages/EditItemPage/EditItemPage";
import { AuthProvider } from "./contexts/AuthContext";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });
const queryClient = new QueryClient();

function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>{children}</AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function App() {
  return (
    <Providers>
      <Routes>
        <Route Component={HeaderLayout}>
          <Route index element={<HomePage />} />
          <Route path="registration" element={<AddItemPage />} />
          <Route path="community" element={<CommunityFeedPage />} />
          <Route path="items">
            <Route index element={<MarketPage />} />
            <Route path=":itemId" element={<ItemDetailPage />} />
            <Route path=":itemId/edit" element={<EditItemPage />} />
          </Route>
        </Route>

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
      </Routes>
    </Providers>
  );
}

export default App;
