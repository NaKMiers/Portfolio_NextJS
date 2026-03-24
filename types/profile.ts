export type SocialLink = {
  link: string
  type: string
  name: string
}

export type Stat = {
  label: string
  value: number
}

export type SkillItem = {
  icon: string
  name: string
}

export type SkillGroup = {
  groupName: string
  items: SkillItem[]
}

export type ExperienceItem = {
  companyName: string
  position: string
  start: string // ISO
  end: string // ISO
}

export type EducationItem = {
  schoolName: string
  major: string
  start: string
  end: string
}

export type Certificate = {
  link: string
  name: string
}

export type ServiceItem = {
  icon: string
  title: string
  description: string
}

export type ProjectItem = {
  title: string
  images: string[]
  description: string
  links: string[]
}

export type Profile = {
  cv?: string

  fullName: string
  username: string
  jobTitle: string[]
  description: string

  avatar?: string
  backgroundImage?: string

  socials: SocialLink[]

  profileHeading: string
  profileSubHeading: string
  stats: Stat[]

  aboutMe: string

  skills: SkillGroup[]
  experience: ExperienceItem[]
  education: EducationItem[]
  certificates: Certificate[]

  serviceHeading: string
  serviceSubHeading: string
  briefServices: string[]
  services: ServiceItem[]

  workHeading: string
  workSubHeading: string
  projects: ProjectItem[]
}
