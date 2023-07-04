import { useEffect } from 'react';
import { LoggedOutView } from '../pages/Home';
import { logout } from '../utils/auth';

const Logout = () => {
    useEffect(() => {
        logout();
    }, []);
    return <LoggedOutView title="You have been logged out" />;
};

export default Logout;