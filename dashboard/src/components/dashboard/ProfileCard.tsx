'use client';
import { Card } from '../ui/Card';
import { useContact } from '@/src/hooks';
import Image from 'next/image';

function ProfileCard() {
  const { data: contact, isLoading } = useContact();
  if (!isLoading) {
    const imageUrl = (contact?.links.github ?? '') + '.png';
    console.log(imageUrl);
  }
  
  return (
    <Card>
      <div className="flex items-center gap-2">
        {isLoading ? (
        <p className="text-cyan-200">Loading...</p>
      ) : (
        <div className="w-20 h-20 relative rounded-full overflow-hidden mx-auto">
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
      <h2 className="text-lg font-bold text-orange-400">{contact?.name}</h2>
      </div>
      <p className="text-sm text-cyan-200">{contact?.title}</p>
    </Card>
  );
}

export { ProfileCard };