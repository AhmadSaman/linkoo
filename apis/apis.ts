import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../utils/supabase";

const getPosts = () => supabase.from("posts");
const postPost: (args: object) => PostgrestFilterBuilder<any> = (args: object) =>
  supabase.from("posts").insert(args, { returning: "minimal" });
const getTags = () => supabase.from("tags");
const searchPost = (search: string) => supabase.from("posts").select().textSearch("title", `${search}`);
const getUserPosts = (id: string) => supabase.from("posts").select("*").like("userId", id);

export { getPosts, getTags, postPost, searchPost, getUserPosts };
