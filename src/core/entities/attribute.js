class Attribute{
  constructor(attributeName, score) {
    this.name = attributeName;
    this.score = score;
  }

  getAbilityModifier() {
    return Math.floor((this.score - 10) / 2);
  }

  setScore(score) {
    this.score = score; 
  }
}

export default Attribute;