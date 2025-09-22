import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Modal } from 'antd';
import { FaCheckCircle } from 'react-icons/fa';
import styled from 'styled-components';

import { vehicleDetailsData } from '@/data';
import { useCurrentUser } from '@/hooks';
import theme from '@/theme';
import BookingModal from '../BookingModal';
import Button from '../Button';
import Title from '../Title';

type VehicleCardProps = {
  vehicle: IVehicle;
  startDate: string | string[];
  endDate: string | string[];
};

const { borderRadius, colors, device, typography } = theme;
const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, startDate, endDate }) => {
  const router = useRouter();
  const { user } = useCurrentUser();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpen = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  const handleLoginRedirect = () => {
    handleClose();
    router.push('/login');
  };

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [modalIsOpen]);

  return (
    <Wrapper>
      <StyledImageWrapper>
        <Image src={vehicle.image} alt={vehicle.brand} fill quality={100} priority={true} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      </StyledImageWrapper>
      <Header>
        <Title $variant="xxsmall">{vehicle.brand + ' ' + vehicle.model}</Title>
        <p>
          <span> ${vehicle.price} </span>/ Day
        </p>
      </Header>
      <DetailWrapper>
        {vehicleDetailsData.map(detail => (
          <div key={detail.key} title={detail.label}>
            {detail.icon}
            <p>{vehicle[detail.key]}</p>
          </div>
        ))}
      </DetailWrapper>
      <ButtonWrapper>
        <Button $variant="gradientLarge" onClick={handleOpen}>
          Book Ride <FaCheckCircle />
        </Button>
      </ButtonWrapper>
      {modalIsOpen && user && <BookingModal handleClose={handleClose} vehicle={vehicle} startDate={startDate} endDate={endDate} />}
      {!user && (
        <Modal
          title="You need to log in to make a reservation."
          open={modalIsOpen}
          onOk={handleLoginRedirect}
          onCancel={handleClose}
          okText="Login"
          cancelText="Cancel"
        />
      )}
    </Wrapper>
  );
};

export default VehicleCard;

const Wrapper = styled.li`
  width: calc(50% - 12px);
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.mediumGray};
  padding: 16px;

  @media ${device.tablet} {
    width: 100%;
  }
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  margin: 16px 0;
  border-bottom: 1px solid rgb(244, 244, 244);
  p {
    color: ${colors.mutedPurple};
    font-weight: ${typography.fontWeights.medium};
    span {
      color: ${colors.accentRed};
    }
  }
`;

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 200px;
  margin: 10px 0;
  overflow: hidden;
  cursor: pointer;

  img {
    object-fit: contain;
    transition: 400ms all ease-in-out;
  }
  &:hover {
    img {
      transform: scale(1.02);
    }
  }
`;

const DetailWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex-wrap: wrap;
  font-size: ${typography.fontSizes.$2};
  color: ${colors.mutedPurple};
  margin-bottom: 16px;
  div {
    width: calc(100% / 3 - 6px);
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

const ButtonWrapper = styled.div`
  border-top: 1px solid ${colors.mediumGray};
  padding-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
