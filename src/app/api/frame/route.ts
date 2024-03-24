import { NextRequest, NextResponse } from 'next/server';
import { getPost } from '@/utils/graph/creators';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const searchParams = req.nextUrl.searchParams;
  const id: any = searchParams.get("id");
  const post = await getPost(id);

  

  return new NextResponse(post.content.adContent);
}

export async function GET(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
