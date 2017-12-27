import { Services } from '../services';

export const SkillsModel = {
  skills: [],
  getData() {
    return Services.getSkills().then((skills) => ({
      min: Math.min(...skills.map((skill) => new Date(skill.from).getTime())),
      max: Date.now(),
      skills: skills.map((skill) => ({
        ...skill,
        from: new Date(skill.from).getTime(),
        to: skill.to != null ? new Date(skill.to).getTime() : skill.to
      }))
    }));
  }
};
