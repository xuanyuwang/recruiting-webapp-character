import React from "react";
import { useSelector } from "react-redux";
import { selectAttributes } from "../core/state/attributeSlice";
import Attribute from "./attribute";
import Typography from '@mui/material/Typography';

export default function AttributeSection() {
  const attributes = useSelector(selectAttributes);
  return (
    <div>
      <Typography variant="h3">Attributes</Typography>
      {Object.values(attributes).map((value) => {
        return (
          <Attribute
            key={value.name}
            attributeName={value.name}
            attributeValue={value.score}
            attributeModifier={value.abilityModifier}
          />
        );
      })}
    </div>
  );
}
