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
    <div class="skills-disclaimer">My professional experience, not including the 10+ years before when I was just playing around with code.</div>
    {data.skills.map(Skill({ min: data.min, max: data.max }))}
    <div class="skills-legend">
      <div>{new Date(data.min).getFullYear()}</div>
      <div>{new Date().getFullYear()}</div>
    </div>
  </section>
;

// TODO: Animate progress bar from left to right
const Skill = ({ min, max }) => {
  const range = max - min;
  const getLeftPosition = (skill) => 100 * (skill.from - min) / range;
  const getRightPosition = (skill) => skill.to != null ? 100 * (max - skill.to) / range : 0;

  return (skill) =>
    <div class="skill" title={skill.description}>
      <div class="skill-name">{skill.name}</div>
      <div class="skill-level">{skill.level}</div>
      <div class="skill-range-background"></div>
      <div
        class="skill-range"
        style={{
          left: `${getLeftPosition(skill)}%`,
          right: `${getRightPosition(skill)}%`
        }}
      ></div>
    </div>
  ;
};
