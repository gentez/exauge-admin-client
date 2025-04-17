import { auth } from "./app/(auth)/auth"

export default auth((req) => {
  // if (!req.auth && (req.nextUrl.pathname !== "/login" || req.nextUrl.pathname !== "/register" || req.nextUrl.pathname !== "/")) {
  //   const newUrl = new URL("/", req.nextUrl.origin)
  //   return Response.redirect(newUrl)
  // }

  // if (
  //   req.auth &&
  //   new Date(req.auth.expires).getTime() >= Date.now() &&
  //   req.nextUrl.pathname === "/login" ||
  //   req.nextUrl.pathname === "/register" ||
  //   req.nextUrl.pathname === "/"
  // ) {
  //   return Response.redirect(new URL("/dashboard", req.nextUrl.origin))
  // }
})
