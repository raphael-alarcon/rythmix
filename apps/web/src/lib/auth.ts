import { tuyau } from "./constants";

export const getUser = async () => {
	return await tuyau.auth.me.$get().unwrap();
};

export const login = async () => {
	return await tuyau.auth.redirect.$get().unwrap();
}

export const logout = async () => {
	return await tuyau.auth.logout.$get().unwrap();
}
