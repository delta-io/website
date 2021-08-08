import * as React from "react";
import styled from "styled-components";
import Section from "src/components/Section";
import { string } from "prop-types";
import Typography, { TypographyContainer } from "src/components/Typography";
import Link from "src/components/Link";

const AnnouncementSectionRoot = styled(Section)`
  background-color: ${(props) => props.theme.colors.accent};
  text-align: center;

  a {
    color: #000;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const AnnouncementSection = (props) => {
  const { title, description, url } = props;

  return (
    <AnnouncementSectionRoot padding="sm">
      <TypographyContainer>
        <Typography variant="p">
          <Link href={url}>
            <strong>{title}:</strong> {description} ›
          </Link>
        </Typography>
      </TypographyContainer>
    </AnnouncementSectionRoot>
  );
};

AnnouncementSection.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  url: string.isRequired,
};

export default AnnouncementSection;
