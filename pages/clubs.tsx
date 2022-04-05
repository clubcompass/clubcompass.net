import { useState } from "react";
import type { GetServerSideProps } from "next";
import type {
  GetApprovedClubsArgs,
  GetApprovedClubsPayload,
} from "../server/graphql/club/types";
import { GET_APPROVED_CLUBS } from "../lib/docs/clubDocuments";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext, useToastContext } from "../context";
import ClubsToolbar from "../components/pages/clubs/toolbar/ClubsToolbar";
import Clubs from "../components/pages/clubs/Clubs";
import { initializeApollo } from "../lib/apolloClient";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const cookies = req?.cookies;
  console.log(cookies);

  const client = initializeApollo();

  const { data, errors } = await client.query<
    { getApprovedClubs: GetApprovedClubsPayload },
    GetApprovedClubsArgs
  >({
    query: GET_APPROVED_CLUBS,
    context: {
      ...(cookies?.token && {
        headers: {
          authorization: `Bearer ${cookies?.token}`,
        },
      }),
    },
  });

  // const user = cookies ? await getUser({ cookies }) : null;
  return {
    props: {
      initialClubs: data?.getApprovedClubs,
    },
  };
};

const Cards = ({ initialClubs }: { initialClubs: GetApprovedClubsPayload }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [clubs, setClubs] = useState(initialClubs);
  const [staticClubs, setStaticClubs] = useState(initialClubs);

  return (
    <div className="flex flex-col gap-6">
      <ClubsToolbar
        clubs={clubs}
        staticClubs={staticClubs}
        updateClubs={setClubs}
      />
      <Clubs clubs={initialClubs} />
    </div>
  );
};

export default Cards;
