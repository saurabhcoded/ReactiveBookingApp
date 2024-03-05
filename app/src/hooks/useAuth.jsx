import { setAuthTokenAction, setUserDataAction, setUserPermissionAction } from "@/store/features/user/userSlice";
import { useCallback } from "react";
import { getUserSync } from "@/store/features/user/userActions";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const user = useSelector((state) => state?.user || {});
  const dispatch = useDispatch();

  /* Function to set userState */
  const setUserData = useCallback(
    (data) => {
      dispatch(setUserDataAction(data));
    },
    [user?.userData]
  );

  /* Function to set permissionState */
  const setUserPermission = useCallback(
    (data) => {
      dispatch(setUserPermissionAction(data));
    },
    [user?.permissions]
  );

  /* Function to set userState */
  const setAuthToken = useCallback(
    (token) => {
      dispatch(setAuthTokenAction(token));
    },
    [user?.authToken]
  );

  /* Auth Related Functions */
  const isAuthenticated = Boolean(user?.authToken);
  const userStatus = user?.userData?.status || null;

  /* Function to handle Sign out */
  const signOut = useCallback(() => {
    setUserData(null);
    setUserPermission(null);
    setAuthToken(null);
  }, [user?.userData, user?.authToken, user?.permissions]);

  /* Function to sync user details and permissions */
  const syncUser = useCallback(() => {
    // if (isAuthenticated) {
    console.log("Running Sync...");
    dispatch(getUserSync());
    // }
  }, [user?.userData, user?.authToken]);
  return { ...user, isAuthenticated, userStatus, setUserData, setUserPermission, setAuthToken, syncUser, signOut };
};

export default useAuth;
