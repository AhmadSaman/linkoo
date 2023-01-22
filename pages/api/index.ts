import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestResponse } from "@supabase/supabase-js";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });

  const { data: posts }: PostgrestResponse<any[] | null> = await supabase
    .from("posts")
    .select()
    .in("approved", ["true"]);
  const { data: tags }: PostgrestResponse<any[] | null> = await supabase.from("tags").select();
  const reversePosts = posts?.reverse();
  res.status(200).json({ posts: reversePosts, tags });
}
