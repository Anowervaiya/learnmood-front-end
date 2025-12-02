
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import LoginForm from '@/components/modules/public/LoginForm';

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
    const params = (await searchParams) || {};
  return (
    <div className=" py-8">
      <div className="max-w-5xl mx-auto ">
        <div className={cn('flex flex-col gap-6')}>
          <Card className="overflow-hidden p-8">
            <CardContent className="grid p-0 md:grid-cols-2">
                  <div className="bg-muted relative hidden md:block">
                <img
                  src="login.jpg"
                  alt="Image"
                  className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
               <LoginForm redirect={params.redirect} />

          
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;