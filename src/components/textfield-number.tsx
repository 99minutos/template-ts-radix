import { TextField } from '@radix-ui/themes';
import { ChangeEvent, forwardRef, useMemo, useState } from 'react';

const numberFormatter = Intl.NumberFormat('es-MX', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Definir explícitamente los tipos de propiedades aceptados por TextField.Root
type TextFieldRootProps = React.ComponentPropsWithoutRef<typeof TextField.Root>;

const TextFieldNumber = forwardRef<HTMLInputElement, TextFieldRootProps>((props) => {
  const [value, setValue] = useState(props.value || 0);

  function handleChange(
    realChangeFn: React.ChangeEventHandler<HTMLInputElement> | undefined,
    formattedValue: string,
  ) {
    const digits = formattedValue.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    setValue(realValue);

    if (realChangeFn) {
      // Crear un evento sintético para evitar el error de tipo
      const syntheticEvent = {
        target: { value: realValue },
      } as unknown as ChangeEvent<HTMLInputElement>;

      realChangeFn(syntheticEvent);
    }
  }

  const formattedValue = useMemo(() => {
    return numberFormatter.format(Number(value));
  }, [value]);

  // Separar las propiedades válidas para TextField.Root
  // Omitir propiedades específicas de input HTML que no son compatibles
  const { onChange, children, className, ...textFieldProps } = props;

  return (
    <TextField.Root
      {...textFieldProps}
      value={formattedValue}
      onChange={(ev: ChangeEvent<HTMLInputElement>) => {
        handleChange(onChange, ev.target.value);
      }}
      className={`currency-field ${className}`}
    >
      {children}
    </TextField.Root>
  );
});

export default TextFieldNumber;
