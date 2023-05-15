import { Character } from "../core/entities/character";

function saveCharacter(character) {
  localStorage.setItem("character", character.serialize());
}

function loadCharacter() {
  const characterJson = localStorage.getItem("character");
  return Character.deserialize(characterJson);
}

export { saveCharacter, loadCharacter };