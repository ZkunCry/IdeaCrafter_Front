import { useMutation } from "@tanstack/react-query";
import { AuthCredentials, AuthService } from "../api/authApi";
export function useSignUp() {
  return useMutation({
    mutationFn: (data: AuthCredentials) => AuthService.signUp(data),
  });
}
