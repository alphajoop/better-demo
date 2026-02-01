'use client';

import { CheckCircle, LogOut, Mail, Shield, User, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Spinner } from '@/components/ui/spinner';
import { authClient } from '@/lib/auth-client';

export default function Dashboard() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!session && !isPending) {
      router.push('/sign-in');
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Signed out successfully');
            router.push('/sign-in');
          },
        },
      });
    } catch (_error) {
      toast.error('Failed to sign out');
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <Spinner className="h-6 w-6" aria-hidden="true" />
          <span className="text-lg">Loading…</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex items-center space-x-2">
          <Spinner className="h-6 w-6" aria-hidden="true" />
          <span className="text-lg">Redirecting…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image || undefined}
                    alt={`${session.user.name || session.user.email} avatar`}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) ||
                      session.user.email?.charAt(0) ||
                      'U'}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">
                  {session.user.name || session.user.email}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                aria-label="Sign out"
              >
                <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0 space-y-6">
          {/* Welcome Section */}
          <section aria-labelledby="welcome-heading">
            <div className="space-y-2">
              <h2
                id="welcome-heading"
                className="text-3xl font-bold tracking-tight text-wrap balance"
              >
                Welcome back, {session.user.name || 'User'}!
              </h2>
              <p className="text-muted-foreground">
                Here's your account information and session details.
              </p>
            </div>
          </section>

          {/* User Information Card */}
          <section aria-labelledby="user-info-heading">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" aria-hidden="true" />
                  <span>User Information</span>
                </CardTitle>
                <CardDescription>
                  Your personal account details and verification status.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-muted-foreground wrap-break-word">
                          {session.user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <User
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium">Name</p>
                        <p className="text-sm text-muted-foreground">
                          {session.user.name || 'Not set'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Shield
                        className="h-4 w-4 text-muted-foreground"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-sm font-medium">Email Verified</p>
                        <div className="flex items-center space-x-2">
                          {session.user.emailVerified ? (
                            <Badge variant="default" className="bg-green-500">
                              <CheckCircle
                                className="mr-1 h-3 w-3"
                                aria-hidden="true"
                              />
                              Verified
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <XCircle
                                className="mr-1 h-3 w-3"
                                aria-hidden="true"
                              />
                              Not Verified
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    {session.user.image && (
                      <div className="flex items-center space-x-3">
                        <User
                          className="h-4 w-4 text-muted-foreground"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-medium">Profile Image</p>
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={session.user.image}
                              alt="Profile picture"
                            />
                            <AvatarFallback>
                              {session.user.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Session Information Card */}
          <section aria-labelledby="session-info-heading">
            <Card>
              <CardHeader>
                <CardTitle>Session Information</CardTitle>
                <CardDescription>
                  Technical details about your current session.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <section
                  className="bg-muted/50 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre-wrap font-mono"
                  aria-label="Session data"
                >
                  {JSON.stringify(session, null, 2)}
                </section>
              </CardContent>
            </Card>
          </section>

          {/* Quick Actions */}
          <section aria-labelledby="actions-heading">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common actions you can perform with your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" aria-hidden="true" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Shield className="mr-2 h-4 w-4" aria-hidden="true" />
                  Security Settings
                </Button>
                <Button
                  variant="destructive"
                  className="w-full justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
