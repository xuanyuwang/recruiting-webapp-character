import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

export default function Attribute({
  attributeName,
  attributeValue,
  attributeModifier,
}) {
  const dispatch = useDispatch();
  return (
    <div>
      <h3>
        {attributeName}: {attributeValue} (Modifier: {attributeModifier})
        <Button
          variant="contained"
          onClick={() => {
            const action = {
              type: "attribute/changeAttribute",
              payload: {
                attributeName: attributeName,
                change: 1,
              },
            };
            dispatch(action);

            dispatch({
              type: "skill/updateSkills",
              payload: {
                attributeName: attributeName,
              }
            })
          }}
        >
          +
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const action = {
              type: "attribute/changeAttribute",
              payload: {
                attributeName: attributeName,
                change: -1,
              },
            };
            dispatch(action);

            dispatch({
              type: "skill/updateSkills",
              payload: {
                attributeName: attributeName,
              }
            });
          }}
        >
          -
        </Button>
      </h3>
    </div>
  );
}
