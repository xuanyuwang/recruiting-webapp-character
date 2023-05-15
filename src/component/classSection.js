import React from "react";
import { useSelector } from "react-redux";
import { selectAttributes } from "../core/state/attributeSlice";
import Classes from "../core/entities/class";
import Class from "./class";
import Typography from '@mui/material/Typography';

export default function ClassSection() {
  const attributes = useSelector(selectAttributes);
  return (
    <div>
      <Typography variant="h3">Classes</Typography>
      {Object.values(Classes).map((e) => {
        return (
          <Class
            key={e.name}
            className={e.name}
            meetRequirement={e.validateRequirements(attributes)}
            requirements={e.requirements}
          />
        );
      })}
    </div>
  );
}
