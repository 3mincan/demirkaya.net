import { NextResponse } from "next/server";
import { INDEXNOW_KEY } from "@/lib/site";

type RouteContext = {
  params: Promise<{
    indexNowKey: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { indexNowKey } = await context.params;

  if (indexNowKey !== `${INDEXNOW_KEY}.txt`) {
    return NextResponse.json({ message: "Not found." }, { status: 404 });
  }

  return new Response(INDEXNOW_KEY, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
