import { useEffect, useState } from "react";
import type { GetServerSideProps } from "next";
import type {
  GetApprovedClubsArgs,
  GetApprovedClubsPayload,
} from "../server/graphql/club/types";
import { GET_APPROVED_CLUBS } from "../lib/docs/clubDocuments";
import { useQuery } from "@apollo/client";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuthContext, useToastContext } from "../context";
import { Clubs, ClubsToolbar } from "../components/pages/clubs";
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

const Cards = ({ initialClubs }) => {
  const { user } = useAuthContext();
  const { addToast } = useToastContext();
  const [clubs, setClubs] = useState(initialClubs);
  const [staticClubs, setStaticClubs] = useState(initialClubs); // static clubs could be abstracted to just be data returned from query
  // const { loading: clubsLoading } = useQuery(GET_APPROVED_CLUBS, {
  //   context: {
  //     ...(user && {
  //       headers: {
  //         authorization: `Bearer ${user.token}`,
  //       },
  //     }),
  //   },
  //   fetchPolicy: "cache-and-network",
  //   onCompleted: ({ getApprovedClubs: clubs = {} } = {}) => {
  //     console.log(clubs);
  //     setClubs(clubs);
  //     setStaticClubs(clubs);
  //   },
  //   onError: (e) => {
  //     addToast({
  //       type: "error",
  //       title: "Error",
  //       description:
  //         "There was an error loading the clubs, please try again later.",
  //     });
  //     console.log(e);
  //   },
  // });

  console.log(initialClubs);

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

// const SkeletonTree = () => {
//   const cards = 12;
//   return (
//     <div className="grid grid-cols-cards gap-6">
//       {Array.from({ length: cards }).map((_, i) => (
//         <Skeleton
//           key={i}
//           height={223}
//           width="100%"
//           borderRadius={12}
//           baseColor="#fafafa"
//           highlightColor="#eeeeee"
//         />
//       ))}
//     </div>
//   );
// };

export default Cards;
