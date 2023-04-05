import * as React from "react";
import { string } from "prop-types";
import styled from "styled-components";
import Link from "src/components/Link";
import { AUTHORS } from "src/components/BlogAuthorsName";

const Title = styled.h5`
  display: flex;
  align-items: baseline;
`;

const CTA = styled.span`
  font-size: 1rem;
  font-weight: 700;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0.6rem 0 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 0.8rem;
  text-align: center;
`;

const CallToActions = ({ authors }) => {
  const authorsArr = authors.split(",");

  return (
    <div>
      <Title>
        <CTA>Follow our authors on</CTA>
        <a href="https://www.linkedin.com/">
          <img
            src="https://www.vectorlogo.zone/logos/linkedin/linkedin-ar21.svg"
            alt="LinkedIn"
            height="40"
            width="80"
          />
        </a>
      </Title>
      <List>
        {authorsArr.map(
          (person) =>
            AUTHORS[person.trim()] && (
              <li key={person}>
                <Link
                  href={AUTHORS[person.trim()]?.profile}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Avatar src={AUTHORS[person.trim()]?.avatar} alt={person} />
                  <div>{person}</div>
                </Link>
              </li>
            )
        )}
      </List>
    </div>
  );
};

CallToActions.defaultProps = {
  authors: "",
};

CallToActions.propTypes = {
  authors: string,
};

export default CallToActions;
