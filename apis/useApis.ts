import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function useApis() {
  const supabase = useSupabaseClient();

  const getPosts = () => supabase.from("posts");
  const postPost = (args: object) => supabase.from("posts").insert(args);
  const getTags = () => supabase.from("tags");
  const searchPost = (search: string) => supabase.from("posts").select().textSearch("title", `${search}`);
  const getUserPosts = (id: string) => supabase.from("posts").select("*").like("userId", id);
  return { getPosts, getTags, postPost, searchPost, getUserPosts };
}
