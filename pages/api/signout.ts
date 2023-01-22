import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
// import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });
  //   console.log(supabaseClient);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    await supabase.auth.admin.signOut(session?.access_token);
    res.status(200).json({ data: "you did it" });
  }
}
