import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import LoginForm from '@/components/modules/auth/LoginForm';

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="flex justify-center items-center gap-16 space-y-4">
          {/* Left Column: Image */}
          <div className="hidden md:block relative">
            <h1 className='text-6xl font-bold text-blue-600 dark:text-white'>Learnmood</h1>
            <p>A social space to learn, share, and <br /> inspire the world together.</p>
          </div>

          {/* Right Column: Login Form */}
          <div className="flex flex-col justify-center">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
                Welcome Back
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                Enter your credentials to access your account
              </p>
            </div>

            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8">
                <LoginForm redirect={params.redirect} />
              </CardContent>
            </Card>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              By clicking continue, you agree to our{' '}
              <a href="#" className="underline hover:text-blue-600">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="underline hover:text-blue-600">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
