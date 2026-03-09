import type {PortableTextBlock} from '@portabletext/types'
import type {ImageAsset, Slug} from '@sanity/types'
import groq from 'groq'

// ─── Posts ───────────────────────────────────────────────

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc) {
  _type,
  _createdAt,
  title,
  slug,
  excerpt,
  mainImage,
  tags,
  readingTime,
  author->{name, avatar}
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
  author->{name, avatar, bio},
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

export interface Author {
  name: string
  avatar?: ImageAsset
  bio?: string
}

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
  author?: Author
  relatedPosts?: Post[]
}

// ─── Projects ────────────────────────────────────────────

export const projectsQuery = groq`*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
  _type,
  _createdAt,
  title,
  slug,
  description,
  mainImage,
  tags,
  year
}`

export const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]`

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
  description?: string
  mainImage?: ImageAsset
  tags?: string[]
  year?: string
  challengeTitle?: string
  challengeBody?: PortableTextBlock[]
  solutionTitle?: string
  solutionBody?: PortableTextBlock[]
  resultsTitle?: string
  metrics?: Metric[]
  stack?: StackItem[]
}

// ─── Home Page ───────────────────────────────────────────

export const homePageQuery = groq`{
  "settings": *[_type == "homePage"][0],
  "posts": *[_type == "post" && defined(slug.current)] | order(_createdAt desc) [0...3] {
    _type, _createdAt, title, slug, excerpt, mainImage, tags, readingTime,
    author->{name, avatar}
  },
  "projects": *[_type == "project" && defined(slug.current)] | order(_createdAt desc) [0...4] {
    _type, _createdAt, title, slug, description, mainImage, tags, year
  },
  "testimonials": *[_type == "testimonial"] | order(_createdAt desc),
  "tools": *[_type == "tool"] | order(category asc, name asc)
}`

export interface SiteSettings {
  heroTitle?: string
  heroSubtitle?: string
  aboutTitle?: string
  aboutContent?: PortableTextBlock[]
  toolsTitle?: string
  projectsTitle?: string
  blogTitle?: string
  testimonialsTitle?: string
  ctaTitle?: string
  ctaDescription?: string
  contactEmail?: string
  socialLinks?: {platform: string; url: string}[]
}

export interface Testimonial {
  _type: 'testimonial'
  name: string
  role?: string
  content: string
  avatar?: ImageAsset
}

export interface Tool {
  _type: 'tool'
  name: string
  description?: string
  icon?: ImageAsset
  category?: string
}

export interface HomePage {
  settings: SiteSettings
  posts: Post[]
  projects: Project[]
  testimonials: Testimonial[]
  tools: Tool[]
}
