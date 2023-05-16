import * as React from "react";
import { string } from "prop-types";
import Link from "src/components/Link";

export const AUTHORS = {
  "Denny Lee": {
    profile: "https://www.linkedin.com/in/dennyglee/",
    avatar:
      "https://media.licdn.com/dms/image/C5603AQEIXKhYeXS1rw/profile-displayphoto-shrink_800_800/0/1595098409818?e=1686182400&v=beta&t=FF04NlEG-Bb3XnXNvqNTkK0xGkYGdIiJv7K2dTy8C90",
  },
  "Matthew Powers": {
    profile: "https://www.linkedin.com/in/matthew-powers-cfa-6246525/",
    avatar:
      "https://media.licdn.com/dms/image/C4E03AQHL3oztZlTr2w/profile-displayphoto-shrink_800_800/0/1517751980919?e=1686182400&v=beta&t=Ll4LkUNnOBiOYCePKQsch4_4iAwx5NCVkq7FzXMdP4M",
  },

  "Nick Karpov": {
    profile: "https://www.linkedin.com/in/nick-karpov/",
    avatar:
      "https://media.licdn.com/dms/image/D5603AQGslor_PjWPhQ/profile-displayphoto-shrink_800_800/0/1671233970358?e=1686182400&v=beta&t=akPDf_QIr-eKzVY8ugWf7clk7AbDv3r4GfP7J_KPOyQ",
  },
  "Jim Hibbard": {
    profile: "https://www.linkedin.com/in/jhibbard/",
    avatar:
      "https://media.licdn.com/dms/image/C5603AQGO55Pt1TGrAQ/profile-displayphoto-shrink_800_800/0/1654209308894?e=1686182400&v=beta&t=-ESvxupI1ClkV9X9lkQGdLcOUXNi5eN2OIde0qRp--Q",
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
