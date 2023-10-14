'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import { likeThread } from '@/lib/actions/thread.actions';

interface Props {
  threadId: string;
  currentUserId: string;
  isLiked: boolean;
}

function LikeThread({ threadId, currentUserId, isLiked }: Props) {
  const pathname = usePathname();
  const [isThreadLiked, setIsThreadLiked] = useState(isLiked);
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const onSubmit = async () => {
    setIsLikeClicked(true);
    setIsThreadLiked(prev => !prev);
    await likeThread({
      threadId: JSON.parse(threadId),
      accountId: currentUserId,
      path: pathname,
    });
    setIsLikeClicked(false);
  };

  return (
    <Image
      src={
        isThreadLiked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'
      }
      alt="like"
      width={24}
      height={24}
      className={`cursor-pointer object-contain transition-all ${
        isLikeClicked ? 'scale-125' : 'scale-100'
      }`}
      onClick={onSubmit}
    />
  );
}

export default LikeThread;
