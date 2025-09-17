import { Book, Expenses, Wallet } from '@/icons';
import theme from '@/theme';

type DashboardDataParams = {
  totalBookings: number | undefined;
  totalSpent: number;
  totalApprovedSpent: number;
};

const { colors } = theme;
const getUserDashboardData = ({ totalBookings, totalSpent, totalApprovedSpent }: DashboardDataParams) => [
  {
    title: 'My Bookings',
    icon: <Book size={35} />,
    iconBg: colors.focusBlue,
    value: totalBookings,
    footerText: 'View All Bookings',
    href: 'profile/userBookings',
  },
  {
    title: 'Total Transactions',
    icon: <Wallet size={35} />,
    iconBg: colors.vibrantOrange,
    value: `$${new Intl.NumberFormat().format(totalSpent)}`,
    footerText: 'View all Transactions',
    href: 'profile/userBookings',
  },
  {
    title: 'Verified Expenses',
    icon: <Expenses size={35} />,
    iconBg: colors.coralRed,
    value: `$${new Intl.NumberFormat().format(totalApprovedSpent)}`,
    footerText: 'View all Expenses',
    href: 'profile/userBookings',
  },
];

export default getUserDashboardData;
