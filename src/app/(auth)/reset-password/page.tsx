import { ResetPasswordForm } from "@/features/auth/_components/reset-password-form";
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = {
    title: "Reset Password — Sentinel.AI",
    description: "Set your new password",
};

export default async function ResetPasswordPage() {
    await requireUnAuth();
    return <ResetPasswordForm />;
}
