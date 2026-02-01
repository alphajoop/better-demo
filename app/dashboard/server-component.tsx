import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

export async function ServerComponent() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>Not authenticated</div>;
  }
  return (
    <div>
      <h1>Welcome {session.user.name}</h1>
    </div>
  );
}
