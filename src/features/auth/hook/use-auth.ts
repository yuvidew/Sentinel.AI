"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { signIn, signUp } from "@/lib/auth-client";

/** Validation schema for the login form */
const loginSchema = z.object({
    /** User's email address */
    email: z.string().email("Please enter a valid email"),
    /** User's password — must start uppercase, contain a number and special char */
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^[A-Z]/, "Password must start with an uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            "Password must contain at least one special character",
        ),
});

/** Validation schema for the signup form */
const signupSchema = z.object({
    /** User's display name */
    name: z.string().min(1, "Name is required"),
    /** User's email address */
    email: z.string().email("Please enter a valid email"),
    /** User's password — must start uppercase, contain a number and special char */
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .regex(/^[A-Z]/, "Password must start with an uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
            /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
            "Password must contain at least one special character",
        ),
});

/** Inferred type for login form values */
export type LoginValues = z.infer<typeof loginSchema>;
/** Inferred type for signup form values */
export type SignupValues = z.infer<typeof signupSchema>;

/** Hook that manages login form state, validation, and submission logic */
export const useLogin = () => {
    const router = useRouter();
    /** Toggle for password field visibility */
    const [showPassword, setShowPassword] = useState(false);
    /** Loading state for the Google OAuth sign-in button */
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    /** React Hook Form instance configured with zod login schema */
    const form = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    /** Handles email/password login submission */
    async function onSubmit(data: LoginValues) {
        try {
            const result = await signIn.email({
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                toast.error(result.error.message ?? "Invalid credentials");
                return;
            }

            toast.success("Signed in successfully");
            router.push("/");
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    }

    /** Initiates Google OAuth sign-in flow */
    async function handleGoogleSignIn() {
        setIsGoogleLoading(true);
        try {
            await signIn.social({ provider: "google", callbackURL: "/" });
        } catch {
            toast.error("Something went wrong with Google sign in.");
            setIsGoogleLoading(false);
        }
    }

    return {
        form,
        showPassword,
        setShowPassword,
        isGoogleLoading,
        onSubmit,
        handleGoogleSignIn,
    };
};

/** Hook that manages signup form state, validation, and submission logic */
export const useSignup = () => {
    const router = useRouter();
    /** Toggle for password field visibility */
    const [showPassword, setShowPassword] = useState(false);
    /** Loading state for the Google OAuth sign-in button */
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    /** React Hook Form instance configured with zod signup schema */
    const form = useForm<SignupValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { name: "", email: "", password: "" },
    });

    /** Handles email/password signup submission */
    async function onSubmit(data: SignupValues) {
        try {
            const result = await signUp.email({
                name: data.name,
                email: data.email,
                password: data.password,
            });

            if (result.error) {
                toast.error(result.error.message ?? "Failed to create account");
                return;
            }

            toast.success("Account created successfully");
            router.push("/");
        } catch {
            toast.error("Something went wrong. Please try again.");
        }
    }

    /** Initiates Google OAuth sign-in flow */
    async function handleGoogleSignIn() {
        setIsGoogleLoading(true);
        try {
            await signIn.social({ provider: "google", callbackURL: "/" });
        } catch {
            toast.error("Something went wrong with Google sign in.");
            setIsGoogleLoading(false);
        }
    }

    return {
        form,
        showPassword,
        setShowPassword,
        isGoogleLoading,
        onSubmit,
        handleGoogleSignIn,
    };
};