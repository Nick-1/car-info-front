import React from 'react';
import AdminHeader from './AdminHeader.tsx';
import UserHeader from './UserHeader.tsx';

const Header: React.FC = () => {
    const userId = Number(localStorage.getItem('userId') ?? '0');

    return userId === 1 ? <AdminHeader /> : <UserHeader />;
};

export default Header;
