import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import YoutubeCardDataList from "src/components/YoutubeCardDataList";
import Section from "src/components/Section";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2.5rem 0;
`;

const LatestEventsSectionYoutube = () => {
  const data = useStaticQuery(graphql`
    query {
      allMeetingsYoutube {
        edges {
          node {
            videoId
            url
            title
            publishedAt
            description
            id
            publishTime
            thumbnails {
              high {
                height
                url
                width
              }
            }
          }
        }
      }
    }
  `);

  const listMeetings = data?.allMeetingsYoutube?.edges.map((item) => item.node);

  const fitData = [
    {
      playlistTitle: "Scheduled broadcasts",
      videoCollection: listMeetings,
    },
  ];

  return (
    <Section>
      <Wrapper>
        <YoutubeCardDataList cards={fitData} />
      </Wrapper>
    </Section>
  );
};

export default LatestEventsSectionYoutube;
