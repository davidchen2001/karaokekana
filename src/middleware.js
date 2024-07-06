import withAuth from "next-auth/middleware";
import { PROTECTED_SUB_ROUTES, LOGIN } from "./lib/routes";

export const pages = {
  signIn: LOGIN,
};

export default withAuth({ pages });

export const config = { matcher: ["/song/submit"] };
