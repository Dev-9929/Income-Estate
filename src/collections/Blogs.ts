import type { CollectionConfig } from 'payload'

export const Blogs: CollectionConfig = {
  slug: 'blogs',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'author', 'publishedDate', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Article Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      label: 'URL Slug',
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'FRACTIONAL GUIDE',
      options: [
        { label: 'FRACTIONAL GUIDE', value: 'FRACTIONAL GUIDE' },
        { label: 'RESORT ASSETS', value: 'RESORT ASSETS' },
        { label: 'TAX & LEGAL', value: 'TAX & LEGAL' },
        { label: 'MARKET TRENDS', value: 'MARKET TRENDS' },
      ],
      label: 'Category',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Publish Date',
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time (e.g. 5 min read)',
      defaultValue: '5 min read',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author / Desk',
      defaultValue: 'INCOME ESTATE RESEARCH DESK',
    },
    {
      name: 'coverImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Cover Image',
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Short Excerpt / Summary',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Article Content',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'published',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      label: 'Publication Status',
    },
  ],
}
