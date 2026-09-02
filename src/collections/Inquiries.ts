import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'budget', 'source', 'status', 'createdAt'],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user), // Only admin users can read leads
    create: () => true, // Public visitors can submit inquiries
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone / WhatsApp',
    },
    {
      name: 'budget',
      type: 'text',
      label: 'Investment Budget',
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Investor Message / Question',
    },
    {
      name: 'source',
      type: 'text',
      label: 'Lead Source / Property Name',
      defaultValue: 'Website Inquiry',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New Lead', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Call Scheduled', value: 'scheduled' },
        { label: 'Qualified Investor', value: 'qualified' },
        { label: 'Closed / Converted', value: 'closed' },
      ],
      label: 'Lead Status',
    },
  ],
}
