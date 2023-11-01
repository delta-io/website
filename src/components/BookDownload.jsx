import React from "react";
import Section from "src/components/Section";
import styled from "styled-components";
import bookDownload from "src/images/bookDownload.png";
import downloadArrow from "src/images/downloadArrow.png";
import { breakpoints } from "config/theme";

const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = `(min-width: ${breakpoints[label] / 16}em)`;
  return acc;
}, {});

const BookDownloadWrap = styled.div`
  background: ${(props) => props.theme.colors.bgDarkBlue};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.dark.color};
  padding: 48px 30px;
  border-radius: 5px;
  flex-direction: column;
  margin-top: 40px;

  @media ${media.md} {
    flex-direction: row;
  }
`;

const BookImgItem = styled.div`
  max-width: 175px;
  width: 100%;
  margin-bottom: 38px;

  @media ${media.md} {
    flex-basis: 50%;
    margin-right: 70px;
    margin-bottom: 0;
  }

  img {
    width: 100%;
  }
`;

const TextItem = styled.div`
  text-align: center;

  @media ${media.md} {
    text-align: left;
    flex-basis: 50%;
  }
`;

const DownloadTitle = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 16px;
  line-height: 30px;

  @media ${media.md} {
    font-size: 35px;
    line-height: 41px;
  }

  br {
    @media ${media.md} {
      display: none;
    }
  }
`;

const DownloadSubTitle = styled.p`
  font-size: 20px;
  opacity: 0.8;
  margin-bottom: 30px;
  line-height: 24px;

  @media ${media.md} {
    font-size: 23px;
    line-height: 27px;
  }
`;

const ButtonDownload = styled.a`
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 155px;
  width: 100%;
  padding: 5px 14px;
  border-radius: 2px;
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.dark.color};
  text-decoration: none;
  margin: 0 auto;

  &:hover {
    text-decoration: none;
    background-color: hsl(191, 100%, 45.7%);
    color: ${(props) => props.theme.dark.color};
  }

  @media ${media.md} {
    margin: 0;
  }

  img {
    margin-left: 15px;
    width: 24px;
    height: 24px;
  }
`;

const BookDownload = () => (
  <Section background={(theme) => theme.light.bg}>
    <BookDownloadWrap>
      <BookImgItem>
        <img src={bookDownload} alt="The Definitive Guide" />
      </BookImgItem>
      <TextItem>
        <DownloadTitle>
          Delta Lake:
          <br /> The Definitive Guide
        </DownloadTitle>

        <DownloadSubTitle>
          Early Release (Raw & Unedited) sponsored by Databricks
        </DownloadSubTitle>

        <ButtonDownload download href="/pdfs/gide-book.pdf">
          Download
          <img src={downloadArrow} alt="Download button" />
        </ButtonDownload>
      </TextItem>
    </BookDownloadWrap>
  </Section>
);

export default BookDownload;
