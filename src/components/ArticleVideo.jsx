import React, { useState } from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import { media } from "config/theme";

const MainTitle = styled.h2`
  font-size: 42px;
  line-height: 45px;
  letter-spacing: 0.5px;
  text-align: center;
  margin-bottom: 30px;
  font-family: ${(props) => props.theme.fontFamilyBase};
  font-weight: ${(props) => props.theme.fontWeightBold} !important;

  @media ${media.xl} {
    margin-bottom: 45px;
  }
`;

const ArticleVideoWrap = styled.div`
  font-family: ${(props) => props.theme.fontFamilyBase};
  display: flex;
  flex-direction: column;

  @media ${media.xl} {
    flex-direction: row;
  }
`;
const ArticleWrap = styled.div`
  width: 100%;
  margin-right: 40px;
  order: 2;

  @media ${media.xl} {
    order: 1;
    width: 40%;
  }
`;
const ArticleUnderWrap = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const ArticleTitle = styled.h3`
  font-size: 28px;
  line-height: 25px;
  text-align: left;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const ArticleSubTitle = styled.h4`
  font-size: 18px;
  margin-bottom: 15px;
  font-weight: ${(props) => props.theme.fontWeightBold};
`;

const ArticleTextWrap = styled.div``;

const ArticleText = styled.p`
  font-size: 18px;
  line-height: 27px;
  margin-bottom: 10px;
