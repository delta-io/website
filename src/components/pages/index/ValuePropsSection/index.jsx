/* eslint-disable react/no-danger */
import * as React from "react";
import Section from "src/components/Section";
import * as theme from "config/theme";
import ValuePropsGrid from "./ValuePropsGrid";

const ValuePropsSection = () => (
  <Section background={theme.colors.primary} centeredHeader padding="xxl">
    <ValuePropsGrid
      features={[
        {
          image: "/images/value_props/open.svg",
          name: "Open",
          description:
            "Community driven, rapidly expanding integration ecosystem",
        },
        {
          image: "/images/value_props/simple.svg",
          name: "Simple",
          description:
            "One format to unify your ETL, Data warehouse, ML in your lakehouse",
        },
        {
          image: "/images/value_props/production.svg",
          name: "Production Ready",
          description:
            "Battle tested in over 10,000+ production environments ​​",
        },
        {
          image: "/images/value_props/agnostic.svg",
          name: "Platform Agnostic",
          description: "Use on any cloud with any engine",
        },
      ]}
    />
  </Section>
);

export default ValuePropsSection;
