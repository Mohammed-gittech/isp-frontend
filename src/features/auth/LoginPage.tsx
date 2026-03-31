import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { login } from "@/store/slices/authSlice";
import { login as loginApi } from "@/api/auth.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wifi } from "lucide-react";

// Zod schema — matches LoginRequestValidator.cs in Backend
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "البريد الإلكتروني مطلوب")
    .email("البريد الإلكتروني غير صالح"),
  password: z.string().min(1, "كلمة المرور مطلوبة"),
});

type LoginForm = z.infer<typeof loginSchema>;

function LoginPage() {
  // Navigation hook — to redirect after login
  const navigate = useNavigate();

  // Redux dispatch
  const dispatch = useAppDispatch();

  // Error message from Backend
  const [error, setError] = useState<string>("");

  // Loading state — to disable button while request is pending
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // React Hook Form setup with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  // Called only when Zod validation passes
  const onSubmit = async (data: LoginForm) => {
    try {
      // Show loading state
      setIsLoading(true);

      // Clear previous errors
      setError("");

      // Send request to Backend
      const response = await loginApi(data);

      if (!response.data) {
        setError("حدث خطأ، حاول مرة أخرى");
        return;
      }

      // Save user data in Redux + refreshToken in localStorage
      dispatch(login(response.data));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: unknown) {
      // Show error message from Backend
      if (err && typeof err === "object" && "response" in err) {
        const axiosError = err as {
          response?: { data?: { message?: string } };
        };
        setError(
          axiosError.response?.data?.message ?? "حدث خطأ، حاول مرة أخرى",
        );
      } else {
        setError("حدث خطأ، حاول مرة أخرى");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center p-4"
      dir="rtl"
    >
      <Card className="w-full max-w-md shadow-md">
        <CardHeader className="space-y-4 text-center pt-6 pb-2 gap-4">
          <div className="mx-auto h-12 w-12 bg-primary rounded-lg flex items-center justify-center">
            <Wifi className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-2xl">نظام إدارة ISP</CardTitle>
            <CardDescription className="mt-2">
              قم بتسجيل الدخول للوصول إلى لوحة التحكم
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">البريد الإلكتروني</Label>
              <Input
                className="h-10 bg-input-background px-3"
                id="email"
                type="email"
                placeholder="admin@isp.com"
                disabled={isLoading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">كلمة المرور</Label>
              <Input
                className="h-10 bg-input-background px-3"
                id="password"
                type="password"
                placeholder="••••••••"
                disabled={isLoading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Backend Error */}
            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 mt-2 mb-2"
              disabled={isLoading}
            >
              {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
