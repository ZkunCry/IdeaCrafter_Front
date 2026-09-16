"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form";
import { Eye, EyeOff, Rocket } from "lucide-react";
import { defaultValues, SignInForm, signInSchema } from "./schema";
import { useSignIn } from "@/src/components/features/auth/signin/useSignIn";
import { useSetCredentials } from "@/src/store/user";
import { useRouter, useSearchParams } from "next/navigation";
import { getApiErrorMessage } from "@/src/lib/api-error";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const reason = searchParams.get("reason");
  // Only same-origin paths are honoured, so a crafted ?redirect= cannot bounce
  // a freshly signed-in user to another site.
  const requestedRedirect = searchParams.get("redirect");
  const redirectTo =
    requestedRedirect && /^\/(?!\/)/.test(requestedRedirect)
      ? requestedRedirect
      : "/";
  useEffect(() => {
    if (reason === "session_expired") {
      const timer = setTimeout(() => {
        toast("Ваша сессия истекла", {
          description: "Пожалуйста, войдите снова",
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [reason]);
  const setCredentials = useSetCredentials();
  const router = useRouter();
  const form = useForm<SignInForm>({
    resolver: zodResolver(signInSchema),
    defaultValues,
  });
  const { mutateAsync: signIn } = useSignIn();

  const onSubmit = async (data: SignInForm) => {
    try {
      const response = await signIn(data);
      toast("Добро пожаловать!", {
        description: "Вы успешно вошли в систему.",
      });
      setCredentials(response);
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      toast("Что-то пошло не так", {
        description: getApiErrorMessage(error, "Не удалось войти"),
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Rocket className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold text-foreground">
              IdeaCrafter
            </span>
          </div>
        </div>

        <Card className="shadow-xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">
              Добро пожаловать обратно
            </CardTitle>
            <CardDescription>
              Введите свои учетные данные для доступа к вашей учетной записи
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex gap-4 flex-col "
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Введите ваш email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Пароль</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Введите ваш пароль"
                            {...field}
                            className="pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? (
                              <EyeOff size={16} />
                            ) : (
                              <Eye size={16} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary hover:underline"
                  >
                    Забыли пароль?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="cursor-pointer w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? "Вход..." : "Войти"}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Нет учетной записи ?{" "}
                <Link
                  href="/auth/signup"
                  className="text-primary hover:underline font-medium"
                >
                  Зарегистрироваться
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
