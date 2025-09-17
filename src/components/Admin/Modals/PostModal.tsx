import React, { useEffect, useState } from 'react';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Modal, Progress, Upload } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { nanoid } from 'nanoid';

import { StyledQuill } from '@/components';
import { useUploadImage } from '@/hooks';

interface PostFormValues {
  title: string;
  content: string;
  image: string;
}

interface PostModalProps {
  mode: 'create' | 'update';
  initialValues?: PostFormValues;
  onSubmit: (values: PostFormValues) => void;
  isOpen: boolean;
  handleCancel: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ mode, initialValues, onSubmit, isOpen, handleCancel }) => {
  const [form] = Form.useForm();
  const { uploadImage, isUploading, uploadProgress } = useUploadImage();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      form.resetFields();
      setContent(initialValues?.content || '');
      setImageUrl(initialValues?.image || null);

      if (initialValues) {
        form.setFieldsValue(initialValues);
      }

      if (initialValues?.image) {
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
    }
  }, [isOpen, initialValues, form]);

  const handleBeforeUpload = async (file: File) => {
    const url = await uploadImage(file, 'post');
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

  const handleFinish = (values: { title: string }) => {
    if (!imageUrl) {
      message.error('Please upload an image first');
      return;
    }
    if (!content || content === '<p><br></p>') {
      message.error('Content cannot be empty');
      return;
    }

    onSubmit({
      title: values.title,
      content,
      image: imageUrl,
    });

    if (mode === 'create') {
      form.resetFields();
      setFileList([]);
      setImageUrl(null);
      setContent('');
    }
  };

  return (
    <Modal open={isOpen} onCancel={handleCancel} okText={mode === 'create' ? 'Create Post' : 'Update Post'} onOk={() => form.submit()}>
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input placeholder="Enter title" />
        </Form.Item>

        <Form.Item label="Content" required>
          <StyledQuill value={content} onChange={setContent} theme="snow" />
        </Form.Item>

        <Form.Item label="Image" required>
          <Upload listType="picture" fileList={fileList} beforeUpload={handleBeforeUpload} onRemove={handleRemove}>
            <Button icon={<UploadOutlined />} loading={isUploading}>
              {isUploading ? `Uploading... ${uploadProgress}%` : 'Select Image'}
            </Button>
          </Upload>
          {isUploading && <Progress percent={uploadProgress} size="small" style={{ marginTop: 8 }} />}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PostModal;
