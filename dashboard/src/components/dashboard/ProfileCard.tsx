'use client';
import { Card } from '../ui/Card';
import { useContact } from '@/src/hooks';

function ProfileCard() {
  const { data: contact } = useContact();
  
  return (
    <Card>
      <h2 className="text-lg font-bold text-orange-400">{contact?.name}</h2>
      <p className="text-sm text-cyan-200">{contact?.title}</p>
    </Card>
  );
}

export { ProfileCard };