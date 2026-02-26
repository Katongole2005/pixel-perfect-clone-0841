import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { SignInCard } from "@/components/ui/sign-in-card-2";
import logo from "@/assets/logo.png";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await signIn(email.trim(), password.trim());
    setIsLoading(false);

    if (error) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      navigate("/admin");
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
