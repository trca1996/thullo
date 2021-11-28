import { loaded, loading } from "../store/actions/loadingActions";
import { errorMessage } from "../store/actions/statusMessageActions";

const asyncActionFn = async (
  fn: () => void,
  dispatch: any,
  setErrorMessage: boolean = true
) => {
  try {
    dispatch(loading);

    await fn();
  } catch (err: any) {
    setErrorMessage && dispatch(errorMessage(err.response.data.message));
  }
  dispatch(loaded);
};

export default asyncActionFn;
