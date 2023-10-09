'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Props {
  id: string;
  name: string;
  username: string;
  imageUrl: string;
  personType: string;
}

function UserCard({ id, name, username, imageUrl, personType }: Props) {
  const router = useRouter();

  return (
    <article className="user-card">
      <div className="user-card_avatar">
        <Image
          src={imageUrl}
          alt="user avatar"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div className="flex flex-col text-ellipsis">
          <h4 className="text-base-semibold text-light-1">{name}</h4>
          <p className="text-small-medium text-gray-1">@{username}</p>
        </div>
      </div>

      <Button
        className="user-card_btn"
        onClick={() => router.push(`/profile/${id}`)}
      >
        View
      </Button>
    </article>
  );
}

export default UserCard;
