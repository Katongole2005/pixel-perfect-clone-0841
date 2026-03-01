import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import { format } from "date-fns";
import PageTransition from "@/components/PageTransition";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, isLoading } = useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug!)
        .eq("is_published", true)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse space-y-4 max-w-3xl w-full px-4">
          <div className="bg-muted h-8 w-3/4" />
          <div className="bg-muted h-64 w-full" />
          <div className="bg-muted h-4 w-full" />
          <div className="bg-muted h-4 w-5/6" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-secondary font-body hover:underline">← Back to Journal</Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>{post.title} | Fresh Tracks Africa Travel Journal</title>
        <meta name="description" content={post.excerpt || ""} />
      </Helmet>

      <article className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground text-sm font-body hover:text-secondary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Journal
          </Link>

          <div className="flex items-center gap-3 text-xs font-body text-muted-foreground mb-4">
            {post.category && (
              <span className="bg-secondary/10 text-secondary px-2 py-1 flex items-center gap-1 uppercase tracking-wider font-bold">
                <Tag className="w-3 h-3" /> {post.category}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.published_at ? format(new Date(post.published_at), "MMMM dd, yyyy") : ""}
            </span>
            <span>by {post.author_name}</span>
          </div>

          <h1 className="font-display font-bold text-3xl md:text-5xl text-foreground leading-tight mb-6">
            {post.title}
          </h1>

          {post.image_url && (
            <img src={post.image_url} alt={post.title} className="w-full h-80 object-cover mb-8" />
          )}

          <div className="prose prose-lg max-w-none font-body text-foreground/85 leading-[2]"
            dangerouslySetInnerHTML={{ __html: post.content || "" }}
          />

          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="bg-muted text-muted-foreground text-xs font-body px-3 py-1 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </PageTransition>
  );
};

export default BlogPost;
