'use client';
import { Card } from '../ui/Card';

function ProfileCard() {
  return (
    <Card>
      <h2 className="text-lg font-bold">John Doe</h2>
      <p className="text-sm text-gray-600">Software Engineer</p>
    </Card>
  );
}

export { ProfileCard };