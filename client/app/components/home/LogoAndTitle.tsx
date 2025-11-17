type Props = {
  isSignup: boolean;
};

export const LogoAndTitle = ({ isSignup }: Props) => {
  return (
    <div className="text-center mb-8">
      <div className="text-7xl mb-4">🏫</div>
      <h1 className="text-3xl font-bold text-gray-900">School Open Forum</h1>
      <p className="text-gray-600 mt-2">
        {isSignup ? "Create your account" : "Welcome back"}
      </p>
    </div>
  );
};
