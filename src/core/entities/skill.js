class Skill{
    constructor(skillName, point, attribute) {
        this.name = skillName;
        this.point = point;
        this.attribute = attribute;
    }

    setPoint(point) {
        this.point = point;
    }

    getTotal() {
        return this.point + this.attribute.getAbilityModifier();
    }
}

export default Skill;