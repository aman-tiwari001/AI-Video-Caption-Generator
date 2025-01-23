import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center mt-[67.2px] h-[calc(100vh-67.2px)]">
      <SignUp
        forceRedirectUrl={'/generate-caption'}
        appearance={{ variables: { colorPrimary: '#ED4677' } }}
      />
    </div>
  );
};

export default SignUpPage;
