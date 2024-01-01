import { defineDocumentType } from "contentlayer/source-files";
import { makeSource } from "contentlayer/source-remote-files";
import { spawn } from "node:child_process";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { env } from "./env.mjs";

export const Doc = defineDocumentType(() => ({
  name: "Doc",
  filePathPattern: `docs/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    published: {
      type: "boolean",
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

export const Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `${
    env.NEXT_PUBLIC_BLOG_SYNC_FOLDER ? env.NEXT_PUBLIC_BLOG_SYNC_FOLDER : ""
  }/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    featured: {
      type: "boolean",
      default: false,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      // Reference types are not embedded.
      // Until this is fixed, we can use a simple list.
      // type: "reference",
      // of: Author,
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    twitter: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => {
        const a = `/${doc._raw.flattenedPath}`;
        return a;
      },
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
    },
  },
}));

const syncContentFromGit = async (contentDir: string) => {
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
    console.log("Syncing content files from git");

    await syncRun();

    if (wasCancelled) return;

    syncInterval = setTimeout(syncLoop, 1000 * 60);
  };

  // Block until the first sync is done
  // await syncLoop();

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

export default makeSource({
  syncFiles: syncContentFromGit,
  contentDirPath: "cloud",
  contentDirInclude: [],
  documentTypes: [Blog],
  disableImportAliasWarning: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        // @ts-expect-error
        rehypePrettyCode,
        {
          theme: "github-dark",
          onVisitLine(node: { children: string | any[] }) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node: {
            properties: { className: string[] };
          }) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node: {
            properties: { className: string[] };
          }) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
});
