import BlogDetail from "../../../src/views/blog/BlogDetail";

export default async function BlogDetailPage({ params }) {
  const { id } = await params;

  return <BlogDetail match={{ params: { id } }} />;
}
