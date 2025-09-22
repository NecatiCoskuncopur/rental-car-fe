import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, InputNumber, Progress, Select, Upload } from 'antd';
import { RuleObject } from 'antd/es/form';
import type { UploadFile as AntdUploadFile } from 'antd/es/upload/interface';

type VehicleFormFieldsProps = {
  fileList: AntdUploadFile[];
  handleBeforeUpload: (file: File) => Promise<boolean>;
  handleRemove: () => void;
  isUploading: boolean;
  uploadProgress: number;
};

const vehicleFormFields = ({ fileList, handleBeforeUpload, handleRemove, isUploading, uploadProgress }: VehicleFormFieldsProps) => [
  {
    key: 'brand',
    name: 'brand',
    label: 'Brand',
    component: <Input placeholder="Brand" />,
    rules: [
      { required: true, message: 'Brand is required' },
      { pattern: /^[a-zA-Z\s]+$/, message: 'Brand can only contain letters and spaces' },
    ],
  },
  {
    key: 'model',
    name: 'model',
    label: 'Model',
    component: <Input placeholder="Model" />,
    rules: [
      { required: true, message: 'Model is required' },
      { pattern: /^[A-Za-z0-9\s]+$/, message: 'Model can only contain letters, numbers, and spaces' },
    ],
  },
  {
    key: 'price',
    name: 'price',
    label: 'Price',
    component: <InputNumber min={0} style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Price is required' }],
  },
  {
    key: 'vehicleType',
    name: 'vehicleType',
    label: 'Vehicle Type',
    component: <Select options={['sedan', 'suv', 'hatchback', 'station vagon', 'mpv'].map(v => ({ label: v, value: v }))} />,
    rules: [{ required: true, message: 'Vehicle type is required' }],
  },
  {
    key: 'doors',
    name: 'doors',
    label: 'Doors',
    component: <InputNumber min={2} max={5} style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Doors are required' }],
  },
  {
    key: 'passengers',
    name: 'passengers',
    label: 'Passengers',
    component: <InputNumber min={1} max={12} style={{ width: '100%' }} />,
    rules: [{ required: true, message: 'Passengers are required' }],
  },
  {
    key: 'transmissionType',
    name: 'transmissionType',
    label: 'Transmission Type',
    component: <Select options={['automatic', 'manual'].map(v => ({ label: v, value: v }))} />,
    rules: [{ required: true, message: 'Transmission type is required' }],
  },
  {
    key: 'fuelType',
    name: 'fuelType',
    label: 'Fuel Type',
    component: <Select options={['gasoline', 'diesel', 'electric', 'hybrid'].map(v => ({ label: v, value: v }))} />,
    rules: [{ required: true, message: 'Fuel type is required' }],
  },
  {
    key: 'plateNumbers',
    name: 'plateNumbers',
    label: 'Plate Numbers',
    component: <Select mode="tags" tokenSeparators={[',']} placeholder="Enter plate numbers" />,
    rules: [
      {
        validator: (_: RuleObject, value: string[]) => {
          if (!value || value.length === 0) return Promise.reject('At least one plate number is required');
          const plateRegex = /^(0[1-9]|[1-7][0-9]|8[0-1])\s[A-Z]{1,3}\s\d{2,4}$/;
          const invalid = value.find(v => !plateRegex.test(v));
          return invalid ? Promise.reject('Plate number must be a valid Turkish plate format') : Promise.resolve();
        },
      },
    ],
  },
  {
    key: 'image',
    name: 'image',
    label: 'Image',
    component: (
      <>
        <Upload listType="picture" fileList={fileList} beforeUpload={handleBeforeUpload} onRemove={handleRemove}>
          <Button icon={<UploadOutlined />} loading={isUploading}>
            {isUploading ? `Uploading... ${uploadProgress}%` : 'Select Image'}
          </Button>
        </Upload>
        {isUploading && <Progress percent={uploadProgress} size="small" style={{ marginTop: 8 }} />}
      </>
    ),
    rules: [{ required: true, message: 'Image is required' }],
  },
];

export default vehicleFormFields;
