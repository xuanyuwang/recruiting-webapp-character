import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useSelector } from "react-redux";
import { selectSkills } from "../core/state/skillSlice";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Typography from '@mui/material/Typography';

export default function SkillCheck() {
  const skills = useSelector(selectSkills);
  const [skill, setSkill] = React.useState("");
  const [dc, setDc] = React.useState("");
  const [rolled, setRolled] = React.useState(false);
  const [randomNumber, setRandomNumber] = React.useState(0);
  const handleSkillChange = (event) => {
    setSkill(event.target.value);
  };
  const handleDcChange = (event) => {
    setDc(event.target.value);
  };
  return (
    <Box sx={{ minWidth: 20 }} className="skillCheck">
      <InputLabel>Skill</InputLabel>
      <Select value={skill} label="Skill" onChange={handleSkillChange}>
        {Object.values(skills.skills).map((value) => {
          return (
            <MenuItem key={value.name} value={value.name}>
              {value.name}
            </MenuItem>
          );
        })}
      </Select>
      <TextField
        label="DC"
        variant="outlined"
        value={dc}
        onChange={handleDcChange}
      />
      <Button
        color="error"
        onClick={() => {
          setRolled(true);
          setRandomNumber(Math.floor(Math.random() * 20) + 1);
        }}
      >
        Roll
      </Button>
      {rolled && <Dialog onClose={() => setRolled(false)} open={rolled} >
      <DialogTitle>Skill check result</DialogTitle>
        <Typography>Skill: {skill} {skills.skills[skill].point }</Typography>
        <Typography>You rolled: {randomNumber}</Typography>
        <Typography>DC: {dc}</Typography>
        <Typography>Result: {skills.skills[skill].point + randomNumber >= dc ? "success": "failure" }</Typography>
        </Dialog>}
    </Box>
  );
}
