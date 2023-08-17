export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard"],
  //  "/dashboard/:path*" de esta manera protejo todas las rutas dentro de dashboard
};
