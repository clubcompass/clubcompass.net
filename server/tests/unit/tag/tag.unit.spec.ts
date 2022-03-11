import { expect } from "chai";
import { tag } from "./tagUnitApi";

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
];

describe("tags", () => {
  describe("findManyTags(...data", () => {
    it("fetches all tags", async () => {
      const tags = await tag.findManyTags();

      for (let i = 0; i < tags.length; i++) {
        expect(tags[i].name).equal(tagNames[i]);
      }
    });
  });
});
