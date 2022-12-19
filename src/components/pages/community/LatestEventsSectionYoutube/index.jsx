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
            url
            title
            publishedAt
            description
            id
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
      allVideosYoutube {
        edges {
          node {
            playlistId
            playlistTitle
            videoCollection {
              publishedAt
              playlistId
              title
              url
              description
              id
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
    }
  `);

  const listMeetings = data?.allMeetingsYoutube?.edges.map((item) => item.node);
  const listVideos = data?.allVideosYoutube?.edges
    .map((item) => item.node)
    .map((item) => item.videoCollection)
    .flat();

  const sortedListOfVideosByPublishedDate = [...listVideos].sort(
    (a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)
  );

  const lastVideos = sortedListOfVideosByPublishedDate.slice(0, 4);

  const fitData = [
    {
      id: "communityId",
      playlistTitle: "",
      videoCollection: [...listMeetings, ...lastVideos],
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
