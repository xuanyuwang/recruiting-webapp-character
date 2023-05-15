import { CLASS_LIST } from "../../consts";

class Class {
  constructor(className, classRequirements) {
    this.name = className;
    this.requirements = classRequirements;
  }

  validateRequirements(attributes) {
    let valid = true;
    for (let [attributeName, attributeRequirement] of Object.entries(this.requirements)) {
      if (attributes[attributeName].score < attributeRequirement) {
        valid = false;
        break;
      }
    }
    return valid;
  }
}

const Classes = {}
for(const [className, classRequirements] of Object.entries(CLASS_LIST)){
    Classes[className] = new Class(className, classRequirements);
};

export default Classes;
