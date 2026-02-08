import { NextRequest, NextResponse } from "next/server";
import { checkSessionServer } from "./lib/api/serverApi";

const privateRoutes = ["/profile", "/notes"];
const authRoutes = ["/sign-in", "/sign-up"];

function isPrivatePath(pathname: string) {
  return privateRoutes.some((p) => pathname.startsWith(p));
}

function isAuthPath(pathname: string) {
  return authRoutes.some((p) => pathname.startsWith(p));
}

function buildCookieHeader(req: NextRequest) {
  return req.cookies
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const hasAccessToken = Boolean(req.cookies.get("accessToken")?.value);
  const hasRefreshToken = Boolean(req.cookies.get("refreshToken")?.value);

  let isAuthed = hasAccessToken;
  let setCookieFromRefresh: string[] | null = null;

  if (!hasAccessToken && hasRefreshToken) {
    try {
      const cookieHeader = buildCookieHeader(req);
      const sessionRes = await checkSessionServer({ cookie: cookieHeader });

      isAuthed = Boolean(sessionRes.data);

      const setCookie = sessionRes.headers["set-cookie"];
      if (Array.isArray(setCookie) && setCookie.length > 0) {
        setCookieFromRefresh = setCookie;
      }
    } catch {
      isAuthed = false;
    }
  }

  let res: NextResponse;

  if (!isAuthed && isPrivatePath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    res = NextResponse.redirect(url);
  } else if (isAuthed && isAuthPath(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    res = NextResponse.redirect(url);
  } else {
    res = NextResponse.next();
  }

  if (setCookieFromRefresh) {
    setCookieFromRefresh.forEach((value) => {
      res.headers.append("set-cookie", value);
    });
  }

  return res;
}
