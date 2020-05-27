import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { Action } from "redux";

type GridEditorThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export default GridEditorThunk;