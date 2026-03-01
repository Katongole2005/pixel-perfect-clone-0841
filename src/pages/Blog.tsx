import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import { format } from "date-fns";
import PageTransition from "@/components/PageTransition";
import {
  SplitTextReveal,
  ClipReveal,
  LineDraw,
} from "@/components/animations/AnimationUtils";

const Blog = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <PageTransition>
      <Helmet>
        <title>Travel Journal | Fresh Tracks Africa Tours & Travel</title>
        <meta name="description" content="Read our latest travel stories, tips, and destination guides for Uganda and Rwanda safaris." />
      </Helmet>

      {/* Hero */}
      <section className="relative py-28 px-4 bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/20" />
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <ClipReveal>
            <p className="text-secondary text-xs font-body font-bold uppercase tracking-[0.4em] mb-4">
              ── Travel Journal
            </p>
          </ClipReveal>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
            <SplitTextReveal>Stories from the</SplitTextReveal>
            <br />
            <span className="text-secondary italic">
              <SplitTextReveal delay={0.2}>African Wild</SplitTextReveal>
            </span>
          </h1>
          <LineDraw className="w-16 h-[2px] bg-secondary mx-auto my-6" delay={0.4} />
          <ClipReveal delay={0.5}>
            <p className="text-primary-foreground/70 font-body text-lg max-w-2xl mx-auto">
              Travel tips, destination guides, and stories from our safaris across Uganda & Rwanda.
            </p>
          </ClipReveal>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-muted h-56 mb-4" />
                  <div className="bg-muted h-4 w-3/4 mb-2" />
                  <div className="bg-muted h-3 w-full" />
                </div>
              ))}
            </div>
          ) : posts && posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group"
                >
                  <Link to={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden mb-4">
                      <img
                        src={post.image_url || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {post.category && (
                        <span className="absolute top-3 left-3 bg-secondary text-secondary-foreground text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {post.category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-xs font-body mb-2">
                      <Calendar className="w-3 h-3" />
                      {post.published_at ? format(new Date(post.published_at), "MMM dd, yyyy") : "Draft"}
                    </div>
                    <h2 className="font-display font-bold text-xl text-foreground mb-2 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground font-body text-sm leading-relaxed line-clamp-3 mb-3">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs font-body font-bold uppercase tracking-wider text-foreground group-hover:text-secondary group-hover:gap-3 transition-all duration-300">
                      Read More <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-body text-lg mb-2">No stories yet.</p>
              <p className="text-muted-foreground/60 font-body text-sm">Check back soon for travel stories and guides.</p>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
};

export default Blog;
