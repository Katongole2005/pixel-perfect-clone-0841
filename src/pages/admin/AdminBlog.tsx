import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  tags: string[] | null;
  author_name: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
    category: "travel",
    tags: "",
    author_name: "Fresh Tracks Africa",
  });

  const { data: posts, isLoading } = useQuery({
    queryKey: ["admin-blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (data: typeof form & { id?: string }) => {
      const payload = {
        title: data.title,
        slug: data.slug || data.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
        excerpt: data.excerpt || null,
        content: data.content || null,
        image_url: data.image_url || null,
        category: data.category || "travel",
        tags: data.tags ? data.tags.split(",").map((t) => t.trim()) : [],
        author_name: data.author_name || "Fresh Tracks Africa",
      };
      if (data.id) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", data.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(payload);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      setOpen(false);
      setEditing(null);
      resetForm();
      toast({ title: "Blog post saved" });
    },
    onError: (e: Error) => toast({ title: "Error", description: e.message, variant: "destructive" }),
  });

  const togglePublish = useMutation({
    mutationFn: async ({ id, publish }: { id: string; publish: boolean }) => {
      const { error } = await supabase
        .from("blog_posts")
        .update({ is_published: publish, published_at: publish ? new Date().toISOString() : null })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog-posts"] });
      toast({ title: "Post deleted" });
    },
  });

  const resetForm = () => setForm({ title: "", slug: "", excerpt: "", content: "", image_url: "", category: "travel", tags: "", author_name: "Fresh Tracks Africa" });

  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      image_url: post.image_url || "",
      category: post.category || "travel",
      tags: post.tags?.join(", ") || "",
      author_name: post.author_name || "Fresh Tracks Africa",
    });
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Blog Posts</h1>
        <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) { setEditing(null); resetForm(); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" /> New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Post" : "New Post"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => { e.preventDefault(); saveMutation.mutate({ ...form, id: editing?.id }); }}
              className="space-y-4"
            >
              <Input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              <Input placeholder="Slug (auto-generated if empty)" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              <Input placeholder="Image URL" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
              <Input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
              <Input placeholder="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
              <Input placeholder="Author" value={form.author_name} onChange={(e) => setForm({ ...form, author_name: e.target.value })} />
              <Textarea placeholder="Excerpt" rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
              <Textarea placeholder="Content (HTML supported)" rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} />
              <Button type="submit" disabled={saveMutation.isPending}>{saveMutation.isPending ? "Saving..." : "Save"}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <div className="grid gap-4">
          {posts?.map((post) => (
            <Card key={post.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    {post.title}
                    {!post.is_published && (
                      <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">Draft</span>
                    )}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => togglePublish.mutate({ id: post.id, publish: !post.is_published })}>
                      {post.is_published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => openEdit(post)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteMutation.mutate(post.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.excerpt || "No excerpt"}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
