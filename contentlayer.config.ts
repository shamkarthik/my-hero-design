import { defineDocumentType, makeSource } from "contentlayer/source-files";
import readingTime from "reading-time";

export const Post = defineDocumentType(() => ({
  // The name of the document type
  name: "Post",

  // The type of the files to parse. 'md' also works
  contentType: "mdx",

  // The path of the mdx files, relative to contentDirPath
  filePathPattern: "posts/*.mdx",

  // Fields present in the frontmatter of MDX file
  fields: {
    title: { type: "string", required: true },
    published: { type: "string", required: true },
    description: { type: "string" },
    status: {
      type: "enum",
      options: ["draft", "published"],
      required: true,
    },
  },

  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) =>
        doc._raw.sourceFileName
          // hello-world.mdx => hello-world
          .replace(/\.mdx$/, ""),
    },
    readingTime: {
      type: "json",
      resolve: (doc) => readingTime(doc.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Post],
});
