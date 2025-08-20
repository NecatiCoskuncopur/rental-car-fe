import React from 'react';

import { getUserBookings } from '@/api';
import { Information, ProfileLayout, ProfileOverview, SummaryList } from '@/components';
import { getUserDashboardData } from '@/data';
import { useCurrentUser, useFetchData } from '@/hooks';

const Profile = () => {
  const { user, loading } = useCurrentUser();

  const { data: bookingData, loading: bookingLoading, error: bookingError } = useFetchData<IUserBookingData>(() => getUserBookings());

  const totalSpent = bookingData?.bookings?.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const totalApprovedSpent =
    bookingData?.bookings?.filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const dashboardData = getUserDashboardData({
    totalBookings: bookingData?.totalBookings,
    totalSpent: totalSpent,
    totalApprovedSpent: totalApprovedSpent,
  });

  return (
    <ProfileLayout title="Summary">
      <ProfileOverview user={user || null} />
      <SummaryList dashboardData={dashboardData || []} />
      <Information user={user || null} />
    </ProfileLayout>
  );
};

export default Profile;
