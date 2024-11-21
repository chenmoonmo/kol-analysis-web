import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
// export function middleware(request: NextRequest) {
//   if (
//     !request.nextUrl.searchParams.get("level") ||
//     !request.nextUrl.searchParams.get("key")
//   ) {
//     return NextResponse.redirect(new URL(`/?level=1day&key=30_rate&desc=true`, request.url));
//   }
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: "/",
// };
