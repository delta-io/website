import * as React from "react";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import spotifyImg from "./d3l2-podcast-spotify.png";

const D3L2podcastSection = () => (
  <Section background="white" centerHeader padding="xl">
    <table border="0" align="center" cellPadding="20" cellSpacing="10">
      <tr>
        <td>
          <Link
            href="https://open.spotify.com/show/6YvPDkILtWfnJNTzJ9HsmW?si=282ba8186896469a"
            muted
          >
            <img src={spotifyImg} alt="" width="200" />
          </Link>
        </td>
        <td valign="top">
          <br />
          <Typography variant="h4">
            <Link
              href="https://open.spotify.com/show/6YvPDkILtWfnJNTzJ9HsmW?si=282ba8186896469a"
              muted
            >
              Delta Lake Discussions with Denny Lee Podcast
            </Link>
          </Typography>
          <Typography variant="p">
            Listen to your favorite Delta Lake discussions with the D3L2 podcast
            on Spotify.
          </Typography>
        </td>
      </tr>
    </table>
  </Section>
);

export default D3L2podcastSection;
