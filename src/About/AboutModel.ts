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
  // NOTE: Should always be >= 3 for enumerating like "a, b, and c" to work
  specializations: Record<string, Specialization> = {
    spa: {
      name: 'single-page applications',
      description:
        'A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.',
    },
  };

  socialLinks: SocialLink[] = [
    { name: 'GitHub', url: 'https://github.com/vdsabev', icon: 'github-square.svg' },
    { name: 'Twitter', url: 'https://twitter.com/vdsabev', icon: 'twitter-square.svg' },
    { name: 'Medium', url: 'https://medium.com/@vdsabev', icon: 'medium.svg' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/vdsabev', icon: 'linkedin.svg' },
  ];
}
