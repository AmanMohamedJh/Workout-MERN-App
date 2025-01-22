import { useAuthContext } from "./useAuthContext";
import { useWorkoutsContext } from "./useWorkoutsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useWorkoutsContext(); //this dispatch is used to completely logout from all global variables

  const logout = () => {
    //remove the user from the local storage // here we don't use the cookies as token only local storage

    localStorage.removeItem("user");

    //dispatch the logout from authcontext.js

    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };

  return { logout };
};
