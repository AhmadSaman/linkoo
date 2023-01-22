import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextApiRequest, NextApiResponse } from "next";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabase = createServerSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    const { data }: any = await supabase.from("users_public_data").select("*").eq("id", session.user.id);
    if (data[0].role === "ADMIN") {
      const { data }: any = await supabase.from("posts").select("*").in("approved", [false]);
      res.status(200).json({ data });
    } else {
      res.status(200).json({ data: "not admin" });
    }
  }
}
