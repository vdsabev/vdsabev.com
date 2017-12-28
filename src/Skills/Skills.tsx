import './Skills.css';

/** @jsx h */
import { h } from '../dom';
import { Skill, SkillsModel } from './SkillsModel';

export const Skills = ({ model, ...props }: { model: SkillsModel }) =>
  <section class="skills narrow spacer" {...props}>
    {model.skills.map(Skill({ min: model.min, max: model.max }))}
  </section>
;

// TODO: Animate progress bar from left to right
const Skill = ({ min, max }: Partial<SkillsModel>) => {
  const range = max - min;
  const getLeftPosition = (skill: Skill) => 100 * ((skill.from as number) - min) / range;
  const getRightPosition = (skill: Skill) => skill.to != null ? 100 * (max - (skill.to as number)) / range : 0;

  return (skill: Skill) => {
    const left = `${getLeftPosition(skill)}%`;
    const right = `${getRightPosition(skill)}%`;
    const fromYear = new Date(skill.from as number).getFullYear();
    const toYear = skill.to != null ? new Date(skill.to as number).getFullYear() : new Date().getFullYear();
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
