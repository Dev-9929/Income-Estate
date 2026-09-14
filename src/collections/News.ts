import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
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
      label: 'News Headline / Title',
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
      defaultValue: 'MARKET NEWS',
      options: [
        { label: 'MARKET NEWS', value: 'MARKET NEWS' },
        { label: 'POLICY & FEMA', value: 'POLICY & FEMA' },
        { label: 'HOSPITALITY INSIGHTS', value: 'HOSPITALITY INSIGHTS' },
        { label: 'INFRASTRUCTURE', value: 'INFRASTRUCTURE' },
      ],
      label: 'News Category',
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Publish Date',
    },
    {
      name: 'readTime',
      type: 'text',
      label: 'Read Time (e.g. 4 min read)',
      defaultValue: '4 min read',
    },
    {
      name: 'author',
      type: 'text',
      label: 'Author / News Desk',
      defaultValue: 'INCOME ESTATE NEWS DESK',
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
      label: 'News Article Content',
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
