import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const _someAuthenticatedAction = async () => {
  'use server';
  const _session = await auth.api.getSession({
    headers: await headers(),
  });
};
