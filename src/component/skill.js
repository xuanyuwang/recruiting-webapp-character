import React from "react";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import { useDispatch } from "react-redux";

export default function Skill({
    skillName,
    skillPoint,
    skillModifier,
    skillModifierValue,
    skillTotal,
}) {
    const dispatch = useDispatch();
    const plusButton =
        <Button variant="contained"
        onClick={() => {
            const action = {
                type: "skill/changeSkillPoint",
                payload: {
                    skillName: skillName,
                    change: 1,
                },
            };
            dispatch(action);
        }}>+</Button>;
    const minusButton = 
        <Button variant="contained"
        onClick={() => {
            const action = {
                type: "skill/changeSkillPoint",
                payload: {
                    skillName: skillName,
                    change: -1,
                },
            };
            dispatch(action);
        }}>-</Button>;
    return (
            <ListItem>
                {skillName}: {skillPoint} (Modifier: {skillModifier}: {skillModifierValue}) {plusButton} {minusButton} Total: {skillTotal}
            </ListItem>
    )
}