`;

const ArticleTextOverflow = styled(ArticleTextWrap)`
  overflow: ${(props) => (props.isReadMore ? "visible" : "hidden")};
  position: relative;

  @media ${media.xl} {
    height: ${(props) => (props.isReadMore ? "auto" : "255px")};
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background: transparent linear-gradient(180deg, #ffffff00 0%, #f3fdff 100%)
      0 0 no-repeat padding-box;
    display: ${(props) => (props.isReadMore ? "none" : "block")};
  }
`;

const ArticleLink = styled.a`
  text-decoration: underline;
  color: ${(props) => props.theme.colors.link};

  &:hover {
    color: ${(props) => props.theme.colors.link};
  }
`;

const VideoWrap = styled.div`
  cursor: pointer;
  max-width: 645px;
  width: 100%;
  max-height: 360px;
  position: relative;
  order: 1;
  margin: 0 auto 40px;
  aspect-ratio: 16/9;

  @media ${media.xl} {
    margin: 0;
    width: 60%;
    order: 2;
  }

  iframe {
    height: 100%;
    width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
const VideoThumbnail = styled.img`
  width: 100%;
`;

const ReadMoreBtn = styled.button`
  background: transparent;
  border: none;
  outline: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 18px;
  padding: 20px 0 0;
  font-weight: 600;
  transition: 0.3s ease-in-out;

  svg {
    margin-left: 5px;
  }

  &:hover {
    color: ${(props) => props.theme.colors.link};

    path {
      fill: ${(props) => props.theme.colors.link};
    }
  }
`;

const ArticleVideo = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isReadMore, setIsReadMore] = useState(false);

  const turnOnVideo = () => {
    setIsVideoLoaded(true);
  };

  const handleReadText = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <Section padding="xxl" background={(theme) => theme.colors.bgLightSecond}>
      <MainTitle>Integrating a Data Warehouse and a Data Lake</MainTitle>
      <ArticleVideoWrap>
        <ArticleWrap>
          <ArticleTitle>FLORIAN VALEYE</ArticleTitle>
          <ArticleSubTitle>STAFF DATA ENGINEER BACK MARKET</ArticleSubTitle>
          <ArticleTextOverflow isReadMore={isReadMore}>
            <ArticleText>
              This conversation from the Open Source Summit in Spain provides
              valuable insights into the significance of Delta Lake, the role of
              Rust in data engineering, and the collaborative nature of open
              source communities.
            </ArticleText>
            <ArticleText>
              The{" "}
              <ArticleLink
                href="https://thenewstack.io/delta-lake-a-layer-to-ensure-data-quality/"
                target="_blank"
              >
                {" "}
                Delta Lake
              </ArticleLink>{" "}
              open source project integrates{" "}
              <ArticleLink
                href="https://thenewstack.io/boost-devops-maturity-with-a-data-lakehouse/"
                target="_blank"
              >
                data lakes
              </ArticleLink>{" "}
              and data warehouses, a needed combination in this new age of
              scale-out data requiring reliability and controls.
            </ArticleText>

            <ArticleText>
              A data lakehouse integrates the advanced data analytics and
              low-cost storage of a data lake with the performance and
              reliability of a data warehouse, said{" "}
              <ArticleLink
                href="https://www.linkedin.com/in/florianvaleye/?locale=en_US"
                target="_blank"
              >
                Florian Valeye
              </ArticleLink>
              , a data engineer with Back Market, in this episode of The New
              Stack Makers, recorded at the Open Source Summit in Bilbao, Spain,
              earlier this fall.
            </ArticleText>
          </ArticleTextOverflow>
          {!isReadMore && (
            <ReadMoreBtn onClick={handleReadText}>
              Read More
              <svg
                width="16"
                height="13"
                viewBox="0 0 16 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.9467 6.08658C11.9149 6.02228 11.8674 5.96354 11.8067 5.91372L8.47333 3.29467C8.41117 3.24583 8.33738 3.20709 8.25617 3.18066C8.17495 3.15423 8.08791 3.14062 8 3.14062C7.82247 3.14062 7.6522 3.19604 7.52667 3.29467C7.46451 3.34351 7.4152 3.40149 7.38156 3.4653C7.34792 3.52912 7.33061 3.59751 7.33061 3.66658C7.33061 3.80607 7.40113 3.93985 7.52667 4.03848L9.72667 5.76182H4.66667C4.48986 5.76182 4.32029 5.817 4.19526 5.91524C4.07024 6.01347 4 6.1467 4 6.28563C4 6.42455 4.07024 6.55778 4.19526 6.65601C4.32029 6.75425 4.48986 6.80943 4.66667 6.80943H9.72667L7.52667 8.53277C7.46418 8.58146 7.41459 8.6394 7.38074 8.70323C7.34689 8.76706 7.32947 8.83552 7.32947 8.90467C7.32947 8.97382 7.34689 9.04229 7.38074 9.10612C7.41459 9.16995 7.46418 9.22788 7.52667 9.27658C7.58864 9.32567 7.66238 9.36464 7.74362 9.39123C7.82486 9.41783 7.91199 9.43152 8 9.43152C8.08801 9.43152 8.17515 9.41783 8.25638 9.39123C8.33762 9.36464 8.41136 9.32567 8.47333 9.27658L11.8067 6.65753C11.8674 6.60771 11.9149 6.54897 11.9467 6.48467C12.0133 6.35715 12.0133 6.2141 11.9467 6.08658Z"
                  fill="#00ADD4"
                />
              </svg>
            </ReadMoreBtn>
          )}
        </ArticleWrap>
        <VideoWrap onClick={turnOnVideo}>
          {isVideoLoaded ? (
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/kYBpEZ2nQjA?autoplay=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <svg
                width="69"
                height="49"
                viewBox="0 0 69 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_111_224625)">
                  <path
                    d="M66.5962 8.71998C65.8162 5.78998 64.1062 3.30998 61.1762 2.52998C55.8662 1.10998 34.0762 0.97998 34.0762 0.97998C34.0762 0.97998 12.2862 1.10998 6.97617 2.52998C4.04617 3.30998 2.34617 5.78998 1.55617 8.71998C0.136172 14.03 0.0761719 24.98 0.0761719 24.98C0.0761719 24.98 0.136172 35.93 1.55617 41.24C2.33617 44.17 4.04617 46.65 6.97617 47.43C12.2862 48.85 34.0762 48.98 34.0762 48.98C34.0762 48.98 55.8662 48.85 61.1762 47.43C64.1062 46.65 65.8162 44.17 66.5962 41.24C68.0162 35.93 68.0762 24.98 68.0762 24.98C68.0762 24.98 68.0162 14.03 66.5962 8.71998Z"
                    fill="#FF0000"
                  />
                  <path d="M45.0762 24.98L27.0762 14.98V34.98" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_111_224625">
                    <rect
                      width="68"
                      height="48"
                      fill="white"
                      transform="translate(0.0761719 0.97998)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <VideoThumbnail src="https://img.youtube.com/vi/kYBpEZ2nQjA/maxresdefault.jpg" />
            </>
          )}
        </VideoWrap>
      </ArticleVideoWrap>
      {isReadMore && (
        <ArticleUnderWrap>
          <ArticleTextWrap>
            <ArticleText>
              The data warehouse is an approach that emerged over the past two
              decades. It consists of structured data models that allow for
              better performance. The datasets are small and constrained, Valeye
              said. In contrast, the data lake consists of unstructured{" "}
              <ArticleLink
                href="https://thenewstack.io/best-practices-collect-and-query-data-from-multiple-sources/"
                target="_blank"
              >
                data from multiple sources{" "}
              </ArticleLink>{" "}
              . The volume size of data lakes reaches petabytes or even
              exabytes.
            </ArticleText>
            <ArticleText>
              Delta Lake, created by{" "}
              <ArticleLink
                href="https://thenewstack.io/building-a-lakehouse-with-databricks-and-machine-learning/"
                target="_blank"
              >
                Databricks
              </ArticleLink>
              , breaks down the barriers between data warehouses and data lakes
              by providing more performance and features in the data lake,
              Valeye said.
            </ArticleText>
            <ArticleText>
              ACID transactions are a staple of a data warehouse, Valeye said.
              When thinking about the relational database or a data warehouse, a
              focus is put on{" "}
              <ArticleLink
                href="https://thenewstack.io/7-data-modeling-best-practices/"
                target="_blank"
              >
                model representations and the data
              </ArticleLink>{" "}
              structure. A data lake is an open way to push data and add a
              schema. Data lakes magnify data. Through the “wall breaking,” the
              lake house provides ACID transactions, Read, Process, Interpret
              (RPI) ingestions, and metadata scalability. The strength comes
              with a way to attain knowledge for any usage without a barrier
              between the data analyst side of the house and the data
              engineering and data scientist teams.
            </ArticleText>
            <ArticleText>
              Databricks is now working on providing ways for anyone to
              contribute their connectors through Delta Lake, allowing gateways
              that can be used with, for example, different databases.
            </ArticleText>
            <ArticleText>
              “And that’s why it’s really nice when you are working on a
              specific cloud provider; you don’t want to be bundled, locked
              inside it,” Valerie said. “So that’s why having this kind of
              standard format, you can switch and move from one to another, and
              don’t feel stuck with one provider and one format.”
            </ArticleText>
            <ArticleText>
              Valeye said Back Market sells refurbished devices. To determine
              device quality, the company developed an algorithm to determine
              whether a device is viable for sale. Back Market uses Delta Lake
              to ingest data from APIs and other data sources.
            </ArticleText>
            <ArticleText>
              Delta Lake is a platform to connect data scientists and data
              engineers, said Valeye, who previously worked as a data engineer.
              Before using Delta Lake, deploying models could be complicated due
              to the complexities of the different tools and programming
              languages used. The Delta Lake infrastructure closes the gaps. It
              allows everyone to work on the same infrastructure.
            </ArticleText>
          </ArticleTextWrap>

          {isReadMore && (
            <ReadMoreBtn onClick={handleReadText}>
              Less
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.77794 4.99371C7.69636 5.02608 7.62196 5.07423 7.55903 5.13542L4.25167 8.49452C4.19 8.55716 4.14126 8.63133 4.10825 8.7128C4.07525 8.79428 4.05861 8.88145 4.05929 8.96936C4.06067 9.14689 4.13251 9.3166 4.25902 9.44116C4.32166 9.50283 4.39583 9.55156 4.4773 9.58457C4.55878 9.61758 4.64595 9.63422 4.73386 9.63354C4.91139 9.63216 5.0811 9.56032 5.20566 9.43381L7.38185 7.21685L7.42112 12.2767C7.42249 12.4535 7.49404 12.6225 7.62003 12.7466C7.74602 12.8706 7.91613 12.9395 8.09294 12.9382C8.26974 12.9368 8.43876 12.8652 8.56281 12.7393C8.68686 12.6133 8.75578 12.4432 8.75441 12.2664L8.71514 7.20651L10.9255 9.38942C10.9879 9.45142 11.0621 9.50044 11.1436 9.53366C11.2251 9.56687 11.3123 9.58362 11.4003 9.58294C11.4883 9.58225 11.5753 9.56415 11.6563 9.52968C11.7373 9.4952 11.8106 9.44503 11.8721 9.38207C11.9341 9.31961 11.9831 9.2455 12.0164 9.164C12.0496 9.0825 12.0663 8.99523 12.0656 8.90722C12.065 8.81922 12.0469 8.73222 12.0124 8.65124C11.9779 8.57027 11.9277 8.49692 11.8648 8.43543L8.50567 5.12807C8.4418 5.06787 8.36667 5.02087 8.28459 4.98978C8.12177 4.92436 7.93973 4.92578 7.77794 4.99371Z"
                  fill="#00ADD4"
                />
              </svg>
            </ReadMoreBtn>
          )}
        </ArticleUnderWrap>
      )}
    </Section>
  );
};

export default ArticleVideo;
