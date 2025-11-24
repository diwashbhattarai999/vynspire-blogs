import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";
import { env } from "@/env/client";

export const GoogleAuthButton = () => (
  <Button asChild className="w-full" type="button" variant="outline">
    <a href={`${env.NEXT_PUBLIC_API_URL}/api/v0/auth/google`}>
      <Icon.Google />
      Sign in with Google
    </a>
  </Button>
);

export const FacebookAuthButton = () => (
  <Button asChild className="w-full" type="button" variant="outline">
    <a href={`${env.NEXT_PUBLIC_API_URL}/api/v0/auth/facebook`}>
      <Icon.Facebook />
      Sign in with Facebook
    </a>
  </Button>
);
