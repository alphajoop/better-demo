'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';

const signInSchema = z.object({
  email: z
    .string()
    .email('Please enter a valid email')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .max(100, 'Password must be less than 100 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function LoginForm() {
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsEmailLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Signed in successfully!');
      form.reset();
    } catch (_error) {
      toast.error('Failed to sign in');
    } finally {
      setIsEmailLoading(false);
    }
  };

  const handleGithub = async () => {
    setIsGithubLoading(true);
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
      });
    } catch (_error) {
      toast.error('Failed to sign in with GitHub');
    } finally {
      setIsGithubLoading(false);
    }
  };

  const isLoading = isEmailLoading || isGithubLoading;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to your account to continue.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleGithub}
          disabled={isLoading}
          aria-describedby={isGithubLoading ? 'github-loading' : undefined}
        >
          <Github className="mr-2 h-4 w-4" aria-hidden="true" />
          GitHub
        </Button>
        <Button type="button" variant="outline" disabled aria-disabled="true">
          Other
        </Button>
      </div>

      {isGithubLoading && (
        <div id="github-loading" className="sr-only" aria-live="polite">
          Connecting to GitHub…
        </div>
      )}

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <Field>
          <FieldLabel htmlFor="signin-email">Email</FieldLabel>
          <FieldDescription>Your email address</FieldDescription>
          <FieldContent>
            <Input
              id="signin-email"
              {...form.register('email')}
              type="email"
              placeholder="john@example.com"
              autoComplete="email"
              spellCheck={false}
              maxLength={100}
              disabled={isLoading}
            />
          </FieldContent>
          <FieldError
            errors={[{ message: form.formState.errors.email?.message }]}
          />
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="signin-password">Password</FieldLabel>
            <Link
              href="#"
              className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Forgot password?
            </Link>
          </div>
          <FieldDescription>Enter your password</FieldDescription>
          <FieldContent>
            <Input
              id="signin-password"
              {...form.register('password')}
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              maxLength={100}
              disabled={isLoading}
            />
          </FieldContent>
          <FieldError
            errors={[{ message: form.formState.errors.password?.message }]}
          />
        </Field>

        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
          aria-describedby={isEmailLoading ? 'email-loading' : undefined}
        >
          {isEmailLoading ? 'Signing in…' : 'Sign in'}
        </Button>

        {isEmailLoading && (
          <div id="email-loading" className="sr-only" aria-live="polite">
            Signing you in…
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground">
          New here?{' '}
          <Link
            href="/sign-up"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Create an account
          </Link>
        </p>
      </form>
    </div>
  );
}
