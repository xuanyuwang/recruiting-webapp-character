import React, {useState} from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {saveCharacter, loadCharacter} from '../data/data'
import character from "../core/entities/character";
import {useDispatch} from 'react-redux'
import Alert from '@mui/material/Alert';

export default function Save() {
    const dispatch = useDispatch();
    const [info, setInfo] = useState("");
    const [display, setDisplay] = useState(false);
    const alert = <Alert severity="success" onClose={() => {
        setDisplay(false);
    }}>{info}</Alert>
    const saveButton = <Button variant="contained" onClick={() => {
        saveCharacter(character);
        setInfo("Character saved");
        setDisplay(true);
    }}>Save this character</Button>
    const loadButton = <Button variant="contained" onClick={() => {
        const newCharacter = loadCharacter(character);
        Object.values(character.attributes).forEach((attribute) => {
            dispatch({
                type: "attribute/forceSetAttribute",
                payload: {
                    attributeName: attribute.name,
                    attributeValue: newCharacter.attributes[attribute.name].score,
                },
            });
        });
        Object.values(character.skills).forEach((skill) => {
            dispatch({
                type: "skill/forceSetSkillPoint",
                payload: {
                    skillName: skill.name,
                    skillPoint: newCharacter.skills[skill.name].point,
                },
            });
        });
        setInfo("Character loaded");
        setDisplay(true);
    }}>Load this character</Button>
    const resetButton = <Button variant="contained" onClick={() => {
        character.reset();
        Object.values(character.attributes).forEach((attribute) => {
            dispatch({
                type: "attribute/forceSetAttribute",
                payload: {
                    attributeName: attribute.name,
                    attributeValue: character.attributes[attribute.name].score,
                },
            });
        });
        Object.values(character.skills).forEach((skill) => {
            dispatch({
                type: "skill/forceSetSkillPoint",
                payload: {
                    skillName: skill.name,
                    skillPoint: character.skills[skill.name].point,
                },
            });
        });
        setInfo("Character reset");
        setDisplay(true);
    }}>Reset this character</Button>
    return <ButtonGroup variant="contained" aria-label="outlined primary button group">
        {saveButton}
        {loadButton}
        {resetButton}
        {display ? alert : null}
    </ButtonGroup>;
}