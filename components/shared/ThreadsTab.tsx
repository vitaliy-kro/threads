import { ObjectId } from 'mongoose';
import { redirect } from 'next/navigation';
import { fetchUserPosts } from '@/lib/actions/user.actions';
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchCommunityPosts } from '@/lib/actions/community.actions';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
  userInfo: { likedPosts: ObjectId[] };
}

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
  userInfo,
}: Props) {
  let res: any;

  if (accountType === 'Community') {
    res = await fetchCommunityPosts(accountId);
  } else {
    res = await fetchUserPosts(accountId);
  }

  if (!res) redirect('/');
  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.threads.map((thread: any) => {
        const isLiked = userInfo.likedPosts.includes(thread._id);
        return (
          <ThreadCard
            key={thread._id}
            id={thread._id}
            currentUserId={currentUserId}
            parentId={thread.parentId}
            content={thread.text}
            author={
              accountType === 'User'
                ? { name: res.name, image: res.image, id: res.id }
                : {
                    name: thread.author.name,
                    image: thread.author.image,
                    id: thread.author.id,
                  }
            }
            community={thread.community}
            createdAt={thread.createdAt}
            comments={thread.children}
            isLiked={isLiked}
          />
        );
      })}
    </section>
  );
}
