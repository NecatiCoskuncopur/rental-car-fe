import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Progress, Upload, UploadFile } from 'antd';
import { RuleObject } from 'antd/es/form';

import { StyledQuill } from '@/components';

type postFormFielsdProps = {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  fileList: UploadFile<unknown>[];
  handleBeforeUpload: (file: File) => Promise<boolean>;
  handleRemove: () => void;
  isUploading: boolean;
  uploadProgress: number;
};

const postFormFields = ({ content, setContent, fileList, handleBeforeUpload, handleRemove, isUploading, uploadProgress }: postFormFielsdProps) => [
  {
    key: 'title',
    name: 'title',
    label: 'Title',
    component: <Input placeholder="Enter title" />,
    rules: [
      { required: true, message: 'Title is required' },
      { min: 5, message: 'Title must be at least 5 characters' },
      {
        pattern: /^[A-Za-zÇçĞğİıÖöŞşÜü0-9\s]+$/,
        message: 'Title can only contain letters, numbers and spaces.',
      },
    ],
  },
  {
    key: 'content',
    name: 'content',
    label: 'Content',
    component: <StyledQuill value={content} onChange={setContent} theme="snow" />,
    rules: [
      {
        validator: async (_: RuleObject, value: string) => {
          const plainText = value ? value.replace(/<(.|\n)*?>/g, '').trim() : '';

          if (!plainText) {
            return Promise.reject('Content is required');
          }

          if (plainText.length < 5) {
            return Promise.reject('Content must be at least 5 characters');
          }

          return Promise.resolve();
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

export default postFormFields;
