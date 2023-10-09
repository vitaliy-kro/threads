import { fetchThreads } from '@/lib/actions/thread.actions';
import { currentUser } from '@clerk/nextjs';
import ThreadCard from '@/components/cards/ThreadCard';

export default async function Home() {
  const res = await fetchThreads(1, 30);
  const user = await currentUser();

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {!res.posts.length ? (
          <p className="no-result">No threads found</p>
        ) : (
          res.posts.map(post => (
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
            />
          ))
        )}
      </section>
    </>
  );
}
