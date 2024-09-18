export const argonConfig = {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1,
};

export const dummyReview : {
	projectId: string;
	email: string;
	feedback: string;
	rating: 'BAD' | 'DECENT' | 'LOVE_IT';
	submittedAt: Date;
}[] = [
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'marketing.guru@brand.com',
    feedback: 'Great analytics for our marketing campaigns!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T08:10:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'student.user@university.edu',
    feedback: 'Helpful for my projects, but the free tier is too limited.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-19T09:15:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'finance.analyst@bigcorp.com',
    feedback: 'Lacks some advanced financial modeling features we need.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-19T10:20:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'freelance.designer@creative.net',
    feedback: 'Love the templates, saved me so much time!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T11:30:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'tech.support@helpdesk.org',
    feedback: 'Too many users reporting installation issues.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-19T12:45:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'sales.manager@enterprise.com',
    feedback: 'The CRM integration is a game-changer for our team.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T13:50:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'privacy.officer@securedata.net',
    feedback: 'Concerned about data handling practices. Need more information.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-19T14:55:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'customer.success@saas.io',
    feedback: 'Our clients love it, but onboarding could be smoother.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-19T16:00:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'mobile.user@onthego.com',
    feedback: 'App crashes frequently on my Android device.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-19T17:05:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'nonprofit.director@charity.org',
    feedback: "Appreciate the discount for nonprofits. It's been very helpful.",
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T18:10:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'ux.designer@interface.design',
    feedback: 'Impressive UI, but some accessibility issues need addressing.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-19T19:15:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'data.scientist@analytics.ai',
    feedback: 'Powerful data processing capabilities. Extremely satisfied!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T20:20:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'small.business.owner@localshop.com',
    feedback: 'A bit overwhelming for my small operation. Simpler version needed.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-19T21:25:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'corporate.trainer@learning.edu',
    feedback: 'Great for team training sessions. Interactive features are a plus.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-19T22:30:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'international.user@global.world',
    feedback: 'Limited language options. Please add more translations.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-19T23:35:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'project.manager@deadlines.com',
    feedback: 'The Gantt chart feature has revolutionized our project planning.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T00:40:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'social.media.manager@trending.now',
    feedback: 'Need better integration with popular social media platforms.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T01:45:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'legal.counsel@lawfirm.legal',
    feedback: 'Concerns about compliance with latest data protection regulations.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-20T02:50:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'freelance.writer@wordsmith.ink',
    feedback: 'The content creation tools are fantastic. Big time-saver!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T03:55:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'it.admin@techsupport.net',
    feedback: 'Deployment was smooth, but ongoing maintenance is challenging.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T05:00:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'ecommerce.owner@onlinestore.shop',
    feedback: 'The inventory management feature is exactly what we needed!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T06:05:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'graphic.designer@visuals.art',
    feedback: 'Love the design assets, but need more customization options.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T07:10:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'customer.support@helpline.com',
    feedback: 'The ticketing system has streamlined our support process.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T08:15:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'startup.ceo@nextbigidea.io',
    feedback: "Pricing tiers don't scale well for rapidly growing startups.",
    rating: 'BAD',
    submittedAt: new Date('2024-09-20T09:20:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'hr.manager@peopleops.org',
    feedback: 'The performance review module has greatly simplified our processes.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T10:25:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'content.creator@youtube.video',
    feedback: 'Need better video editing capabilities within the platform.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T11:30:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'research.scientist@labdata.science',
    feedback: 'Data visualization tools are impressive, but export options are limited.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T12:35:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'event.planner@conferences.events',
    feedback: 'The scheduling conflicts feature has been a lifesaver!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T13:40:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'personal.trainer@fitness.health',
    feedback: 'Need more fitness-specific templates and tracking features.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T14:45:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'restaurant.owner@finedining.food',
    feedback: 'Reservation system is buggy and caused overbookings.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-20T15:50:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'software.architect@systemdesign.dev',
    feedback: 'Impressive scalability and robust API. Excellent job!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T16:55:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'travel.agent@vacations.travel',
    feedback: 'The itinerary planning feature needs improvement.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T18:00:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'real.estate.agent@properties.home',
    feedback: 'Virtual tour integration has boosted our online showings!',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T19:05:15.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'online.teacher@elearning.edu',
    feedback: 'More interactive elements needed for engaging online classes.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T20:10:30.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'fashion.blogger@trends.style',
    feedback: 'Love the social media scheduling, but need more visual customization.',
    rating: 'DECENT',
    submittedAt: new Date('2024-09-20T21:15:45.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'customer.experience@satisfaction.com',
    feedback: 'The sentiment analysis tool has transformed our approach to feedback.',
    rating: 'LOVE_IT',
    submittedAt: new Date('2024-09-20T22:20:00.000Z')
  },
  {
    projectId: 'dc5e5d3a-dcfa-440d-bc94-0754a6fe7897',
    email: 'game.developer@indiegames.play',
    feedback: 'Need better support for game development workflows.',
    rating: 'BAD',
    submittedAt: new Date('2024-09-20T23:25:15.000Z')
  },
];
