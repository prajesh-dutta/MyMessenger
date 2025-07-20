import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userString = urlParams.get('user');

        if (token && userString) {
            try {
                const user = JSON.parse(decodeURIComponent(userString));
                const authData = { token, user };
                
                localStorage.setItem('chat-user', JSON.stringify(authData));
                setAuthUser(authData);
                
                navigate('/');
            } catch (error) {
                console.error('Error parsing OAuth data:', error);
                navigate('/login?error=oauth_parse_error');
            }
        } else {
            navigate('/login?error=oauth_missing_data');
        }
    }, [navigate, setAuthUser]);

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='text-center'>
                <div className='loading loading-spinner loading-lg'></div>
                <p className='mt-4 text-gray-600'>Completing Google Sign-in...</p>
            </div>
        </div>
    );
};

export default OAuthSuccess;