/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { type UseFormReturn, FormProvider as Form } from 'react-hook-form';

/* -------------------------------------------------------------------------- */
/*                           FORM PROVIDER COMPONENT                          */
/* -------------------------------------------------------------------------- */
type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
};

function FormProvider({ children, methods, onSubmit }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};

export default FormProvider;