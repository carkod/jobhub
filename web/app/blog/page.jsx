import BlogIndex from "../../src/views/blog/BlogIndex";
import { getPublicBlogs } from "../_lib/public-api";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Blog",
  description:
    "Thoughts on development, technology, and building things that last.",
};

export default async function BlogIndexPage() {
  const blogs = await getPublicBlogs();
  return <BlogIndex blogs={blogs} />;
}
