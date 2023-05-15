import { createSlice } from "@reduxjs/toolkit";
import character from "../entities/character";


const initialState = {
    totalSkillPoints: character.totalSkillPoints,
    availableSkillPoints: character.availableSkillPoints,
    skills: {}
};
for(const [key, value] of Object.entries(character.skills)){
    initialState.skills[key] = {
        name: key,
        point: value.point,
        modifier: value.attribute.name,
        modifierValue: value.attribute.getAbilityModifier(),
        total: value.getTotal(),
    }
}

const skillSlice = createSlice({
    name: 'skill',
    initialState: initialState,
    reducers: {
        changeSkillPoint: (state, action) => {
            const {skillName, change} = action.payload;
            if(character.changeSkillPoint(skillName, change)){
                state.skills[skillName].point = character.skills[skillName].point;
                state.skills[skillName].total = character.skills[skillName].getTotal();
                state.availableSkillPoints = character.availableSkillPoints;
            }
        },
        updateSkills: (state, action) => {
            const {attributeName} = action.payload;
            for(let [skillName, skillState] of Object.entries(state.skills)){
                if(skillState.modifier === attributeName){
                    skillState.modifierValue = character.attributes[attributeName].getAbilityModifier();
                    skillState.total = character.skills[skillName].getTotal();
                }
            }
            console.log(character.totalSkillPoints, character.availableSkillPoints)
            state.totalSkillPoints = character.totalSkillPoints;
            state.availableSkillPoints = character.availableSkillPoints;
        },
        forceSetSkillPoint: (state, action) => {
            const {skillName, skillPoint} = action.payload;
            character.skills[skillName].setPoint(skillPoint);
            state.skills[skillName].point = skillPoint;
            state.totalSkillPoints = character.totalSkillPoints;
            state.availableSkillPoints = character.availableSkillPoints;
        }
    }
})

export const selectSkills = state => state.skills;
export default skillSlice.reducer;