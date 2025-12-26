import { useQuery } from '@tanstack/react-query';

type SkillLevel = 'none' | 'novice' | 'apprentice' | 'adept' | 'expert' | 'master';

interface SkillLevelDescriptions {
  none: string;
  novice: string;
  apprentice: string;
  adept: string;
  expert: string;
  master: string;
}

interface SkillsData {
  skill_levels: SkillLevelDescriptions;
  programming_languages: Record<string, SkillLevel>;
  frameworks_and_libraries: Record<string, SkillLevel>;
  apis_and_protocols: Record<string, SkillLevel>;
  databases: Record<string, SkillLevel>;
  cloud_and_devops: Record<string, SkillLevel>;
  'testing & monitoring': Record<string, SkillLevel>;
  tools: Record<string, SkillLevel>;
  AI: Record<string, SkillLevel>;
  other: Record<string, SkillLevel>;
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
  recent_employer: string;
  email: string;
  phone?: string;
  location: {
    city: string;
    state?: string;
    timezone: string;
    remote_only?: boolean;
  }
  links: {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    credly?: string;
  };
}
interface ProfileResponse {
  skills: SkillsData;
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
