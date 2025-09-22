import React, { useEffect, useState } from 'react';

import { Col, Form, message, Modal, Row } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { nanoid } from 'nanoid';

import { vehicleFormFields } from '@/data';
import { useUploadImage } from '@/hooks';

interface VehicleModalProps {
  mode: 'create' | 'update';
  initialValues?: ICreateVehiclePayload;
  onSubmit: (values: ICreateVehiclePayload) => void;
  isOpen: boolean;
  handleCancel: () => void;
}

const VehicleModal: React.FC<VehicleModalProps> = ({ mode, initialValues, onSubmit, isOpen, handleCancel }) => {
  const [form] = Form.useForm<ICreateVehiclePayload>();
  const { uploadImage, isUploading, uploadProgress } = useUploadImage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialValues) {
        form.setFieldsValue(initialValues);
        setImageUrl(initialValues.image || null);

        if (initialValues.image) {
          setFileList([
            {
              uid: 'init',
              name: 'Current Image',
              status: 'done',
              url: initialValues.image,
              thumbUrl: initialValues.image,
            },
          ]);
        } else {
          setFileList([]);
        }
      } else {
        form.resetFields();
        setFileList([]);
        setImageUrl(null);
      }
    }
  }, [isOpen, form]);

  const handleBeforeUpload = async (file: File) => {
    const url = await uploadImage(file, 'vehicle');
    if (!url) {
      message.error('Upload failed');
      return false;
    }

    setImageUrl(url);
    setFileList([
      {
        uid: nanoid(),
        name: file.name,
        status: 'done',
        url,
        thumbUrl: url,
      },
    ]);
    return false;
  };

  const handleRemove = () => {
    setFileList([]);
    setImageUrl(null);
    form.setFieldsValue({ image: '' });
  };

  const handleFinish = (values: {
    brand: string;
    model: string;
    image: string;
    price: number;
    vehicleType: VehicleType;
    doors: number;
    passengers: number;
    transmissionType: TransmissionType;
    fuelType: FuelType;
    plateNumbers: string[];
  }) => {
    onSubmit({
      brand: values.brand,
      model: values.model,
      image: imageUrl!,
      price: values.price,
      vehicleType: values.vehicleType,
      doors: values.doors,
      passengers: values.passengers,
      transmissionType: values.transmissionType,
      fuelType: values.fuelType,
      plateNumbers: values.plateNumbers,
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      okText={mode === 'create' ? 'Create Vehicle' : 'Update Vehicle'}
      onOk={() => form.submit()}
      afterClose={() => {
        form.resetFields();
        setFileList([]);
        setImageUrl(null);
      }}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        {(() => {
          const fields = vehicleFormFields({ fileList, handleBeforeUpload, handleRemove, isUploading, uploadProgress });
          const rows = [];
          for (let i = 0; i < fields.length; i += 3) {
            rows.push(fields.slice(i, i + 3));
          }

          return rows.map((row, idx) => (
            <Row gutter={16} key={idx} style={{ marginBottom: 16 }}>
              {row.map(field => (
                <Col span={field.key === 'image' ? 12 : 8} key={field.key}>
                  <Form.Item name={field.name} label={field.label} rules={field.rules}>
                    {field.component}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          ));
        })()}
      </Form>
    </Modal>
  );
};

export default VehicleModal;
