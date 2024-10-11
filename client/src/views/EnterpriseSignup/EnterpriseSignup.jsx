import { EnterpriseSignupForm } from '@/components/EnterpriseSignupForm/EnterpriseSignupForm';

export const EnterpriseSignup = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <header className="sr-only">
        <h1>Registra tu empresa</h1>
      </header>
      <main className="mx-auto w-full max-w-3xl">
        <EnterpriseSignupForm />
      </main>
    </div>
  );
};
