"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { emailOtp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { ShieldCheck, Loader2, ArrowLeft } from "lucide-react";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60; // seconds

export function VerifyOtpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") ?? "";

    const [otp, setOtp] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(RESEND_COOLDOWN);

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            router.replace("/forgot-password");
        }
    }, [email, router]);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleVerify = useCallback(async (code: string) => {
        if (code.length !== OTP_LENGTH) return;

        setIsVerifying(true);
        try {
            // Store OTP + email in sessionStorage for the reset-password page
            sessionStorage.setItem("reset-email", email);
            sessionStorage.setItem("reset-otp", code);

            toast.success("Code verified successfully");
            router.push("/reset-password");
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsVerifying(false);
        }
    }, [email, router]);

    // Auto-submit when OTP is complete
    useEffect(() => {
        if (otp.length === OTP_LENGTH) {
            handleVerify(otp);
        }
    }, [otp, handleVerify]);

    async function handleResend() {
        setIsResending(true);
        try {
            const result = await emailOtp.requestPasswordReset({
                email,
            });

            if (result.error) {
                toast.error(result.error.message ?? "Failed to resend code");
                return;
            }

            toast.success("New verification code sent");
            setOtp("");
            setCountdown(RESEND_COOLDOWN);
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsResending(false);
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <Card>
            <CardHeader className="text-center">
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Check your email</CardTitle>
                <CardDescription>
                    We sent a 6-digit code to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
                <InputOTP
                    maxLength={OTP_LENGTH}
                    value={otp}
                    onChange={setOtp}
                    disabled={isVerifying}
                >
                    <InputOTPGroup>
                        {Array.from({ length: OTP_LENGTH }).map((_, i) => (
                            <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
                        ))}
                    </InputOTPGroup>
                </InputOTP>

                {isVerifying && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying...
                    </div>
                )}

                <div className="flex flex-col items-center gap-2">
                    {countdown > 0 ? (
                        <p className="text-sm text-muted-foreground">
                            Resend code in{" "}
                            <span className="font-medium text-foreground">
                                {formatTime(countdown)}
                            </span>
                        </p>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleResend}
                            disabled={isResending}
                        >
                            {isResending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Resend code
                        </Button>
                    )}
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <Link
                    href="/forgot-password"
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Use a different email
                </Link>
            </CardFooter>
        </Card>
    );
}
