import React, { useEffect, useState } from 'react';

import { Alert, Button, Table } from 'antd';
import { toast } from 'react-toastify';

import { createVehicle, deleteVehicle, getVehicles, updateVehicle } from '@/api';
import { AdminLayout, DeleteModal, TableWrapper, VehicleColumns, VehicleModal } from '@/components';
import { useCreateData, useDeleteData, useFetchData, useUpdateData } from '@/hooks';

type ModalType = 'delete' | 'update' | 'create' | null;

const Vehicles = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<IVehicle | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useFetchData<IVehicleData>(() => getVehicles({ limit: '6', page: currentPage.toString() }));

  const { createItem } = useCreateData<IVehicle, ICreateVehiclePayload>(payload => createVehicle(payload));

  const { mutate } = useUpdateData<IVehicle, IUpdateVehiclePayload>(payload => updateVehicle(payload));

  const {
    state: { loading: deleteLoading },
    deleteItem,
  } = useDeleteData(() => deleteVehicle(selectedVehicle!._id));

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const openModal = (type: ModalType, vehicleId?: string) => {
    if (vehicleId) {
      const vehicle = data?.vehicles.find(v => v._id === vehicleId) || null;
      setSelectedVehicle(vehicle);
    } else {
      setSelectedVehicle(null);
    }
    setModalType(type);
  };

  const handleCreate = async (newVehicle: ICreateVehiclePayload) => {
    try {
      await createItem(newVehicle);
      toast.success('Vehicle created successfully');
      refetch();
    } catch {
      toast.error('Failed to create vehicle');
    }
    setModalType(null);
  };

  const handleUpdate = async (updatedData: {
    brand?: string;
    model?: string;
    image?: string;
    price?: number;
    vehicleType?: VehicleType;
    doors?: number;
    passengers?: number;
    transmissionType?: TransmissionType;
    fuelType?: FuelType;
    plateNumbers?: string[];
  }) => {
    if (!selectedVehicle) return;

    try {
      await mutate({
        vehicleId: selectedVehicle._id,
        ...updatedData,
      });
      toast.success('Vehicle updated successfully');
      refetch();
    } catch {
      toast.error('Failed to update vehicle');
    }

    setModalType(null);
  };

  const handleDelete = async () => {
    if (!selectedVehicle) return;

    try {
      await deleteItem();
      toast.success('Vehicle deleted successfully');
      refetch();
    } catch {
      toast.error('Failed to delete vehicle');
    }

    setModalType(null);
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedVehicle(null);
  };

  const dataSource = data
    ? data.vehicles.map((vehicle: IVehicle) => ({
        _id: vehicle._id,
        brand: vehicle.brand,
        model: vehicle.model,
        price: vehicle.price,
        image: vehicle.image,
        vehicleType: vehicle.vehicleType,
        doors: vehicle.doors,
        passengers: vehicle.passengers,
        transmissionType: vehicle.transmissionType,
        fuelType: vehicle.fuelType,
        plateNumbers: vehicle.plateNumbers,
        isAvailable: vehicle.isAvailable,
        createdAt: vehicle.createdAt,
        updatedAt: vehicle.updatedAt,
      }))
    : [];

  const columns = VehicleColumns(
    vehicleId => openModal('delete', vehicleId),
    vehicleId => openModal('update', vehicleId),
  );

  return (
    <AdminLayout>
      <TableWrapper>
        {error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <>
            <Button type="primary" onClick={() => openModal('create')} style={{ marginBottom: '20px' }}>
              Create Vehicle
            </Button>
            <Table
              columns={columns}
              dataSource={dataSource}
              rowKey="_id"
              scroll={{ x: 1024 }}
              loading={loading}
              pagination={{
                current: data?.currentPage,
                pageSize: data?.perPage || 6,
                total: data?.totalVehicles || 0,
                onChange: page => setCurrentPage(page),
                hideOnSinglePage: true,
                showLessItems: true,
              }}
            />
          </>
        )}
        {modalType === 'delete' && (
          <DeleteModal isVisible={modalType === 'delete'} handleDelete={handleDelete} handleCancel={handleCancel} loading={deleteLoading} type="vehicle" />
        )}

        {modalType === 'create' && <VehicleModal mode="create" isOpen handleCancel={handleCancel} onSubmit={handleCreate} />}

        {modalType === 'update' && selectedVehicle && (
          <VehicleModal
            mode="update"
            isOpen
            handleCancel={handleCancel}
            initialValues={{
              brand: selectedVehicle.brand,
              model: selectedVehicle.model,
              image: selectedVehicle.image,
              price: selectedVehicle.price,
              vehicleType: selectedVehicle.vehicleType,
              doors: selectedVehicle.doors,
              passengers: selectedVehicle.passengers,
              transmissionType: selectedVehicle.transmissionType,
              fuelType: selectedVehicle.fuelType,
              plateNumbers: selectedVehicle.plateNumbers,
            }}
            onSubmit={handleUpdate}
          />
        )}
      </TableWrapper>
    </AdminLayout>
  );
};

export default Vehicles;

Vehicles.minimalLayout = true;
