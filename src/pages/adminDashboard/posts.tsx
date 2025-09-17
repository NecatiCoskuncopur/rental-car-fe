import React, { useEffect, useState } from 'react';

import { Alert, Button, Table } from 'antd';
import { toast } from 'react-toastify';

import { createPost, deletePost, getPosts, updatePost } from '@/api';
import { AdminLayout, DeleteModal, PostColumns, PostModal, TableWrapper } from '@/components';
import { useCreateData, useDeleteData, useFetchData, useUpdateData } from '@/hooks';

type ModalType = 'delete' | 'update' | 'create' | null;

const Posts = () => {
  const [selectedPost, setSelectedPost] = useState<IPost | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refetch } = useFetchData<IPostData>(() => getPosts({ limit: '6', page: currentPage.toString() }));

  const { createItem } = useCreateData<IPost, { title: string; content: string; image: string }>(payload => createPost(payload));

  const { mutate } = useUpdateData<IPost, { postId: string; title?: string; content?: string; image?: string }>(payload => updatePost(payload));

  const {
    state: { loading: deleteLoading },
    deleteItem,
  } = useDeleteData(() => deletePost(selectedPost!._id));

  useEffect(() => {
    refetch();
  }, [currentPage]);

  const openModal = (type: ModalType, postId?: string) => {
    if (postId) {
      const post = data?.posts.find(b => b._id === postId) || null;
      setSelectedPost(post);
    } else {
      setSelectedPost(null);
    }
    setModalType(type);
  };

  const handleCreate = async (newPost: { title: string; content: string; image: string }) => {
    try {
      await createItem(newPost);
      toast.success('Post created successfully');
      refetch();
    } catch {
      toast.error('Failed to create post');
    }
    setModalType(null);
  };

  const handleUpdate = async (updatedData: { title?: string; content?: string; image?: string }) => {
    if (!selectedPost) return;

    try {
      await mutate({
        postId: selectedPost._id,
        ...updatedData,
      });
      toast.success('Post updated successfully');
      refetch();
    } catch {
      toast.error('Failed to update post');
    }

    setModalType(null);
  };

  const handleDelete = async () => {
    if (!selectedPost) return;

    try {
      await deleteItem();
      toast.success('Post deleted successfully');
      refetch();
    } catch {
      toast.error('Failed to delete post');
    }

    setModalType(null);
  };

  const handleCancel = () => {
    setModalType(null);
    setSelectedPost(null);
  };

  const dataSource = data
    ? data.posts.map((post: IPost) => ({
        _id: post._id,
        slug: post.slug,
        title: post.title,
        image: post.image,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      }))
    : [];

  const columns = PostColumns(
    postId => openModal('delete', postId),
    postId => openModal('update', postId),
  );

  return (
    <AdminLayout>
      <TableWrapper>
        {error ? (
          <Alert message="Error" description={error} type="error" showIcon />
        ) : (
          <>
            <Button type="primary" onClick={() => openModal('create')} style={{ marginBottom: '20px' }}>
              Create Post
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
                total: data?.totalPosts || 0,
                onChange: page => setCurrentPage(page),
                hideOnSinglePage: true,
                showLessItems: true,
              }}
            />
          </>
        )}

        {modalType === 'delete' && (
          <DeleteModal isVisible={modalType === 'delete'} handleDelete={handleDelete} handleCancel={handleCancel} loading={deleteLoading} type="post" />
        )}

        {modalType === 'create' && <PostModal mode="create" isOpen handleCancel={handleCancel} onSubmit={handleCreate} />}

        {modalType === 'update' && selectedPost && (
          <PostModal
            mode="update"
            isOpen
            handleCancel={handleCancel}
            initialValues={{
              title: selectedPost.title,
              content: selectedPost.content,
              image: selectedPost.image,
            }}
            onSubmit={handleUpdate}
          />
        )}
      </TableWrapper>
    </AdminLayout>
  );
};

export default Posts;

Posts.minimalLayout = true;
