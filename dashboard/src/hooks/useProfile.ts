import { useQuery } from '@tanstack/react-query';

interface Skill {
  name: string;
  level: 'none' | 'novice' | 'apprentice' | 'adept' | 'expert' | 'master';
  category: string;
}

interface Experience {
  company: string;
  title: string;
  start_date: string;
  end_date: string | 'Present';
  responsibilities: string[];
  metrics?: string[];
}

interface Education {
  institution: string;
  degree: string;
  field: string;
  graduation_date: string;
}

interface Contact {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    credly?: string;
  };
}
interface ProfileResponse {
  skills: {
    technical: Record<string, Skill[]>;
    soft: Skill[];
  };
  experience: Experience[];
  education: Education[];
  contact: Contact;
  preferences: Record<string, unknown>;
}

async function fetchProfile(): Promise<ProfileResponse> {
  const res = await fetch('/api/profile');
  if (!res.ok) throw new Error('Failed to fetch profile');
  return res.json();
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
}

export function useSkills() {
  const { data, ...rest } = useProfile();
  return {
    data: data?.skills ?? null,
    ...rest,
  };
}

export function useExperience() {
  const { data, ...rest } = useProfile();
  return {
    data: data?.experience ?? [],
    ...rest,
  };
}

export function useContact() {
  const { data, ...rest } = useProfile();
  return {
    data: data?.contact ?? null,
    ...rest,
  };
}
