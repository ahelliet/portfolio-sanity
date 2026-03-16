import type {PortableTextBlock} from '@portabletext/types'
import type {ImageAsset, Slug} from '@sanity/types'
import groq from 'groq'

// ─── SEO ─────────────────────────────────────────────────

export interface SeoData {
  title: string
  description: string
  ogImageUrl?: string
  noIndex: boolean
}

const seoProjection = (titleFallback: string, descFallback?: string) => `"seo": {
  "title": coalesce(seo.title, ${titleFallback}, ""),
  "description": coalesce(seo.description, ${descFallback ? `${descFallback}, ` : ""}""),
  "ogImageUrl": seo.image.asset->url,
  "noIndex": seo.noIndex == true
}`

// ─── Pages (page builder) ────────────────────────────────

const linkProjection = `{
  ...,
  link {
    ...,
    internalLink->{_type, slug, title},
    "mediaUrl": mediaLink.asset->url,
    "mediaOriginalFilename": mediaLink.asset->originalFilename
  }
}`

const resolvedLinkProjection = `{
  ...,
  internalLink->{_type, slug, title},
  "mediaUrl": mediaLink.asset->url,
  "mediaOriginalFilename": mediaLink.asset->originalFilename
}`

const sectionsProjection = `sections[] {
  ...,
  _type == "section.hero" => {
    ...,
    ctas[] ${linkProjection}
  },
  _type == "section.grid" => {
    ...,
    viewAllLink ${resolvedLinkProjection}
  },
  _type == "section.cta" => {
    ...,
    button {
      ...,
      link ${resolvedLinkProjection}
    }
  },
  _type == "section.contact" => {
    ...,
    socialLinks[] {
      ...,
      link ${resolvedLinkProjection}
    }
  }
}`

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0] {
  _type,
  title,
  slug,
  ${seoProjection('title')},
  ${sectionsProjection}
}`

export const homepageQuery = groq`*[_type == "homePage"][0] {
  _type,
  ${seoProjection('"Accueil"')},
  ${sectionsProjection}
}`

// ─── Section types ───────────────────────────────────────

export interface SanityLink {
  linkType?: 'internal' | 'external' | 'media'
  internalLink?: {_type: string; slug?: Slug; title?: string}
  anchor?: string
  externalUrl?: string
  openInNewTab?: boolean
  mediaUrl?: string
  mediaOriginalFilename?: string
  downloadFilename?: string
}

export interface HeroCta {
  label?: string
  link?: SanityLink
  icon?: string
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

export interface SectionHero {
  _type: 'section.hero'
  _key: string
  badge?: string
  title?: string
  tagline?: string
  subtitle?: string
  ctas?: HeroCta[]
}

export interface SectionPageHeader {
  _type: 'section.pageHeader'
  _key: string
  title?: string
  description?: string
}

export interface SectionRichText {
  _type: 'section.richText'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  body?: PortableTextBlock[]
  image?: ImageAsset
  imagePosition?: 'left' | 'right'
  alternateBackground?: boolean
}

export interface SectionGrid {
  _type: 'section.grid'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  description?: string
  layout?: 'featured' | 'grid'
  showTagFilter?: boolean
  source?: 'posts' | 'projects'
  limit?: number
  viewAllLabel?: string
  viewAllLink?: SanityLink
  alternateBackground?: boolean
}

export interface SectionCta {
  _type: 'section.cta'
  _key: string
  title?: string
  description?: string
  button?: {label?: string; link?: SanityLink}
  alternateBackground?: boolean
}

export interface SectionMetrics {
  _type: 'section.metrics'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  items?: {value: string; label: string; description?: string}[]
  alternateBackground?: boolean
}

export interface SectionImage {
  _type: 'section.image'
  _key: string
  image?: ImageAsset
  alt?: string
  fullWidth?: boolean
}

export interface ContactSocialLink {
  icon?: string
  label?: string
  socialLinkType?: 'link' | 'email'
  link?: SanityLink
  emailAddress?: string
}

export interface SectionContact {
  _type: 'section.contact'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  anchor?: string
  description?: string
  email?: string
  socialLinks?: ContactSocialLink[]
  location?: string
  alternateBackground?: boolean
}

export interface SectionTestimonials {
  _type: 'section.testimonials'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  items?: {name: string; role?: string; content: string; avatar?: ImageAsset}[]
  alternateBackground?: boolean
}

export interface ToolItem {
  name: string
  icon?: string
}

export interface ToolCategory {
  name?: string
  description?: string
  items?: ToolItem[]
}

export interface SectionTools {
  _type: 'section.tools'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  anchor?: string
  categories?: ToolCategory[]
  alternateBackground?: boolean
}

export interface SectionAbout {
  _type: 'section.about'
  _key: string
  sectionNumber?: string
  sectionLabel?: string
  title?: string
  anchor?: string
  description?: string
  image?: ImageAsset
  stats?: {value: string; label: string}[]
  alternateBackground?: boolean
}

export type Section =
  | SectionHero
  | SectionPageHeader
  | SectionRichText
  | SectionGrid
  | SectionCta
  | SectionMetrics
  | SectionImage
  | SectionContact
  | SectionTestimonials
  | SectionTools
  | SectionAbout

export interface Page {
  _type: 'page' | 'homePage'
  title?: string
  slug?: Slug
  seo?: SeoData
  sections?: Section[]
}

// ─── Posts ───────────────────────────────────────────────

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  _type,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  tags,
  readingTime
}`

