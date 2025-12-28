'use client';

import Image from 'next/image';
import { Card, Skeleton } from '@/src/components/ui';
import { Mail, MapPin, Github, Linkedin, Globe } from 'lucide-react';
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
    <Card className="w-full h-fit" aria-labelledby="profile-heading">
      {isLoading ? (
        <ProfileCardSkeleton />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-4">
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
            <div className="flex flex-col gap-1 border-l border-orange-400/70 pl-4">
              <h2
                id="profile-heading"
                className="text-lg font-semibold text-accent-strong"
              >
                {contact?.name}
              </h2>
              <div className="flex flex-col gap-1 text-sm text-cyan-200">
                <span>
                  {contact?.title}
                </span>
                <span className="text-cyan-200/80">{contact?.recent_employer}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-cyan-200 flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
              {contact?.location.city}, {contact?.location.state} {contact?.location.remote_only ? '(Remote Only)' : ''}
            </p>
            <a
              href={`mailto:${contact?.email}`}
              className="text-cyan-200 hover:text-cyan-100 interactive flex items-center gap-2 w-fit"
            >
              <Mail className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden="true" />
              {contact?.email}
            </a>
            <div className="flex flex-wrap gap-2">
              {contact?.links.linkedin && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={contact?.links.linkedin}
                  className="btn-secondary text-xs"
                >
                  <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                  LinkedIn
                </a>
              )}
              {contact?.links.github && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={contact?.links.github}
                  className="btn-secondary text-xs"
                >
                  <Github className="h-3.5 w-3.5" aria-hidden="true" />
                  GitHub
                </a>
              )}
              {contact?.links.portfolio && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={contact?.links.portfolio}
                  className="btn-secondary text-xs"
                >
                  <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                  Portfolio
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export { ProfileCard };
