import supabase from "../utils/supabase";

const getPosts = () => supabase.from("posts").select();
const postPost = (args: object) => supabase.from("posts").insert(args);
// { returning: "minimal" }
const getTags = () => supabase.from("tags").select();
const searchPost = (search: string) => supabase.from("posts").select().textSearch("title", `${search}`);
const getUserPosts = (id: string) => supabase.from("posts").select("*").like("userId", id);

export { getPosts, getTags, postPost, searchPost, getUserPosts };
