import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const About = () => {
  return (
    <>
      <Container>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>What is Notebook App?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              A notebook app is a website where users can log in to add, edit,
              and delete their notes. The notes are saved in their account, and
              they can make changes and view their written notes whenever they
              want.{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Will my notes be visible to everyone?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              No, only you will be able to see your notes. Other users cannot
              view them. You can write your personal notes, and in a way, it
              will be both personal and secure.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>
              Will the website keep my credentials secure?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              The notebook app will provide its users with a secure and safe
              environment where their credentials will be completely secure.
              Ensuring the security of user data is our top priority. The user's
              password and email will be secure and encrypted to provide our
              users with the best possible experience.{" "}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export default About;
