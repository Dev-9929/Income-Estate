import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'location', 'priceStarting', 'rentalYield', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Property Name',
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
      defaultValue: 'roi',
      options: [
        { label: 'ROI Resort Property', value: 'roi' },
        { label: 'Branded Residence', value: 'branded' },
      ],
      label: 'Category',
    },
    {
      name: 'heroLabel',
      type: 'text',
      label: 'Hero Badge / Tag',
      defaultValue: 'Premium Institutional Asset',
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      label: 'Location / Micro-Market',
    },
    {
      name: 'priceStarting',
      type: 'text',
      label: 'Starting Price (e.g. ₹ 70 Lacs)',
      required: true,
    },
    {
      name: 'rentalYield',
      type: 'text',
      label: 'Rental Yield (e.g. 9.2%)',
    },
    {
      name: 'targetIrr',
      type: 'text',
      label: 'Target IRR (e.g. 14.5%)',
    },
    {
      name: 'plotArea',
      type: 'text',
      label: 'Plot Area / Grounds (e.g. 1100 SqYd or 5 Acres)',
    },
    {
      name: 'leaseDuration',
      type: 'text',
      label: 'Lease Guarantee Duration (e.g. 5 Years / 15 Years)',
    },
    {
      name: 'possessionStatus',
      type: 'text',
      label: 'Possession Status (e.g. Ready / Under Construction)',
    },
    {
      name: 'unitsAvailable',
      type: 'text',
      label: 'Units Available (e.g. 8+)',
    },
    {
      name: 'overviewText',
      type: 'textarea',
      label: 'Overview Description',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Featured Image',
    },
    {
      name: 'amenities',
      type: 'array',
      label: 'Amenities',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Amenity Name',
        },
      ],
    },
    {
      name: 'paymentPlan',
      type: 'array',
      label: 'Payment Schedule',
      fields: [
        {
          name: 'milestone',
          type: 'text',
          label: 'Milestone Name',
        },
        {
          name: 'timeline',
          type: 'text',
          label: 'Timeline / Due Date',
        },
        {
          name: 'percent',
          type: 'text',
          label: 'Percentage (e.g. 10%)',
        },
        {
          name: 'isHighlight',
          type: 'checkbox',
          label: 'Highlight in Table',
          defaultValue: false,
        },
      ],
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
