import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { LoginForm } from '@/components/forms/login-form';
import { auth } from '@/lib/auth';

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('/bg.svg')] bg-center bg-no-repeat opacity-15 bg-size-[70%]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <div className="text-sm font-medium">better-demo</div>
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight text-wrap balance">
              Welcome back! Please sign in to your account
            </h2>
            <p className="text-white/80 leading-relaxed">
              Use email/password or GitHub OAuth. Your session is stored
              securely with Better Auth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
