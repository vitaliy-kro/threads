import { redirect } from 'next/navigation';
import { fetchUserPosts } from '@/lib/actions/user.actions';
import ThreadCard from '@/components/cards/ThreadCard';

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

export default async function ThreadsTab({
  currentUserId,
  accountId,
  accountType,
}: Props) {
  const res = await fetchUserPosts(accountId);

  if (!res) redirect('/');
  return (
    <section className="mt-9 flex flex-col gap-10">
      {res.threads.map(thread => (
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
          } //TODO
          community={thread.community} //TODO
          createdAt={thread.createdAt}
          comments={thread.children}
        />
      ))}
    </section>
  );
}
