import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutTitle',
      title: 'About Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutContent',
      title: 'About Content',
      type: 'blockContent',
    }),
    defineField({
      name: 'toolsTitle',
      title: 'Tools Section Title',
      type: 'string',
    }),
    defineField({
      name: 'projectsTitle',
      title: 'Projects Section Title',
      type: 'string',
    }),
    defineField({
      name: 'blogTitle',
      title: 'Blog Section Title',
      type: 'string',
    }),
    defineField({
      name: 'testimonialsTitle',
      title: 'Testimonials Section Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Title',
      type: 'string',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA Button Label',
      type: 'string',
    }),
    defineField({
      name: 'ctaButtonHref',
      title: 'CTA Button URL',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Page d\'accueil'}
    },
  },
})
