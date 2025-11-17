type Props = {
  isSignup: boolean;
  handleSignin: (e: React.FormEvent) => Promise<void>;
  signinEmail: string;
  setSigninEmail: (email: string) => void;
  signinPassword: string;
  setSigninPassword: (password: string) => void;
  loading: boolean;
};

export const SignInForm = ({
  isSignup,
  handleSignin,
  signinEmail,
  setSigninEmail,
  signinPassword,
  setSigninPassword,
  loading,
}: Props) => {
  return (
    !isSignup && (
      <form onSubmit={handleSignin} className="space-y-4">
        <div>
          <label
            htmlFor="signin-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="signin-email"
            type="email"
            value={signinEmail}
            onChange={(e) => setSigninEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            value={signinPassword}
            onChange={(e) => setSigninPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    )
  );
};
