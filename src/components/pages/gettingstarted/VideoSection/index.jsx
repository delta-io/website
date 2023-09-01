import * as React from "react";
import Grid from "src/components/Grid";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import img1 from "src/images/getting-started/tb_making-apache-spark-better-with-delta-lake.png";
import img2 from "src/images/getting-started/tb_Simplify-and-Scale-Data-Engineering-Pipelines-with-Delta-Lake.jpg";
import img3 from "src/images/getting-started/tb_Beyond-Lambda-Introducing-Delta-Architecture.jpeg";
import img4 from "src/images/getting-started/tb_Getting-Data-Ready-for-Data-Science-with-Delta-Lake.jpeg";
import img5 from "src/images/getting-started/tb_The-Genesis-of-Delta-Lake--An-Interview-with-Burak-Yavuz.jpeg";

const VideoSection = () => (
  <Section
    title="Getting Started with Delta Lake Videos"
    subtitle={
      <Typography variant="p">
        Check out these videos to learn more about how to use Delta Lake
        <br />
      </Typography>
    }
    background="#cdd9f4"
    centeredHeader
    padding="xl"
  >
    <Grid columns={{ md: 5 }} gutter="xl">
      <Typography variant="p2">
        <Link href="https://youtu.be/LJtShrQqYZY" muted>
          <img src={img1} alt="" width="200" />
          Making Apache Spark™ Better with Delta Lake
        </Link>
      </Typography>
      <Typography variant="p2">
        <Link href="https://youtube.com/live/qtCxNSmTejk" muted>
          <img src={img2} alt="" width="200" />
          Simplify and Scale Data Engineering Pipelines with Delta Lake
        </Link>
      </Typography>
      <Typography variant="p2">
        <Link href="https://youtube.com/live/FePv0lro0z8" muted>
          <img src={img3} alt="" width="200" />
          Beyond Lambda: Introducing Delta Architecture
        </Link>
      </Typography>
      <Typography variant="p2">
        <Link href="https://youtube.com/live/hQaENo78za0" muted>
          <img src={img4} alt="" width="200" />
          Getting Data Ready for Data Science with Delta Lake
        </Link>
      </Typography>
      <Typography variant="p2">
        <Link href="https://youtube.com/live/F-5t3QCI96g" muted>
          <img src={img5} alt="" width="200" />
          The Genesis of Delta Lake - An Interview with Burak Yavuz
        </Link>
      </Typography>
    </Grid>
  </Section>
);

export default VideoSection;
