import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { RegisterForm } from '@/components/forms/register-form';
import { auth } from '@/lib/auth';

export default async function SignUpPage() {
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
          <RegisterForm />
        </div>
      </div>

      <div className="relative hidden md:block">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-[url('/bg.svg')] bg-center bg-no-repeat opacity-15 bg-size-[auto_400px]" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_top,white,transparent_45%)]" />
        <div className="relative flex h-full flex-col justify-between p-10 text-white">
          <div className="text-sm font-medium">better-demo</div>
          <div className="space-y-3">
            <h2 className="text-4xl font-semibold tracking-tight text-wrap balance">
              Create your account in minutes
            </h2>
            <p className="text-white/80 leading-relaxed">
              Sign up with email and password. You'll be redirected to the
              dashboard after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
