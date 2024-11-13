import { AuthProvider } from '../hooks/useAuth';
import Style from '@/styles/globals.css';

function MyApp({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;