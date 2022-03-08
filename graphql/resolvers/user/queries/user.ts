import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaSelect } from "@paljs/plugins";
import { GraphQLResolveInfo } from "graphql";

// type ResolverFn<TResult, TParent, TContext, TArgs> = (
//   parent: TParent,
//   args: TArgs,
//   context: TContext,
//   info: GraphQLResolveInfo
// ) => Promise<TResult> | TResult;

export const user = async (
  _parent: any,
  { where }: { where: Prisma.UserWhereUniqueInput },
  { prisma }: { prisma: PrismaClient },
  info: GraphQLResolveInfo
): Promise<typeof user> => {
  // console.log(q);
  const select = new PrismaSelect(info).value;
  const user = await prisma.user.findUnique({
    where,
    ...select,
  });
  // const user = await prisma.user.findUnique({
  //   where: {
  //     ...q,
  //   },
  //   include: {
  //     interests: true,
  //   },
  // });

  return user;
};
