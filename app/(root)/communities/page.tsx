import { redirect } from 'next/navigation';
import { currentUser } from '@clerk/nextjs';

import { fetchUser } from '@/lib/actions/user.actions';
import { fetchCommunities } from '@/lib/actions/community.actions';

import Searchbar from '@/components/shared/Searchbar';
import Pagination from '@/components/shared/Pagination';
import CommunityCard from '@/components/cards/CommunityCard';

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding');
  }
  const pageNumber = searchParams?.page ? Number(searchParams.page) : 1;

  const res = await fetchCommunities({
    searchString: searchParams.q,
    pageNumber,
    pageSize: 25,
  });

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-5">
        <Searchbar routeType="communities" />
      </div>

      <div className="mt-14 flex flex-col gap-9">
        {res.communities.length === 0 ? (
          <p className="no-result"> No communities</p>
        ) : (
          <>
            {res.communities.map(community => (
              <CommunityCard
                key={community.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imageUrl={community.image}
                bio={community.bio}
                members={community.members}
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        path="communities"
        pageNumber={pageNumber}
        isNext={res.isNext}
      />
    </section>
  );
}

export default Page;
