"use client"
import LoginForm from "@/components/auth-ui/login-form";

const LoginPage = () => {

  const handleLogin = async (formData : FormData) => {
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    if (!res.ok) {
      const error = await res.json();
      console.error("Login failed:", error);
      return;
    }
    const response = await res.json();
    console.log("Login successful:", response);
  }

  return (
    <div className="max-w-96 w-full">
      <LoginForm handleLogin={handleLogin}/>
    </div>
  )
}

export default LoginPage;
