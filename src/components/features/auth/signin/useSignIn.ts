import { useMutation } from "@tanstack/react-query";
import { AuthService, type AuthCredentials } from "../api/authApi";

export function useSignIn() {
  return useMutation({
    mutationFn: (data: AuthCredentials) => AuthService.signIn(data),
  });
}
