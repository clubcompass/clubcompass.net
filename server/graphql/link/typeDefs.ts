import gql from "graphql-tag";
export default gql`
  ##### ADD LINK #####

  input AddLinkArgs {
    name: String!
    link: String!
    type: LinkType!
  }

  type AddLinkPayload {
    id: ID!
    links: [LinkContent!]!
  }

  ##### END OF ADD LINK #####

  ##### DELETE LINK #####

  input DeleteLinkArgs {
    linkId: ID!
  }

  type DeleteLinkPayload {
    id: ID!
  }

  ##### END OF DELETE LINK #####

  ##### SHARED #####

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

  type LinkContent {
    id: ID!
    name: String!
    link: String!
    type: LinkType!
  }

  ##### END OF SHARED #####

  ##### QUERIES + MUTATIONS #####

  type Mutation {
    addLink(clubId: ID!, data: AddLinkArgs!): AddLinkPayload!
    deleteLink(clubId: ID!, data: DeleteLinkArgs!): DeleteLinkPayload!
  }

  ##### END OF QUERIES + MUTATIONS #####
`;
