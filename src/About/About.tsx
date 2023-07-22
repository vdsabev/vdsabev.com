import picture from './picture.jpg';
import github from './github-square.svg';
import twitter from './twitter-square.svg';
import medium from './medium.svg';
import linkedin from './linkedin.svg';

interface Specialization {
  name: string;
  description: string;
}

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

const data: {
  specializations: Record<string, Specialization>;
  socialLinks: SocialLink[];
} = {
  specializations: {
    spa: {
      name: 'single-page applications',
      description:
        'A single-page application (SPA) is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server. This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.',
    },
  },

  socialLinks: [
    {
      name: 'GitHub',
      url: 'https://github.com/vdsabev',
      icon: github,
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/vdsabev',
      icon: twitter,
    },
    { name: 'Medium', url: 'https://medium.com/@vdsabev', icon: medium },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/vdsabev',
      icon: linkedin,
    },
  ],
};

const About = () => (
  <section
    className="
      relative
      grid
      grid-cols-[auto_1fr]
      bg-neutral-400
      rounded
      p-5
      pb-2

      before:content-[attr(data-content)]
      before:absolute
      before:top-0
      before:left-1
      before:block
      before:skew-x-[-15deg]
      before:font-bold
      before:text-neutral-600
      before:text-3xl

      after:content-[attr(data-content)]
      after:absolute
      after:-bottom-3
      after:right-2
      after:block
      after:skew-x-[-15deg]
      after:font-bold
      after:text-neutral-600
      after:text-3xl
    "
    data-content='"'
  >
    <img className="rounded" src={picture} alt="Vlad Sabev" />

    <div className="row-span-2 ml-4">
      <p>I believe work should be engaging, fulfilling, and meaningful.</p>

      <p className="mt-4">
        By using the right tool for each job, constantly refining my approach,
        and keeping in mind the business value for my clients, I strive to
        create the best web applications possible.
      </p>

      <p className="mt-4">
        With exposure to a wide range of technologies, I currently specialize in
        developing modern{' '}
        <Specialization specialization={data.specializations.spa} /> for the
        web.
      </p>
    </div>

    <div className="pt-2 text-center">
      {data.socialLinks.map((link) => (
        <a
          key={link.name}
          className="inline-block"
          target="_blank"
          rel="noopener"
          href={link.url}
          title={link.name}
        >
          <img
            className="mx-1 transition-opacity duration-300 ease-in-out opacity-30 h-9 hover:opacity-80 hover:scale-125"
            src={link.icon}
            alt={link.name}
          />
        </a>
      ))}
    </div>
  </section>
);

export default About;

const Specialization = ({
  specialization,
}: {
  specialization: Specialization;
}) => <abbr className="decoration-dotted decoration-neutral-600 underline-offset-4 cursor-help" title={specialization.description}>{specialization.name}</abbr>;
