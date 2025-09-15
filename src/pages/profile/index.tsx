import React from 'react';

import { getUserBookings } from '@/api';
import { Error, Information, OverlayLoader, ProfileLayout, ProfileOverview, SummaryList } from '@/components';
import { getUserDashboardData } from '@/data';
import { useCurrentUser, useFetchData } from '@/hooks';

const Profile = () => {
  const { user } = useCurrentUser();

  const { data, loading, error } = useFetchData<IUserBookingData>(() => getUserBookings());

  const totalSpent = data?.bookings?.reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const totalApprovedSpent =
    data?.bookings?.filter(booking => booking.status === 'confirmed').reduce((acc, booking) => acc + (booking.totalPrice || 0), 0) || 0;

  const dashboardData = getUserDashboardData({
    totalBookings: data?.totalBookings,
    totalSpent: totalSpent,
    totalApprovedSpent: totalApprovedSpent,
  });

  if (error) {
    return <Error />;
  }

  return (
    <ProfileLayout title="Summary">
      {loading ? (
        <OverlayLoader variant="card" />
      ) : (
        <>
          <ProfileOverview user={user || null} />
          <SummaryList dashboardData={dashboardData || []} />
          <Information user={user || null} />
        </>
      )}
    </ProfileLayout>
  );
};

export default Profile;
