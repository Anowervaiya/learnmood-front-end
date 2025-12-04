
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import SignUpForm from '@/components/modules/auth/SignUpForm';

const SignUp=() =>{
  return (
    <div className=" py-8">
                  <h1 className='text-6xl text-center mb-8 font-bold text-blue-600 dark:text-white'>Learnmood</h1>

      <div className="max-w-xl shadow-2xl  p-4 rounded-lg mx-auto ">

        <div>
        

              <SignUpForm />
          
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            By clicking continue, you agree to our{' '}
            <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
export default SignUp;