import { useState } from "react";
import type { Route } from "./+types/home";
import { useNavigate, useOutletContext } from "react-router";
import type { AppContextType } from "~/root";
import { LogoAndTitle } from "~/components/home/LogoAndTitle";
import { SignInForm } from "~/components/home/SignInForm";
import { SignUpForm } from "~/components/home/SignUpForm";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Message App - Login" },
    { name: "description", content: "Login to Message App!" },
  ];
}

export default function Home() {
  const { authService } = useOutletContext<AppContextType>();

  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [signinEmail, setSigninEmail] = useState("");
  const [signinPassword, setSigninPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupUrl, setSignupUrl] = useState("");

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.signin({
        email: signinEmail,
        password: signinPassword,
      });
      setSuccess("Successfully signed in!");

      setTimeout(() => {
        navigate("/messages");
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authService.signup({
        email: signupEmail,
        password: signupPassword,
        username: signupUsername,
        name: signupName,
        url: signupUrl || undefined,
      });
      setSuccess("Successfully signed up! Please sign in.");
      setIsSignup(false);
      setSignupEmail("");
      setSignupPassword("");
      setSignupUsername("");
      setSignupName("");
      setSignupUrl("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-200 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <LogoAndTitle isSignup={isSignup} />

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setIsSignup(false)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition duration-200 ${
                !isSignup
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignup(true)}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition duration-200 ${
                isSignup
                  ? "bg-white text-orange-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              {success}
            </div>
          )}

          <SignInForm
            isSignup={isSignup}
            handleSignin={handleSignin}
            signinEmail={signinEmail}
            setSigninEmail={setSigninEmail}
            signinPassword={signinPassword}
            setSigninPassword={setSigninPassword}
            loading={loading}
          />

          <SignUpForm
            isSignup={isSignup}
            handleSignup={handleSignup}
            signupEmail={signupEmail}
            setSignupEmail={setSignupEmail}
            signupPassword={signupPassword}
            setSignupPassword={setSignupPassword}
            signupUsername={signupUsername}
            setSignupUsername={setSignupUsername}
            signupName={signupName}
            setSignupName={setSignupName}
            signupUrl={signupUrl}
            setSignupUrl={setSignupUrl}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
