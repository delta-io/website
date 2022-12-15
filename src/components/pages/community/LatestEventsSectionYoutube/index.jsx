import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";

const LatestEventsSectionYoutube = () => {
  const data = useStaticQuery(graphql`
    query {
      allMeetingsYoutube {
        edges {
          node {
            videoId
            title
            publishedAt
            description
            id
            publishTime
          }
        }
      }
    }
  `);

  const listMeetings = data?.allMeetingsYoutube?.edges.map((item) => item.node);

  return (
    <div>
      {listMeetings.map((item) => (
        <div>
          <div>id: {item.id}</div>
          <div>Title: {item.title}</div>
          <div>VideoId: {item.videoId}</div>
          <div>publishedAt: {item.publishedAt}</div>
          <div>publishTime: {item.publishTime}</div>
          <div>description: {item.description}</div>
        </div>
      ))}
    </div>
  );
};

export default LatestEventsSectionYoutube;
