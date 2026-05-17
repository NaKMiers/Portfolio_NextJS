import type {
  Certificate,
  EducationItem,
  ExperienceItem,
  Profile,
  ProjectItem,
  ProjectPart,
  ServiceItem,
  SocialLink,
  SkillGroup,
  SkillItem,
} from '@/types/profile'
import { makeEmptyProfile, normalizeProfile } from '@/lib/profile'
import { MAX_UPLOAD_BYTES, formatMaxUploadMb } from '@/lib/upload-limits'

export const MAX_UPLOAD_MB_LABEL = formatMaxUploadMb()

export const labelCls = 'mb-1.5 block text-xs font-medium uppercase tracking-wide text-zinc-400'
export const inputCls =
  'w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/20'
export const textareaCls =
  'w-full min-h-[88px] rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-500/70 focus:ring-2 focus:ring-cyan-500/20'
export const secondaryBtnCls =
  'rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-zinc-600 hover:bg-zinc-800'
export const ghostBtnCls =
  'rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800/80'
export const primaryBtnCls =
  'rounded-xl border border-cyan-500/40 bg-cyan-500/20 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-60'

export async function uploadAssetToCloudinary(
  file: File,
  kind: 'avatar' | 'background' | 'cv' | 'project',
  projectIndex?: number
): Promise<string> {
  if (file.size > MAX_UPLOAD_BYTES) {
    throw new Error(`File must be ${MAX_UPLOAD_MB_LABEL} MB or smaller`)
  }
  const fd = new FormData()
  fd.append('file', file)
  fd.append('kind', kind)
  if (kind === 'project' && projectIndex !== undefined) {
    fd.append('projectIndex', String(projectIndex))
  }
  const res = await fetch('/api/upload', { method: 'POST', body: fd })
  const data = (await res.json()) as { url?: string; error?: string }
  if (!res.ok) throw new Error(data?.error || 'Upload failed')
  if (!data.url) throw new Error('Upload returned no URL')
  return data.url
}

export function makeMockProfile(): Profile {
  return {
    cv: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fullName: 'Alex Johnson',
    username: 'Alex Developer',
    jobTitle: ['Full-stack engineer'],
    description: 'I build fast, accessible web apps with Next.js and thoughtful UX.',
    avatar: '/file.svg',
    backgroundImage: '/vercel.svg',
    socials: [
      { name: 'AlexDev', icon: 'github', link: 'https://github.com/example' },
      { name: 'Alex', icon: 'linkedin', link: 'https://linkedin.com/in/example' },
    ],
    profileHeading: 'Ship products people love',
    profileSubHeading: 'Design systems, APIs, and polished interfaces.',
    stats: [
      { label: 'Years experience', value: 6 },
      { label: 'Projects shipped', value: 24 },
    ],
    aboutMe:
      'Former designer turned engineer. I care about performance, a11y, and clear copy. Based in UTC+7.',
    skills: [
      {
        groupName: 'Frontend',
        items: [
          { icon: 'react', name: 'React' },
          { icon: 'next', name: 'Next.js' },
        ],
      },
      {
        groupName: 'Backend',
        items: [
          { icon: 'node', name: 'Node.js' },
          { icon: 'mongo', name: 'MongoDB' },
        ],
      },
    ],
    experience: [
      { companyName: 'Acme Labs', position: 'Senior engineer', start: '2021-03-01', end: '2025-01-15' },
      { companyName: 'Beta Studio', position: 'Full-stack developer', start: '2019-06-01', end: '2021-02-28' },
    ],
    education: [
      { schoolName: 'State University', major: 'Computer Science', start: '2015-09-01', end: '2019-05-01' },
    ],
    certificates: [{ name: 'AWS Cloud Practitioner', link: 'https://example.com/cert/aws' }],
    serviceHeading: 'What I can help with',
    serviceSubHeading: 'From idea to production',
    briefServices: ['Web apps', 'API design', 'Performance audits', 'Mentoring'],
    services: [
      { icon: 'layout', title: 'Product builds', description: 'End-to-end implementation with CI, monitoring, and docs.' },
      { icon: 'zap', title: 'Performance', description: 'Core Web Vitals, caching, and lean bundles.' },
    ],
    workHeading: 'Selected work',
    workSubHeading: 'Recent case studies',
    projects: [
      {
        title: 'Analytics Dashboard',
        parts: [
          {
            image: '/window.svg',
            description: 'SaaS dashboard with real-time analytics and role-based access.',
            link: 'https://example.com/demo',
          },
          {
            image: '/file.svg',
            description: 'Repository and technical notes.',
            link: 'https://github.com/example/app',
          },
        ],
      },
      {
        title: 'Marketing Platform',
        parts: [
          {
            image: '/vercel.svg',
            description: 'Marketing site with CMS-driven content and A/B hooks.',
            link: 'https://example.com/case-study',
          },
        ],
      },
    ],
  }
}

