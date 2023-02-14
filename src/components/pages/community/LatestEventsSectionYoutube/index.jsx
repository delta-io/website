import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import YoutubeCardDataList from "src/components/YoutubeCardDataList";
import Section from "src/components/Section";

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

  const lastVideos = sortedListOfVideosByPublishedDate.slice(
    0,
    4 + listMeetings.length
  );

  const emptyMeet = listMeetings[0].url === "";
  const collection = emptyMeet ? lastVideos : [...listMeetings, ...lastVideos];

  const getUniqueVideos = [
    ...new Map(collection.map((item) => [item.videoId, item])).values(),
  ];

  const fitData = [
    {
      id: "communityId",
      playlistTitle: "",
      videoCollection: getUniqueVideos,
    },
  ];

  return (
    <Section title="Scheduled and Latest Videos" centeredHeader padding="xl">
      <YoutubeCardDataList cards={fitData} />
    </Section>
  );
};

export default LatestEventsSectionYoutube;
