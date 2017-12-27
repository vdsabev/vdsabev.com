import './Skills.css';

/** @jsx h */
import { h } from '../dom';

export const Skills = ({ model, ...props }) =>
  <section class="skills narrow spacer" {...props}>
    {model.skills.map(Skill({ min: model.min, max: model.max }))}
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
