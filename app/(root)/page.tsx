import { fetchThreads } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';
import { fetchUser } from '@/lib/actions/user.actions';
import { redirect } from 'next/navigation';

export default async function Home() {
  const res = await fetchThreads(1, 30);
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect('/onboarding');

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {!res.posts.length ? (
          <p className="no-result">No threads found</p>
        ) : (
          res.posts.map(post => {
            const isLiked = userInfo.likedPosts.includes(post._id);
            return (
              <ThreadCard
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ''}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                isLiked={isLiked}
              />
            );
          })
        )}
      </section>
    </>
  );
}
