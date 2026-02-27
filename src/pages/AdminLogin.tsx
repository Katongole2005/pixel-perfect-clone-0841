import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SignInCard } from "@/components/ui/sign-in-card-2";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && user && isAdmin) {
      navigate("/admin");
    }
  }, [loading, user, isAdmin, navigate]);

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const result = await signIn(email.trim(), password.trim());
    
    if (result.error) {
      setIsLoading(false);
      toast({
        title: "Login failed",
        description: result.error.message,
        variant: "destructive"
      });
    } else if (result.isAdmin) {
      navigate("/admin");
    } else {
      setIsLoading(false);
      toast({
        title: "Access denied",
        description: "You do not have admin privileges.",
        variant: "destructive"
      });
    }
  };

  return (
    <SignInCard
      onSubmit={handleSignIn}
      isLoading={isLoading}
      logoUrl={logo}
    />
  );
};

export default AdminLogin;
