import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiResponse, NextApiRequest } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });

  await supabase.from("posts").update({ approved: true }).is("approved", false);
  res.status(200).json({ data: "done accepted all" });
}
