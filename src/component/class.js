import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export default function Class({ className, meetRequirement, requirements }) {
  return (
    <Accordion>
      <AccordionSummary>
        {className} {meetRequirement ? "√" : "x"}
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {Object.entries(requirements).map(
            ([attributeName, attributeRequirement]) => {
              return (
                <ListItem key={attributeName}>
                  {attributeName}: {attributeRequirement}
                </ListItem>
              );
            }
          )}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}
