import { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";
import type { NextApiRequest, NextApiResponse } from "next";
import supabase from "../utils/supabase";

const getPosts: () => SupabaseQueryBuilder<any> = () => supabase.from("posts");
const getTags: () => SupabaseQueryBuilder<any> = () => supabase.from("tags");

export { getPosts, getTags };
