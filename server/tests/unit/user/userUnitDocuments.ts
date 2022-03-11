import { gql } from "@apollo/client";
import { User } from "../../prisma/fragments";

export const findUniqueUser = gql`
  query findUniqueUser($where: UserWhereUniqueInput!) {
    findUniqueUser(where: $where) {
      ...User
    }
  }
  ${User}
`;
