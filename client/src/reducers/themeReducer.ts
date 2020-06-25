interface ThemeAction {
  type: string,
  data: 'light' | 'dark'
}

function themeReducer(
  state: 'light' | 'dark' = 'light',
  action: ThemeAction,
) {
  switch (action.type) {
    case ('CHANGE_THEME'):
      return action.data;
    default:
      return state;
  }
}

export function toggleDarkMode(theme: 'light' | 'dark') {
  return {
    type: 'CHANGE_THEME',
    data: theme,
  };
}

export default themeReducer;
