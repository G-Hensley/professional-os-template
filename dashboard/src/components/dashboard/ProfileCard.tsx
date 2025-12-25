'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, Skeleton } from '@/src/components/ui';
import { useContact } from '@/src/hooks';

function ProfileCardSkeleton() {
  return (
    <div
      role="status"
      aria-label="Loading profile"
      className="flex items-center gap-3 justify-center"
    >
      <Skeleton width="w-20" height="h-20" rounded className="shrink-0" />
      <div className="flex flex-col gap-2 border-l border-orange-400 pl-4">
        <Skeleton width="w-32" height="h-5" />
        <Skeleton width="w-24" height="h-4" />
        <Skeleton width="w-20" height="h-4" />
      </div>
      <span className="sr-only">Loading profile...</span>
    </div>
  );
}

function ProfileCard() {
  const { data: contact, isLoading } = useContact();

  return (
    <Card className="max-w-md w-fit" aria-labelledby="profile-heading">
      {isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="flex items-center gap-3 justify-center">
          <div className="w-20 h-20 relative rounded-full overflow-hidden shrink-0">
            {contact?.links.github ? (
              <Image
                src={contact.links.github + '.png'}
                alt={`${contact.name}'s profile photo`}
                width={96}
                height={96}
                className="object-cover w-20 h-20 border border-cyan-800 rounded-full"
              />
            ) : (
              <div
                className="w-20 h-20 bg-cyan-800 flex items-center justify-center text-cyan-400 rounded-full"
                role="img"
                aria-label="No profile image available"
              >
                <span aria-hidden="true">No Image</span>
              </div>
            )}
          </div>
          <div className="flex flex-col border-l border-orange-400 pl-4">
            <h2
              id="profile-heading"
              className="text-lg font-bold text-orange-400"
            >
              {contact?.name}
            </h2>
            <p className="text-sm text-cyan-200">{contact?.title}</p>
            <p className="text-sm text-cyan-200">{contact?.recent_employer}</p>
          </div>
        </div>
      )}

      <Link
        href="/profile"
        className="neumorphic px-3 py-1 rounded-4xl w-fit mx-auto text-orange-400 text-sm mt-2 font-mono block text-center transition-all duration-300 hover:bg-cyan-900"
        aria-label="View full profile"
      >
        View Profile
      </Link>
    </Card>
  );
}

export { ProfileCard };