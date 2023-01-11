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
            publishTime
            thumbnail {
              high {
                height
                url
                width
              }
            }
            videoId
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
              videoUploadDate
              playlistId
              title
              url
              description
              id
              thumbnail {
                high {
                  height
                  url
                  width
                }
              }
              videoId
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
    (a, b) => Date.parse(b.videoUploadDate) - Date.parse(a.videoUploadDate)
  );

  const lastVideos = sortedListOfVideosByPublishedDate.slice(0, 4);

  const emptyMeet = listMeetings[0].url === "";
  const collection = emptyMeet ? lastVideos : [...listMeetings, ...lastVideos];

  // Delete scheduled videos duplicated in the playlist
  const withoutDuplication = collection.filter(
    (obj, i) =>
      collection.findIndex((item) => item.videoId === obj.videoId) === i
  );

  const fitData = [
    {
      id: "communityId",
      playlistTitle: "",
      videoCollection: withoutDuplication,
    },
  ];

  return (
    <Section title="Scheduled and Latest Videos" centeredHeader padding="xl">
      <Wrapper>
        <YoutubeCardDataList cards={fitData} />
      </Wrapper>
    </Section>
  );
};

export default LatestEventsSectionYoutube;
