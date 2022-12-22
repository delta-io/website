import * as React from "react";
import Link from "src/components/Link";
import Section from "src/components/Section";
import Typography from "src/components/Typography";
import styled from "styled-components";
import profileImg from "./florian-valeye.jpeg";

const Wrapper = styled.div`
  padding: xxxl;
  padding-left: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
  width: 75%;
  background-color: hsl(191, 100%, 97.7%);
`;

const profileMaintainer = () => (
  <Section background="white" centerHeader padding="xl">
    <br />
    <h1>
      <center>Contributor of the Month</center>
    </h1>

    <Link href="/profiles/florian-valeye" muted>
      <table border="0" align="center" cellPadding="20" cellSpacing="10">
        <tr>
          <td>
            <img src={profileImg} alt="" width="200" />
          </td>
          <td valign="top">
            <br />
            <Typography variant="p">
              <h2>Florian Valeye</h2>
              <h4>Delta Lake Maintainer, Staff Data Engineer at Back Market</h4>
              <Wrapper>
                <em>
                  &#34;Contributing to open source is key to learning how to
                  solve problems within worldwide, benevolent communities of
                  people.&#34;
                </em>
                <br />
                <br />
                Source: &nbsp;
                <Link href="https://project.linuxfoundation.org/hubfs/LF%20Research/2022%20Linux%20Foundation%20Annual%20Report.pdf?hsLang=en">
                  Linux Foundation 2022 Annual Report
                </Link>
              </Wrapper>
            </Typography>
          </td>
        </tr>
      </table>
    </Link>
  </Section>
);

export default profileMaintainer;
