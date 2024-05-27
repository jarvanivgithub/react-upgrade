import classNames from "classnames";
import React, { CSSProperties, FormEvent, ReactNode, forwardRef, useImperativeHandle, useRef, useState } from "react";
import FormContext from "./FormContext";

export interface FormProps extends React.HTMLAttributes<HTMLFormElement> {
  classNames?: string;
  style?: CSSProperties;
  onFinish?: (values: Record<string, any>) => void;
  onFinishFailed?: (errors: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  children?: ReactNode;
}

export interface FormRefApi {
  getFieldsValue: () => Record<string, any>;
  setFieldsValue: (values: Record<string, any>) => void;
}

const Form = forwardRef<FormRefApi, FormProps>((props: FormProps, ref) => {
  const {
    className,
    style,
    children,
    onFinish,
    onFinishFailed,
    initialValues,
    ...rest
  } = props;

  const [values, setValues] = useState<Record<string, any>>(initialValues || {});
  const refValues = useRef(values);
  refValues.current = values;

  useImperativeHandle(ref, () => {
    return {
      getFieldsValue() {
        return refValues.current;
      },
      setFieldsValue(fieldValues) {
        setValues({ ...refValues.current, ...fieldValues });
      }
    }
  }, []);

  const validatorMap = useRef(new Map<string, Function>());

  const errors = useRef<Record<string, any>>({});

  const onValueChange = (key: string, value: any) => {
    values[key] = value;
    console.log('values[key]', values[key])
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    for (let [key, callbackFunc] of validatorMap.current) {
      if (typeof callbackFunc === 'function') {
        errors.current[key] = callbackFunc();
      }
    }

    const errorList = Object.keys(errors.current).map(key => {
      return errors.current[key];
    }).filter(Boolean);
    if (errorList.length) {
      onFinishFailed?.(errors.current);
    } else {
      onFinish?.(values);
    }
  }

  const handleValidateRegister = (name: string, cb: Function) => {
    validatorMap.current.set(name, cb);
  }

  const cs = classNames('ant-form', className);

  return (
    <FormContext.Provider
      value={{
        onValueChange,
        values,
        setValues: (v) => setValues(v),
        validateRegister: handleValidateRegister
      }}
    >
      <form
        {...rest}
        className={cs}
        style={style}
        onSubmit={handleSubmit}
      >
        {children}
      </form>
    </FormContext.Provider>
  )
})

export default Form;