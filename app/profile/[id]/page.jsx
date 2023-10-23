'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

import Profile from '@components/Profile';

const UserProfile = ({ params }) => {
  const router = useRouter();
  const userName = useSearchParams().get('name');
  const { data: session } = useSession();

  const [posts, setPosts] = useState([]);

  const handleEdit = useCallback((post) => {
    router.push(`/update-prompt?id=${post._id}`);
  }, []);

  const handleDelete = useCallback(
    async (post) => {
      const hasConfirmed = confirm(
        'Are you sure you want to delete this prompt?',
      );

      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE',
          });

          const filteredPosts = posts.filter((item) => item._id !== post._id);

          setPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    },
    [posts],
  );

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params?.id]);

  useEffect(() => {
    if (session?.user.id === params?.id) router.push('/profile');
  }, [session, params]);

  return (
    <Profile
      name={userName}
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default UserProfile;
