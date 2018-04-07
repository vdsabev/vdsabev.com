import { Services } from '../Services';

export interface NumberRange {
  min: number;
  max: number;
}

export interface Skill {
  from: string | number;
  to: string | number;
  name: string;
  description: string;
  level: string;
}

export class SkillsModel implements NumberRange {
  min = 0;
  max = 0;
  skills: Skill[] = [];

  async getData() {
    const skills = await Services.getSkills();

    return {
      min: Math.min(...skills.map((skill) => new Date(skill.from as string).getTime())),
      max: Date.now(),
      skills: skills.map<Skill>((skill) => ({
        ...skill,
        from: new Date(skill.from as string).getTime(),
        to: skill.to != null ? new Date(skill.to as string).getTime() : skill.to,
      })),
    };
  }
}
