import gql from "graphql-tag";
export default gql`
  enum LinkType {
    EMAIL
    TWITTER
    INSTAGRAM
    DISCORD
    YOUTUBE
    FACEBOOK
    REMIND
    SNAPCHAT
    WEBSITE
  }

  type Link {
    id: ID!
    club: Club!
    clubId: ID!
    name: String
    link: String!
    type: LinkType!
  }
`;
