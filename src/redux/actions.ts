export const SET_USER_TYPE = 'SET_USER_TYPE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SET_LOADING = 'SET_LOADING';

export const setUserType = (userType: string) =>({
    type: SET_USER_TYPE,
    payload: userType,
})

export const setCurrentUser = (user: any) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setLoading = (loading: boolean) => ({
  type: SET_LOADING,
  payload: loading,
});