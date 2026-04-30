import { NextResponse } from "next/server";
import { INDEXNOW_KEY, SITE_HOST, SITE_URL } from "@/lib/site";

type IndexNowPayload = {
  urls?: string[];
};

const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function normalizeUrl(url: string) {
  return new URL(url, SITE_URL).toString();
}

function belongsToSite(url: string) {
  return new URL(url).hostname === SITE_HOST;
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => ({}))) as IndexNowPayload;
  const submittedUrls = payload.urls?.length ? payload.urls : [SITE_URL];
  const urlList = [...new Set(submittedUrls.map(normalizeUrl))];

  if (urlList.some((url) => !belongsToSite(url))) {
    return NextResponse.json(
      { message: "All submitted URLs must belong to demirkaya.net." },
      { status: 400 }
    );
  }

  const response = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      host: SITE_HOST,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    }),
  });

  if (!response.ok && response.status !== 202) {
    return NextResponse.json(
      {
        message: "IndexNow submission failed.",
        status: response.status,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: "IndexNow submission accepted.",
    submitted: urlList,
    status: response.status,
  });
}
