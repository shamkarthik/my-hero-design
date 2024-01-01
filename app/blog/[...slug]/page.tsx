import { allBlogs } from "contentlayer/generated";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Icons } from "@/components/icons";
import { Mdx } from "@/components/mdx-components";
import { DocsPageHeader } from "@/components/page-header";
import { DashboardTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";

import "@/styles/mdx.css";
import { Metadata } from "next";

import { buttonVariants } from "@/components/ui/button";
import { env } from "@/env.mjs";
import { absoluteUrl, cn } from "@/lib/utils";

interface BlogPageProps {
  params: {
    slug: string[];
  };
}

async function getBlogFromParams(params: { slug: any }) {
  const slug = params?.slug?.join("/");
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug);

  if (!blog) {
    null;
  }

  return blog;
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const blog = await getBlogFromParams(params);
  console.log("params", params);
  if (!blog) {
    return {};
  }
  const url = env.NEXT_PUBLIC_APP_URL;
  console.log("env.NEXT_PUBLIC_APP_URL", env.NEXT_PUBLIC_APP_URL);
  const ogUrl = new URL(`${url}/api/og`);
  ogUrl.searchParams.set("heading", blog.title);
  ogUrl.searchParams.set("type", "Blog");
  ogUrl.searchParams.set("mode", "dark");

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      type: "article",
      url: absoluteUrl(blog.slug),
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams(): Promise<
  BlogPageProps["params"][]
> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const blog = await getBlogFromParams(params);

  if (!blog) {
    notFound();
  }

  const toc = await getTableOfContents(blog.body.raw);

  return (
    <main className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
      <div>
        <DocsPageHeader heading={blog.title} text={blog.description} />
        <Mdx code={blog.body.code} />
        <hr className="my-4" />
        <div className="flex justify-center py-6 lg:py-10">
          <Link
            href="/blog"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <Icons.chevronLeft className="mr-2 h-4 w-4" />
            See all blogs
          </Link>
        </div>
      </div>
      <div className="hidden text-sm lg:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