export const postQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _type,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  tags,
  readingTime,
  body,
  ${seoProjection('title', 'excerpt')},
  "seoImageUrl": coalesce(seo.image.asset->url, mainImage.asset->url),
  relatedPosts[]->{
    _type,
    _createdAt,
    title,
    slug,
    excerpt,
    mainImage,
    tags,
    readingTime
  }
}`

export interface Post {
  _type: 'post'
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  tags?: string[]
  readingTime?: number
  body?: PortableTextBlock[]
  seo?: SeoData
  seoImageUrl?: string
  relatedPosts?: Post[]
}

// ─── Projects ────────────────────────────────────────────

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
  _type,
  _createdAt,
  title,
  slug,
  badge,
  description,
  mainImage,
  tags,
  year,
  metrics
}`

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0] {
  ...,
  ${seoProjection('title', 'description')},
  "seoImageUrl": coalesce(seo.image.asset->url, mainImage.asset->url)
}`

export interface Metric {
  value: string
  label: string
  description?: string
}

export interface StackItem {
  name: string
  icon?: ImageAsset
  category?: string
}

export interface Project {
  _type: 'project'
  _createdAt: string
  title?: string
  slug: Slug
  badge?: string
  description?: string
  mainImage?: ImageAsset
  tags?: string[]
  year?: number
  challengeTitle?: string
  challengeBody?: PortableTextBlock[]
  solutionTitle?: string
  solutionBody?: PortableTextBlock[]
  resultsTitle?: string
  metrics?: Metric[]
  stack?: StackItem[]
  seo?: SeoData
  seoImageUrl?: string
}

// ─── Layout (Nav + Footer) ───────────────────────────────

export const layoutQuery = groq`*[_type == "siteSettings"][0] {
  title,
  description,
  language,
  "ogImageUrl": ogImage.asset->url,
  logo,
  authorName,
  authorAvatar,
  authorBio,
  navLinks[] {
    ...,
    internalLink->{_type, slug, title},
    "mediaUrl": mediaLink.asset->url,
    "mediaOriginalFilename": mediaLink.asset->originalFilename
  },
  socialLinks,
  footerCopyright,
  footerLinks
}`

export interface NavLink {
  label?: string
  linkType?: 'internal' | 'external' | 'media'
  internalLink?: {_type: string; slug?: Slug; title?: string}
  anchor?: string
  externalUrl?: string
  openInNewTab?: boolean
  mediaUrl?: string
  rightSide?: boolean
  style?: 'link' | 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive'
}

export interface LayoutData {
  title?: string
  description?: string
  language?: string
  ogImageUrl?: string
  logo?: ImageAsset
  authorName?: string
  authorAvatar?: ImageAsset
  authorBio?: string
  navLinks?: NavLink[]
  socialLinks?: {platform: string; url: string}[]
  footerCopyright?: string
  footerLinks?: {label: string; href: string}[]
}
