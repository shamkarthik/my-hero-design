import { allPosts, Post } from "contentlayer/generated";
import { getMDXComponent } from "next-contentlayer/hooks";

type Props = {
  params: { slug: string };
};

export default async function Page({ params }: Props) {
  const { slug } = params;
  const post: Post | undefined = allPosts.find((post) => post.slug === slug);
  if (!post) {
    return <></>;
  }

  const MdxContent = getMDXComponent(post.body.code);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>Time to read: {Math.round(post.readingTime.minutes)} mins</p>
      <section>
        <MdxContent />
      </section>
    </div>
  );
}
