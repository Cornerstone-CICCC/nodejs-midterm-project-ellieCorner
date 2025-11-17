type Props = {
  isSignup: boolean;
  handleSignup: (e: React.FormEvent) => Promise<void>;
  signupEmail: string;
  setSignupEmail: (email: string) => void;
  signupPassword: string;
  setSignupPassword: (password: string) => void;
  signupUsername: string;
  setSignupUsername: (username: string) => void;
  signupName: string;
  setSignupName: (name: string) => void;
  signupUrl: string;
  setSignupUrl: (url: string) => void;
  loading: boolean;
};

export const SignUpForm = ({
  isSignup,
  handleSignup,
  signupEmail,
  setSignupEmail,
  signupPassword,
  setSignupPassword,
  signupUsername,
  setSignupUsername,
  signupName,
  setSignupName,
  signupUrl,
  setSignupUrl,
  loading,
}: Props) => {
  return (
    isSignup && (
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label
            htmlFor="signup-username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Username
          </label>
          <input
            id="signup-username"
            type="text"
            value={signupUsername}
            onChange={(e) => setSignupUsername(e.target.value)}
            placeholder="johndoe"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="signup-name"
            type="text"
            value={signupName}
            onChange={(e) => setSignupName(e.target.value)}
            placeholder="John Doe"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <div>
          <label
            htmlFor="signup-password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            placeholder="••••••••"
            required
            minLength={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="mt-1 text-xs text-gray-500">
            Must be at least 6 characters
          </p>
        </div>

        <div>
          <label
            htmlFor="signup-url"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Profile Image URL (Optional)
          </label>
          <input
            id="signup-url"
            type="url"
            value={signupUrl}
            onChange={(e) => setSignupUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform disabled:transform-none disabled:cursor-not-allowed"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    )
  );
};
