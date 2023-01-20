import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  console.log(session);

  if (session) {
    const { data: posts }: any = await supabase.from("posts").select("*").in("userId", [session?.user.id]);
    const { data: tags }: any = await supabase.from("tags").select("*");

    res.status(200).json({ posts, tags });
  }
}
