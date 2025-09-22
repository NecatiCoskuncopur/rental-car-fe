import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { CgClose } from 'react-icons/cg';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { IoPricetagOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

import { createBooking } from '@/api';
import { useCreateData } from '@/hooks';
import { formatDate } from '@/utils';
import { ContentWrapper, Footer, IconWrapper, ModalWrapper, ReservationInfo, ReservationInnerWrapper, StyledImageWrapper } from './styles';
import Button from '../Button';
import Title from '../Title';

type BookingModalProps = {
  handleClose: () => void;
  vehicle: IVehicle | null;
  startDate: string | string[];
  endDate: string | string[];
};

const BookingModal: React.FC<BookingModalProps> = ({ handleClose, vehicle, startDate, endDate }) => {
  const router = useRouter();
  const start = dayjs(Array.isArray(startDate) ? startDate[0] : startDate);
  const end = dayjs(Array.isArray(endDate) ? endDate[0] : endDate);
  const days = end.diff(start, 'day');
  const { createItem } = useCreateData<IPost, { vehicleId: string; startDate: string; endDate: string }>(payload => createBooking(payload));

  const handleCreateBooking = async () => {
    if (!vehicle) return;

    if (!startDate || !endDate) {
      toast.error('Please select a start and end date.');
      return;
    }

    const payload = {
      vehicleId: vehicle._id,
      startDate: Array.isArray(startDate) ? startDate[0] : startDate,
      endDate: Array.isArray(endDate) ? endDate[0] : endDate,
    };

    try {
      await createItem(payload);
      toast.success('Booking created successfully!');
      handleClose();
      router.push('/profile/userBookings');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create booking.');
    }
  };

  return (
    <ModalWrapper onClick={handleClose}>
      <ContentWrapper onClick={e => e.stopPropagation()}>
        <header>
          <Title $variant="xsmall">COMPLETE RESERVATION</Title>
          <CgClose size={24} onClick={handleClose} />
        </header>
        <ReservationInfo>
          <ReservationInnerWrapper>
            <Title $variant="xxsmall" $mb="25px">
              Date
            </Title>
            <IconWrapper>
              <FaMapMarkerAlt />
              <div>
                <p>Pick-Up Date</p>
                <p>{startDate ? formatDate(Array.isArray(startDate) ? startDate[0] : startDate) : '-'}</p>
              </div>
            </IconWrapper>
            <IconWrapper>
              <FaMapMarkerAlt />
              <div>
                <p>Drop-Off Date</p>
                <p>{endDate ? formatDate(Array.isArray(endDate) ? endDate[0] : endDate) : '-'}</p>
              </div>
            </IconWrapper>
            <IconWrapper>
              <IoPricetagOutline />
              <div>
                <p>Total Price</p>
                <p>${vehicle && vehicle?.price * days}</p>
              </div>
            </IconWrapper>
          </ReservationInnerWrapper>
          <ReservationInnerWrapper>
            <Title $variant="xxsmall" $mb="25px">
              Vehicle: {vehicle?.brand + ' ' + vehicle?.model}
            </Title>
            {vehicle?.image && (
              <StyledImageWrapper>
                <Image src={vehicle.image} alt={`${vehicle.brand} ${vehicle.model}`} fill style={{ objectFit: 'cover' }} />
              </StyledImageWrapper>
            )}
          </ReservationInnerWrapper>
        </ReservationInfo>
        <Footer>
          <Button $variant="large" onClick={handleCreateBooking}>
            Reserve Now
          </Button>
        </Footer>
      </ContentWrapper>
    </ModalWrapper>
  );
};

export default BookingModal;
