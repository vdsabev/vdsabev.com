import { Services } from '../services';

export interface Skill {
  from: string | number;
  to: string | number;
  name: string;
  description: string;
  level: string;
}

export class SkillsModel {
  min: number;
  max: number;
  skills: Skill[] = [];

  getData() {
    return Services.getSkills().then((skills: Skill[]) => ({
      min: Math.min(...skills.map((skill) => new Date(skill.from as string).getTime())),
      max: Date.now(),
      skills: skills.map((skill) => ({
        ...skill,
        from: new Date(skill.from as string).getTime(),
        to: skill.to != null ? new Date(skill.to as string).getTime() : skill.to
      } as Skill))
    }));
  }
}
