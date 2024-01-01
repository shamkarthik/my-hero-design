import { allBlogs } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Link from "next/link";

import { DocsPageHeader } from "@/components/page-header";
import { env } from "@/env.mjs";
import { formatDate } from "@/lib/utils";
import { spawn } from "node:child_process";

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
  const syncContentFromGit = async () => {
    const contentDir = "cloud";
    const syncRun = async () => {
      const gitUrl = env.NEXT_PUBLIC_BLOG_SYNC_URL;
      console.log(gitUrl);
      await runBashCommand(`
          if [ -d  "${contentDir}" ];
            then
              cd "${contentDir}"; git pull;
            else
              git clone --depth 1 --single-branch ${gitUrl} ${contentDir};
          fi
        `);
    };

    let wasCancelled = false;
    let syncInterval: string | number | NodeJS.Timeout | undefined;

    const syncLoop = async () => {
      console.log("Syncing content files from git next");

      await syncRun();

      if (wasCancelled) return;

      syncInterval = setTimeout(syncLoop, 1000 * 60);
    };

    // Block until the first sync is done
    await syncLoop();

    return () => {
      wasCancelled = true;
      clearTimeout(syncInterval);
    };
  };

  const runBashCommand = (command: string) =>
    new Promise((resolve, reject) => {
      // console.log(command);
      const child = spawn("bash", ["-c", command]);
      // const child = spawn(command, [], { shell: true })

      // console.log(child.output);
      child.stdout.setEncoding("utf8");
      child.stdout.on("data", (data) => process.stdout.write(data));

      child.stderr.setEncoding("utf8");
      child.stderr.on("data", (data) => process.stderr.write(data));
      child.on("close", function (code) {
        if (code === 0) {
          resolve(void 0);
        } else {
          reject(new Error(`Command failed with exit code ${code}`));
        }
      });
      // child.kill();
    });
  syncContentFromGit();
  return (
    <div className="py-6 lg:py-10">
      {/* <SyncBlog /> */}
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
