import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUsers, updateUser, deleteUser } from "../features/usersSlice";
import { AppDispatch, RootState } from "../store";
import { UserType } from "../apis/userApi/types";

export const useGetUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.users.users);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const filters = useSelector((state: RootState) => state.users.filters);

  const refetch = () => {
    dispatch(getUsers({ filter: filters }));
  };

  useEffect(() => {
    dispatch(getUsers({ filter: filters }));
  }, [dispatch, filters]);

  return { data: users, isLoading: loading, isError: error, refetch };
};

export const useUpdateUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.users.updateLoading);
  const error = useSelector((state: RootState) => state.users.updateError);

  const updateUserHandler = async (data: UserType) => {
    return await dispatch(updateUser({ user: data })).unwrap();
  };

  return { updateUser: updateUserHandler, isLoading: loading, isError: error };
};

export const useDeleteUser = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.users.deleteLoading);
  const error = useSelector((state: RootState) => state.users.deleteError);

  const deleteUserHandler = async (id: string) => {
    return await dispatch(deleteUser({ id })).unwrap();
  };

  return { deleteUser: deleteUserHandler, isLoading: loading, isError: error };
};
