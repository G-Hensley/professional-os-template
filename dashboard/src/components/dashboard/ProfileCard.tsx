'use client';
import { Card } from '../ui/Card';
import { useContact } from '@/src/hooks';
import Image from 'next/image';
import Link from 'next/link';

function ProfileCard() {
  const { data: contact, isLoading } = useContact();
  if (!isLoading) {
    const imageUrl = (contact?.links.github ?? '') + '.png';
    console.log(imageUrl);
  }
  
  return (
    <Card className='max-w-md w-fit'>
      <div className="flex items-center gap-3 justify-center">
        {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : (
        <div className="w-20 h-20 relative rounded-full overflow-hidden">
          {contact?.links.github ? (
            <Image
              src={contact.links.github + '.png'}
              alt={contact.name}
              width={96}
              height={96}
              className="object-cover w-20 h-20 border border-cyan-800 rounded-full"
            />
          ) : (
            <div className="w-24 h-24 bg-cyan-800 flex items-center justify-center text-cyan-400">
              No Image
            </div>
          )}
        </div>
      )}
        <div className='flex flex-col border-l border-orange-400 pl-4'>
          <h2 className="text-lg font-bold text-orange-400">{contact?.name}</h2>
          <p className="text-sm text-cyan-200">{contact?.title}</p>
          <p className="text-sm text-cyan-200">{contact?.recent_employer}</p>
        </div>
      </div>
      <Link href="/profile" className="neumorphic px-3 py-1 rounded-4xl w-fit mx-auto
        text-orange-400 text-sm mt-2 font-mono block text-center transition-all duration-300
        hover:bg-cyan-900"
      >
        View Profile
      </Link>
    </Card>
  );
}

export { ProfileCard };