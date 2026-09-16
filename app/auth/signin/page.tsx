import { Suspense } from "react";
import SignIn from "@/src/components/features/auth/signin/SignIn";

// The form reads ?reason= and ?redirect= through useSearchParams, which needs a
// Suspense boundary or the whole route bails out of prerendering.
export default function SignInPage() {
  return (
    <Suspense fallback={null}>
      <SignIn />
    </Suspense>
  );
}
