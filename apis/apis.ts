import type { SupabaseQueryBuilder } from "@supabase/supabase-js/dist/main/lib/SupabaseQueryBuilder";
import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import supabase from "../utils/supabase";

const getPosts: () => SupabaseQueryBuilder<any> = () => supabase.from("posts");
const postPost: (args: object) => PostgrestFilterBuilder<any> = (args: object) =>
  supabase.from("posts").insert(args, { returning: "minimal" });
const getTags: () => SupabaseQueryBuilder<any> = () => supabase.from("tags");
const searchPost = (search: string) => supabase.from("posts").select().textSearch("title", `"bun"`);

export { getPosts, getTags, postPost, searchPost };
