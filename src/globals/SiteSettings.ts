import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: { read: () => true },
  fields: [
    { name: 'siteName', type: 'text', defaultValue: 'The New India Government' },
    { name: 'tagline', type: 'text', defaultValue: 'Truth · Transparency · Voice' },
    { name: 'badgeText', type: 'text', defaultValue: "THE CITIZEN'S PRESS" },
    { name: 'cityLine', type: 'text', defaultValue: 'NEW DELHI · MUMBAI · BENGALURU' },
    {
      name: 'voteQuestion',
      type: 'text',
      defaultValue: 'Is it time for a new India government?',
    },
    {
      name: 'voteOptions',
      type: 'array',
      fields: [
        { name: 'key', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
      ],
      defaultValue: [
        { key: 'yes-time-for-change', label: 'YES, time for change' },
        { key: 'no-current-fine', label: 'NO, current is fine' },
        { key: 'undecided', label: 'UNDECIDED' },
      ],
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        { name: 'aboutText', type: 'textarea' },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text' },
            { name: 'url', type: 'text' },
          ],
        },
      ],
    },
  ],
}
