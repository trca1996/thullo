import { ChangeEvent, useState } from "react";

const useForm = (initState: any) => {
  const [state, setState] = useState(initState);

  return {
    state,
    handleChange: (e: ChangeEvent<HTMLInputElement>) => {
      setState((curr: any) => ({ ...curr, [e.target.name]: e.target.value }));
    },
  };
};

export default useForm;
