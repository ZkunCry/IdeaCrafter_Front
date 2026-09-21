import { Suspense } from "react";
import SignIn from "@/src/components/features/auth/signin/SignIn";


export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignIn />
    </Suspense>
  );
}
