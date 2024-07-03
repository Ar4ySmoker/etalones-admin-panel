'use client'

// app/register/page.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Добавлено поле для username
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { status: sessionStatus } = useSession();

    useEffect(() => {
        if (sessionStatus === "authenticated") {
            router.replace("/dashboard");
        }
    }, [sessionStatus, router]);

    const isValidEmail = (email: string) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        }

        if (!password || password.length < 8) {
            setError("Password is invalid");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    username, // Включаем поле username в запрос
                }),
            });

            if (res.status === 400) {
                const { error } = await res.json();
                setError(error);
                setLoading(false);
                return;
            }

            if (res.status === 200) {
                router.push("/login");
            }
        } catch (error) {
            setError("Error, try again");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    if (sessionStatus === "loading") {
        return <h1>Loading...</h1>;
    }

    return (
        sessionStatus !== "authenticated" && (
            <div className="justify-center mt-16">
                <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-lg">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">Register</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="label">
                                <span className="text-base label-text">Name</span>
                            </label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Name"
                                required
                                className="w-full input input-bordered input-primary"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="label">
                                <span className="text-base label-text">Email</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Email Address"
                                required
                                className="w-full input input-bordered input-primary"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="label">
                                <span className="text-base label-text">Password</span>
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Enter Password"
                                required
                                className="w-full input input-bordered input-primary"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="username" className="label">
                                <span className="text-base label-text">Username</span>
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Username"
                                required
                                className="w-full input input-bordered input-primary"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        {error && <p className="text-red-600 text-[16px] mb-4">{error}</p>}
                    </form>
                    <div className="text-center text-gray-500 mt-4">- OR -</div>
                    <Link href="/login">
                        <p className="block text-center text-blue-500 hover:underline mt-2">
                            Login with an existing account
                        </p>
                    </Link>
                </div>
            </div>
        )
    );
};

export default Register;
