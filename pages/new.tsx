import { useMemo } from "react";
import { useRouter } from "next/router";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { useSessionStorage } from "../hooks";

import type { Section, Sections } from "../components/pages/new";
import { Container, Navigation } from "../components/pages/new";
import {
  Information,
  Members,
  Socials,
  Review,
} from "../components/pages/new/sections";

const New: NextPage = () => {
  const router = useRouter();
  const { setItem, getItem, removeItem } = useSessionStorage();
  const sections: Sections = useMemo(
    () => [
      { name: "info", label: "Basic Information" },
      { name: "members", label: "Advisors and Leaders" },
      { name: "socials", label: "Socials" },
      { name: "review", label: "Review and Submit" },
    ],
    []
  );
  const current: Section["name"] =
    (router.query.section as Section["name"]) || sections[0].name;

  const updateSection = (section: Section["name"]): void => {
    router.push(`?section=${section}`, undefined, { shallow: true });
  };

  const next = (): void => {
    const indexOfNext =
      sections.indexOf(sections.find(({ name }) => name === current)) + 1;
    if (indexOfNext === sections.length) return;
    updateSection(sections[indexOfNext].name);
  };

  const prev = (): void => {
    const indexOfPrev =
      sections.indexOf(sections.find(({ name }) => name === current)) - 1;
    if (indexOfPrev < 0) return;
    updateSection(sections[indexOfPrev].name);
  };

  //   if (current === "members") return <Test />;
  //   if (current === "socials") return <Test2 />;
  //   if (current === "review") return <Test3 />;

  const { isInfo, isMembers, isSocials, isReview } = useMemo(() => {
    return {
      isInfo: current === "info",
      isMembers: current === "members",
      isSocials: current === "socials",
      isReview: current === "review",
    };
  }, [current]);

  return (
    <>
      <Head>
        <title>New Club</title>
      </Head>
      <Container>
        <Navigation
          sections={sections}
          current={current}
          updateSection={updateSection}
        />
        {isInfo && <Information />}
        {isMembers && <Members />}
        {isSocials && <Socials />}
        {isReview && <Review />}
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      navigationLayout: false,
    },
  };
};

export default New;
