import { ForgotPasswordForm } from "@/features/auth/_components/forgot-password-form";
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = {
    title: "Forgot Password — Sentinel.AI",
    description: "Reset your Sentinel.AI password",
};

export default async function ForgotPasswordPage() {
    await requireUnAuth();
    return <ForgotPasswordForm />;
}
