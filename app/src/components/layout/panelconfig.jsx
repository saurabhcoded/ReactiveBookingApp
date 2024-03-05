import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import DocumentCheckIcon from '@heroicons/react/24/solid/DocumentCheckIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import {VideoCall} from '@mui/icons-material';
import {SvgIcon} from '@mui/material';

export const items = [
    {
        title: 'Overview',
        path: '/dashboard',
        icon: (
            <SvgIcon fontSize="small">
                <ChartBarIcon />
            </SvgIcon>
        )
    },
    {
        title: 'My Bookings',
        path: '/dashboard/mybookings',
        icon: (
            <SvgIcon fontSize="small">
                <VideoCall />
            </SvgIcon>
        )
    },
    {
        title: 'Designs',
        path: '/dashboard/bookings',
        icon: (
            <SvgIcon fontSize="small">
                <DocumentCheckIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Account',
        path: '/dashboard/services',
        icon: (
            <SvgIcon fontSize="small">
                <UserIcon />
            </SvgIcon>
        )
    },
    {
        title: 'Settings',
        path: '/dashboard/settings',
        icon: (
            <SvgIcon fontSize="small">
                <CogIcon />
            </SvgIcon>
        )
    },
];