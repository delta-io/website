import * as React from "react";
import { string } from "prop-types";
import Link from "src/components/Link";
import DENNY_LEE_IMG from "src/images/authors/denny_lee.jpg";
import JIM_HIBBARD_IMG from "src/images/authors/jim_hibbard.jpg";
import MATTHEW_PAWERS_IMG from "src/images/authors/matthew_pawers.jpg";
import NICK_KARPOV_IMG from "src/images/authors/nick_karpov.jpg";
import WILL_GIRTEN_IMG from "src/images/authors/will_girten.jpg";
import DAN_LIDEN_IMG from "src/images/authors/dan_liden.jpg";
import MICHAEL_SHTELMA_IMG from "src/images/authors/michael_shtelma.jpg";

export const AUTHORS = {
  "Denny Lee": {
    profile: "https://www.linkedin.com/in/dennyglee/",
    avatar: DENNY_LEE_IMG,
  },
  "Matthew Powers": {
    profile: "https://www.linkedin.com/in/matthew-powers-cfa-6246525/",
    avatar: MATTHEW_PAWERS_IMG,
  },
  "Nick Karpov": {
    profile: "https://www.linkedin.com/in/nick-karpov/",
    avatar: NICK_KARPOV_IMG,
  },
  "Jim Hibbard": {
    profile: "https://www.linkedin.com/in/jhibbard/",
    avatar: JIM_HIBBARD_IMG,
  },
  "Will Girten": {
    profile: "https://www.linkedin.com/in/willgirten/",
    avatar: WILL_GIRTEN_IMG,
  },
  "Daniel Liden": {
    profile: "https://www.linkedin.com/in/danielliden/",
    avatar: DAN_LIDEN_IMG,
  },
  "Michael Shtelma": {
    profile: "https://www.linkedin.com/in/mshtelma/",
    avatar: MICHAEL_SHTELMA_IMG,
  },
  "Martin Bode": {
    profile: "https://www.linkedin.com/in/martin-bode/",
  },
};

const BlogAuthorsName = ({ name }) => {
  const splitNameArr = name.split(",");

  const lastElement = splitNameArr.length - 1;

  return splitNameArr.map((person, i) =>
    AUTHORS[person.trim()]?.profile ? (
      <>
        <Link
          href={AUTHORS[person.trim()]?.profile}
          target="_blank"
          rel="noreferrer"
        >
          {person}
        </Link>
        {lastElement !== i ? <span>, </span> : ""}
      </>
    ) : (
      <>
        <span>{person}</span>
        {lastElement !== i ? <span>, </span> : ""}
      </>
    )
  );
};

BlogAuthorsName.prototype = {
  name: string,
};

export default BlogAuthorsName;
