import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { RootState } from '../store';

type GridEditorThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;

export default GridEditorThunk;
