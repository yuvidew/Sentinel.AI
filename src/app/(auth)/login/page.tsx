import { LoginForm } from '@/features/auth/_components/login-form';
import { requireUnAuth } from "@/lib/auth-utils";


export const metadata = {
    title: "Login — Sentinel.AI",
    description: "Sign in to your Sentinel.AI account",
};

export default async function LoginPage() {
    await requireUnAuth();
    return <LoginForm />;
}
