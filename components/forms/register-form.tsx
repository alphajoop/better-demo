'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { authClient } from '@/lib/auth-client';

const signUpSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z
    .string()
    .email('Please enter a valid email')
    .max(100, 'Email must be less than 100 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain uppercase, lowercase, and number',
    ),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        callbackURL: '/dashboard',
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success('Account created successfully!');
      form.reset();
    } catch (_error) {
      toast.error('Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create an account
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your details below to create your account.
        </p>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        noValidate
      >
        <Field>
          <FieldLabel htmlFor="signup-name">Name</FieldLabel>
          <FieldDescription>Your full name (2–50 characters)</FieldDescription>
          <FieldContent>
            <Input
              id="signup-name"
              {...form.register('name')}
              type="text"
              placeholder="John Doe…"
              autoComplete="name"
              spellCheck={false}
              maxLength={50}
              disabled={isLoading}
            />
          </FieldContent>
          <FieldError
            errors={[{ message: form.formState.errors.name?.message }]}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="signup-email">Email</FieldLabel>
          <FieldDescription>Your email address</FieldDescription>
          <FieldContent>
            <Input
              id="signup-email"
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
          <FieldLabel htmlFor="signup-password">Password</FieldLabel>
          <FieldDescription>
            Min. 8 characters with uppercase, lowercase, and number
          </FieldDescription>
          <FieldContent>
            <Input
              id="signup-password"
              {...form.register('password')}
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              maxLength={100}
              disabled={isLoading}
            />
          </FieldContent>
          <FieldError
            errors={[{ message: form.formState.errors.password?.message }]}
          />
        </Field>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating account…' : 'Create account'}
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/sign-in"
            className="font-medium text-foreground underline underline-offset-4"
          >
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
}
