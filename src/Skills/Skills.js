import './Skills.css';

/** @jsx h */
import { h } from 'hyperapp';
import { Articles } from '../Article';

// TODO: Move to Firebase Database
// TODO: Write description
const skills = [
  {
    name: 'HTML',
    // description: '',
    from: '2010-06',
    level: 'expert'
  },

  {
    name: 'CSS',
    // description: '',
    from: '2010-06',
    level: 'expert'
  },

  {
    name: 'JavaScript',
    // description: '',
    from: '2010-06',
    level: 'expert'
  },

  {
    name: 'Node.js',
    // description: '',
    from: '2012-09',
    level: 'expert'
  },

  {
    name: 'Single-page Applications',
    // description: '',
    from: '2012-09',
    level: 'expert'
  },

  {
    name: 'MongoDB',
    // description: '',
    from: '2012-09',
    to: '2015-01',
    level: 'advanced'
  },

  {
    name: 'Firebase',
    // description: '',
    from: '2013-06',
    level: 'advanced'
  },

  {
    name: 'AngularJS',
    // description: '',
    from: '2014-09',
    to: '2017-04',
    level: 'expert'
  },

  {
    name: 'TypeScript',
    // description: '',
    from: '2016-01',
    level: 'expert'
  },

  {
    name: 'Mithril',
    // description: '',
    from: '2017-03',
    level: 'advanced'
  },

  {
    name: 'Progressive Web Applications',
    // description: '',
    from: '2017-03',
    level: 'intermediate'
  },

  {
    name: 'Hyperapp',
    // description: '',
    from: '2017-08',
    level: 'intermediate'
  }
];

const data = {
  min: Math.min(...skills.map((skill) => new Date(skill.from).getTime())),
  max: Date.now(),
  skills: skills.map((skill) => ({
    ...skill,
    from: new Date(skill.from).getTime(),
    to: skill.to != null ? new Date(skill.to).getTime() : skill.to
  }))
};

export const Skills = () =>
  <section class="skills narrow spacer">
    {data.skills.map(Skill({ min: data.min, max: data.max }))}
  </section>
;

// TODO: Animate progress bar from left to right
const Skill = ({ min, max }) => {
  const range = max - min;
  const getLeftPosition = (skill) => 100 * (skill.from - min) / range;
  const getRightPosition = (skill) => skill.to != null ? 100 * (max - skill.to) / range : 0;

  return (skill) => {
    const left = `${getLeftPosition(skill)}%`;
    const right = `${getRightPosition(skill)}%`;
    const fromYear = new Date(skill.from).getFullYear();
    const toYear = skill.to != null ? new Date(skill.to).getFullYear() : new Date().getFullYear();
    const years = toYear - fromYear;

    return (
      <div class="skill" title={skill.description}>
        <div class="skill-name pull-left">{skill.name}</div>
        <div class="skill-level pull-right">{skill.level}</div>
        <div class="clear"></div>

        <div class="skill-range-background"></div>

        <div class="skill-range" style={{ left, right }}>
          <div class="skill-year pull-left">{years >= 1 ? fromYear : null}</div>
          <div class="skill-year pull-right">{years >= 1 ? toYear : null}</div>
          <div class="clear"></div>
        </div>
      </div>
    );
  };
};
