import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestResponse } from "@supabase/supabase-js";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { posts: any[] | null; tags: any[] | null };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const supabase = createServerSupabaseClient({ req, res });

  const { data: posts }: PostgrestResponse<any[] | null> = await supabase
    .from("posts")
    .select()
    .in("approved", ["true"]);
  const { data: tags }: PostgrestResponse<any[] | null> = await supabase.from("tags").select();
  res.status(200).json({ posts, tags });
}
