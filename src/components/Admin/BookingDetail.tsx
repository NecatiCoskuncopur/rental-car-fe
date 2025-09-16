import React from 'react';
import Image from 'next/image';

import styled from 'styled-components';

import theme from '@/theme';
import { formatDate } from '@/utils';

type BookingDetailProps = {
  data: IBooking | null;
};

const { colors, device, typography } = theme;
const BookingDetail: React.FC<BookingDetailProps> = ({ data }) => {
  const mergedDetailData = [
    {
      section: 'Vehicle Detail',
      image: data?.vehicleId?.image,
      imageAlt: data?.vehicleId?.model,
      data: [
        { title: 'Brand', key: 'brand', value: data?.vehicleId?.brand ?? '-' },
        { title: 'Model', key: 'model', value: data?.vehicleId?.model ?? '-' },
        { title: 'Vehicle Type', key: 'vehicleType', value: data?.vehicleId?.vehicleType ?? '-' },
        { title: 'Transmission Type', key: 'transmissionType', value: data?.vehicleId?.transmissionType ?? '-' },
        { title: 'Fuel Type', key: 'fuelType', value: data?.vehicleId?.fuelType ?? '-' },
        { title: 'Doors', key: 'doors', value: data?.vehicleId?.doors ?? '-' },
        { title: 'Passengers', key: 'passengers', value: data?.vehicleId?.passengers ?? '-' },
      ],
    },
    {
      section: 'User Detail',
      data: [
        {
          title: 'Full Name',
          key: 'fullName',
          value:
            data?.userId?.name && data?.userId?.surname ? `${data.userId.name} ${data.userId.surname}` : (data?.userId?.name ?? data?.userId?.surname ?? '-'),
        },
        { title: 'Email', key: 'email', value: data?.userId?.email ?? '-' },
      ],
    },
    {
      section: 'Booking Detail',
      data: [
        { title: 'Pickup Date', key: 'startDate', value: data?.startDate ? formatDate(data.startDate) : '-' },
        { title: 'Return Date', key: 'endDate', value: data?.endDate ? formatDate(data.endDate) : '-' },
        { title: 'Total Amount', key: 'totalPrice', value: data?.totalPrice ? `$${data.totalPrice}` : '-' },
      ],
    },
  ];

  return (
    <>
      {mergedDetailData.map(section => (
        <div key={section.section}>
          <TitleWrapper>
            <h1>{section.section}</h1>
          </TitleWrapper>

          <List>
            {section.image && (
              <ListItem>
                <Image src={section.image} alt={section.imageAlt || 'Vehicle Image'} width={120} height={80} />
              </ListItem>
            )}
            {section.data.map(item => (
              <ListItem key={item.key}>
                <p>{item.title}</p>
                <span>{item.value}</span>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
    </>
  );
};

export default BookingDetail;

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: space-between;
  row-gap: 24px;
  flex-wrap: wrap;
  border: 2px solid ${colors.lightGray};
  padding: 16px;
  &:last-child {
    margin-bottom: 24px;
  }
`;

const TitleWrapper = styled.div`
  margin: 36px 0 16px;
  color: ${colors.darkGray};
`;

const ListItem = styled.li`
  width: calc(100% / 3 - 16px);
  p {
    color: ${colors.darkGray};
    font-weight: ${typography.fontWeights.medium};
    font-size: ${typography.fontSizes.$2};
    margin-bottom: 4px;
  }
  span {
    color: ${colors.darkGray};
    font-size: ${typography.fontSizes.$2};
    text-transform: capitalize;
  }
  @media ${device.tablet} {
    width: 100%;
  }
`;
