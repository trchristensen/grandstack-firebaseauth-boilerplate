// import { MutationResolvers, QueryResolvers, Resolvers } from "./gen/index";
import { UserMutations } from "./resolvers/Users.resolvers";
type Context = { idToken: { uid: string } | null };

const CurrentUser: any = {
  //@ts-ignore
  async currentUser(_parent, _args, context, _info) {
    return {
      id: context.idToken?.uid!,
    };
  },
};

const Query = {
  ...CurrentUser,
};

const Mutation = {};

export const resolvers: any = {
  Query,
  Mutation,
};
