import { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'project-01',
    published: false,
    title: 'Project 01 Title',
    category: 'Automation',
    year: '2026',
    summary: 'One-line outcome summary goes here.',
    tools: ['Make.com', 'OpenAI'],
    cover: {
      src: '/images/placeholder.jpg',
      alt: 'Project 01 Cover',
      width: 1600,
      height: 1000
    }
  },
  {
    slug: 'project-02',
    published: false,
    title: 'Project 02 Title',
    category: 'Marketing',
    year: '2025',
    summary: 'One-line outcome summary goes here.',
    tools: ['GoHighLevel', 'Canva'],
    cover: {
      src: '/images/placeholder.jpg',
      alt: 'Project 02 Cover',
      width: 1600,
      height: 1000
    }
  },
  {
    slug: 'project-03',
    published: false,
    title: 'Project 03 Title',
    category: 'Sales Systems',
    year: '2025',
    summary: 'One-line outcome summary goes here.',
    tools: ['Stripe', 'n8n'],
    cover: {
      src: '/images/placeholder.jpg',
      alt: 'Project 03 Cover',
      width: 1600,
      height: 1000
    }
  },
  {
    slug: 'project-04',
    published: false,
    title: 'Project 04 Title',
    category: 'Web App',
    year: '2024',
    summary: 'One-line outcome summary goes here.',
    tools: ['Next.js', 'Vercel'],
    cover: {
      src: '/images/placeholder.jpg',
      alt: 'Project 04 Cover',
      width: 1600,
      height: 1000
    }
  }
];

export const getPublishedProjects = () => projects.filter(p => p.published);
