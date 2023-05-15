import { ATTRIBUTE_LIST, SKILL_LIST } from "../../consts";
import Attribute from "./attribute";
import Skill from "./skill";

const DEFAULT_ATTRIBUTE_SCORE = 10;
const DEFAULT_SKILL_POINT = 0;

class Character {
  constructor(id) {
    this.id = id;
    this.initializeAttributes();
    this.initializeSkillPoints();
    this.initializeSkills();
  }

  reset() {
    this.initializeAttributes();
    this.initializeSkillPoints();
    this.initializeSkills();
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(json) {
    const character = JSON.parse(json);
    const newCharacter = new Character(character.id);
    Object.values(character.attributes).forEach((value) => {
      newCharacter.attributes[value.name] = new Attribute(
        value.name,
        value.score
      );
    });
    newCharacter.initializeSkillPoints();
    Object.values(character.skills).forEach((value) => {
      newCharacter.skills[value.name] = new Skill(
        value.name,
        value.point,
        newCharacter.attributes[value.attribute.name]
      );
    });
    return newCharacter;
  }

  initializeSkillPoints() {
    this.totalSkillPoints =
      10 + 4 * this.attributes["Intelligence"].getAbilityModifier();
    this.availableSkillPoints = this.totalSkillPoints;
  }

  changeAvailableSkillPoints(points) {
    if (this.availableSkillPoints - points < 0) {
      return 0;
    } else {
      this.availableSkillPoints -= points;
      return points;
    }
  }

  setAttribute(attributeName, score) {
    let valid = false;
    let currentScore = this.attributes[attributeName].score;
    this.attributes[attributeName].setScore(score);
    const changedTotalSkillPoints =
      10 + 4 * this.attributes["Intelligence"].getAbilityModifier();
    const changedAvailableSkillPoints =
      changedTotalSkillPoints - this.totalSkillPoints;
    if (this.validateAttributes()) {
        valid = true;
    }
    if (valid) {
      this.totalSkillPoints = changedTotalSkillPoints;
      this.availableSkillPoints = Math.max(0, this.availableSkillPoints + changedAvailableSkillPoints);
      return true;
    } else {
      this.attributes[attributeName].setScore(currentScore);
      return false;
    }
  }

  initializeAttributes() {
    this.attributes = {};
    for (let attributeName of ATTRIBUTE_LIST) {
      this.attributes[attributeName] = new Attribute(
        attributeName,
        DEFAULT_ATTRIBUTE_SCORE
      );
    }
  }

  validateAttributes() {
    let valid = true;
    let totalPoints = 0;
    for (let attributeName of ATTRIBUTE_LIST) {
      totalPoints += this.attributes[attributeName].score;
      if (totalPoints > 70 || this.attributes[attributeName].score < 0) {
        valid = false;
      }
    }
    return valid;
  }

  initializeSkills() {
    this.skills = {};
    for (let skill of SKILL_LIST) {
      let { name, attributeModifier } = skill;
      this.skills[name] = new Skill(
        name,
        DEFAULT_SKILL_POINT,
        this.attributes[attributeModifier]
      );
    }
  }

  changeSkillPoint(skillName, point) {
    const changedAvailablePoint = this.availableSkillPoints - point;
    if (
      changedAvailablePoint < this.totalSkillPoints &&
      changedAvailablePoint >= 0
    ) {
      const changedSkillPoint = this.skills[skillName].point + point;
      if (changedSkillPoint >= 0) {
        this.skills[skillName].setPoint(changedSkillPoint);
        this.availableSkillPoints = changedAvailablePoint;
        return true;
      }
    }
    return false;
  }
}

const character = new Character(1);

export default character;
export { Character, DEFAULT_ATTRIBUTE_SCORE, DEFAULT_SKILL_POINT };
