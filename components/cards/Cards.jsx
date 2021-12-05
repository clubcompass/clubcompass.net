import React from "react";
import { Card, CardContainer } from ".";
export const Cards = () => {
  const mockData = [
    {
      name: "Engineering",
      description:
        "To identify a real-world problem and develop a solution to it. Equips students to become tech entrepreneurs and leaders.",
      primaryTag: "stem",
      tags: ["math", "tech", "stem"],
    },
    {
      name: "Underwater basket weaving",
      description:
        "Learn and understand the ecosystem of underwater basket weaving.",
      primaryTag: "team",
      tags: ["team", "work"],
    },
    {
      name: "Algorithmic Programming and Problem Solving Club",
      description:
        "Write complex algorithms and solve real world problems with the power of computer science.",
      primaryTag: "cs",
      tags: ["cs", "math", "tech", "stem"],
    },
  ];
  return (
    <CardContainer>
      {mockData.map((card, index) => (
        <Card key={index} {...card} />
      ))}
    </CardContainer>
  );
};
