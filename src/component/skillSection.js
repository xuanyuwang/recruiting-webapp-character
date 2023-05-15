import React from "react";
import {useSelector} from "react-redux";
import { selectSkills } from "../core/state/skillSlice";
import Skill from "./skill";
import List from "@mui/material/List";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export default function SkillSection(){
    const skills = useSelector(selectSkills);
    return (
        <Box>
            <Typography variant="h3">Skills</Typography>
            <Typography variant="h4">
                Total skill points available: {skills.availableSkillPoints}
                </Typography>
        <List>
            {Object.values(skills.skills).map((value) => {
                return (
                    <Skill
                        key={value.name}
                        skillName={value.name}
                        skillPoint={value.point}
                        skillModifier={value.modifier}
                        skillModifierValue={value.modifierValue}
                        skillTotal={value.total}
                    />
                );
            })}
        </List>
        </Box>
    );
}