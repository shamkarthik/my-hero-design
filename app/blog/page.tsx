import { allPosts, Post } from "contentlayer/generated";
import Link from "next/link";
// ESM
import { compareDesc } from "date-fns";

export default function ListPage() {
  // sort posts based on 'published' date
  const posts: Post[] = allPosts.sort((a, b) => {
    return compareDesc(new Date(a.published), new Date(b.published));
  });
  return (
    <div>
      <h1>Blog</h1>
      {posts.map((post) => (
        <div key={post.slug}>
          <h2>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
        </div>
      ))}
    </div>
  );
}
