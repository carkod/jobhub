import { notFound } from "next/navigation";
import BlogDetail from "../../../src/views/blog/BlogDetail";
import { excerpt, getPublicBlog } from "../../_lib/public-api";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const blog = await getPublicBlog(id);
  if (!blog) return { title: "Post not found", robots: { index: false } };
  return {
    title: blog.name,
    description: excerpt(blog.content),
    openGraph: {
      type: "article",
      title: blog.name,
      description: excerpt(blog.content),
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { id } = await params;
  const blog = await getPublicBlog(id);
  if (!blog) notFound();
  return <BlogDetail blog={blog} />;
}
