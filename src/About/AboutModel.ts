const thisYear = new Date().getFullYear();
const yearIStartedWorking = 2010;

export interface Specialization {
  name: string;
  description: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export class AboutModel {
  yearsOfExperience = thisYear - yearIStartedWorking;

  // NOTE: Should always be >= 3 for enumerating like "a, b, and c" to work
  specializations: Specialization[] = [
    { name: 'single-page applications', description: 'A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.' },
    { name: 'progressive web applications', description: 'Progressive Web Apps, also known as Installable Web Apps or Hybrid Web Apps, are regular web pages or websites, but can appear to the user like traditional applications or native mobile applications. The application type attempts to combine features offered by most modern browsers with the benefits of mobile experience.' },
    { name: 'serverless computing', description: 'Serverless computing is a cloud computing execution model in which the cloud provider dynamically manages the allocation of machine resources. Pricing is based on the actual amount of resources consumed by an application, rather than on pre-purchased units of capacity. It is a form of utility computing.' }
  ];

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/vdsabev', icon: 'github-square.svg' },
    { name: 'Twitter', url: 'https://twitter.com/vdsabev', icon: 'twitter-square.svg' },
    { name: 'Medium', url: 'https://medium.com/@vdsabev', icon: 'medium.svg' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/vdsabev', icon: 'linkedin.svg' }
  ];
}
