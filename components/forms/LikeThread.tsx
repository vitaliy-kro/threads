'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { likeThread } from '@/lib/actions/thread.actions';

interface Props {
  threadId: string;
  currentUserId: string;
}

function LikeThread({ threadId, currentUserId }: Props) {
  const pathname = usePathname();

  return (
    <Image
      src="/assets/heart-gray.svg"
      alt="delte"
      width={18}
      height={18}
      className="cursor-pointer object-contain"
      onClick={async () => {
        await likeThread({
          threadId,
          accountId: currentUserId,
          path: pathname,
        });
      }}
    />
  );
}

export default LikeThread;
