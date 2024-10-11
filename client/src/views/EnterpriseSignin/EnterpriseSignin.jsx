import { EnterpriseSigninForm } from '@/components/EnterpriseSigninForm/EnterpriseSigninForm';

export const EnterpriseSignin = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="sr-only">
        <h1>Inicia sesion como empresa</h1>
      </header>
      <main className="mx-auto w-full max-w-3xl">
        <EnterpriseSigninForm />
      </main>
    </div>
  );
};
