'use client';

import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { likeThread } from '@/lib/actions/thread.actions';

interface Props {
  threadId: string;
  currentUserId: string;
  isLiked: boolean;
}

function LikeThread({ threadId, currentUserId, isLiked }: Props) {
  const pathname = usePathname();
  const [isLikeClicked, setIsLikeClicked] = useState(false);

  const onSubmit = async () => {
    setIsLikeClicked(true);
    await likeThread({
      threadId: JSON.parse(threadId),
      accountId: currentUserId,
      path: pathname,
    });
    setIsLikeClicked(false);
  };

  return (
    <Image
      src={isLiked ? '/assets/heart-filled.svg' : '/assets/heart-gray.svg'}
      alt="like"
      width={24}
      height={24}
      className={`cursor-pointer object-contain transition-all ${
        isLiked ? 'scale-125' : 'scale-100'
      }`}
      onClick={onSubmit}
    />
  );
}

export default LikeThread;
