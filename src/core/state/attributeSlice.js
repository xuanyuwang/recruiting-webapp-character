import { createSlice } from '@reduxjs/toolkit'
import character from '../entities/character'

const initialState = {}
for(const [key, value] of Object.entries(character.attributes)){
    initialState[key] = {
        name: key,
        score: value.score,
        abilityModifier: value.getAbilityModifier()
    }
}

const attributeSlice = createSlice({
  name: 'attribute',
  initialState,
  reducers: {
    changeAttribute: (state, action) => {
      const {attributeName, change} = action.payload;
      if(character.setAttribute(attributeName, state[attributeName].score + change)){
        state[attributeName].score += change;
        state[attributeName].abilityModifier = character.attributes[attributeName].getAbilityModifier();
      }
    },
    forceSetAttribute: (state, action) => {
      const {attributeName, attributeValue} = action.payload;
      character.attributes[attributeName].setScore(attributeValue);
      state[attributeName].score = attributeValue;
      state[attributeName].abilityModifier = character.attributes[attributeName].getAbilityModifier();
    }
  }
})

export const selectAttributes = state => state.attributes;
export default attributeSlice.reducer;