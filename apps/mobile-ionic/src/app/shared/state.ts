import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user?: any;
}

export const reducers: ActionReducerMap<AppState> = {
  user: (state = null, action) => {
    switch (action.type) {
      case '[Auth] Login Success':
        return action.user;
      case '[Auth] Logout':
        return null;
      default:
        return state;
    }
  },
};
