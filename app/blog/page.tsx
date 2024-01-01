import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

import { DocsPageHeader } from "@/components/page-header";
import { formatDate } from "@/lib/utils";

export const metadata = {
  title: "Blog",
  description:
    "This section includes end-to-end blogs for developing Next.js 13 apps.",
};

export default function BlogPage() {
  const blogs = allBlogs
    .filter((blog) => blog.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });

  return (
    <div className="py-6 lg:py-10">
      <DocsPageHeader heading="Blog" text="This section includes blogs." />
      {blogs?.length ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-6">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="group relative rounded-lg border p-6 shadow-md transition-shadow hover:shadow-lg"
            >
              {blog.featured && (
                <span className="absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium">
                  Featured
                </span>
              )}
              <div className="flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h2 className="text-xl font-medium tracking-tight">
                    {blog.title}
                  </h2>
                  {blog.description && (
                    <p className="text-muted-foreground">{blog.description}</p>
                  )}
                </div>
                {blog.date && (
                  <p className="text-sm text-muted-foreground">
                    {formatDate(blog.date)}
                  </p>
                )}
              </div>
              <Link href={blog.slug} className="absolute inset-0">
                <span className="sr-only">View</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>No blogs published.</p>
      )}
    </div>
  );
}
