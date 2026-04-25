"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const DashboardPage = () => {
    const router = useRouter();

    async function handleLogout() {
        await signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast.success("Signed out successfully");
                    router.push("/login");
                },
                onError: () => {
                    toast.error("Failed to sign out");
                },
            },
        });
    }

    return (
        <div className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
            </Button>
        </div>
    );
};

export default DashboardPage;