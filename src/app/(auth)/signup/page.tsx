import { SignupForm } from '@/features/auth/_components/signup-form';
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = {
  title: "Sign Up — Sentinel.AI",
  description: "Create your Sentinel.AI account",
};

export default async function SignupPage() {
     await requireUnAuth();
  return <SignupForm />;
}
