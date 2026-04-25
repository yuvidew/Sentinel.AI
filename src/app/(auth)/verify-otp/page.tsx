import { VerifyOtpForm } from "@/features/auth/_components/verify-otp-form";
import { requireUnAuth } from "@/lib/auth-utils";

export const metadata = {
    title: "Verify OTP — Sentinel.AI",
    description: "Enter the verification code sent to your email",
};

export default async function VerifyOtpPage() {
    await requireUnAuth();
    return <VerifyOtpForm />;
}
