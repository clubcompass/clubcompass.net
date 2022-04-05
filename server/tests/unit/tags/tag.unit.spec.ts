import { expect } from "chai";
import * as tags from "./tagUnitApi";

const tagNames = [
  "volunteering",
  "charity",
  "science",
  "tech",
  "math",
  "engineering",
  "writing",
  "sports",
  "health",
  "politics",
  "music",
  "arts",
  "performing arts",
  "academic competition",
  "tutoring",
  "culture",
  "socializing",
  "debate",
  "business",
  "community",
  "education",
  "public speaking",
  "social activism",
  "games", // this one is a bit special
];

describe("tags", () => {
  describe("getTags", () => {
    it("gets all tags & approved clubs count", async () => {
      const allTags = await tags.getTags();
      expect(allTags.map(({ name }) => name)).to.deep.equal(tagNames);
    });
  });
});
