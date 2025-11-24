import { Icon } from "@/components/shared/icon";
import { Button } from "@/components/ui/button";

export const GoogleAuthButton = () => (
  <Button className="w-full relative" type="button" variant="outline" disabled>
    <Icon.Google />
    Sign in with Google
    <p className="absolute top-1/2 -translate-y-1/2 bg-amber-500/10 rounded-sm px-2 py-px right-4 text-[10px] border border-amber-500/20 text-amber-500">
      Coming soon
    </p>
  </Button>
);

export const FacebookAuthButton = () => (
  <Button className="w-full relative" type="button" variant="outline" disabled>
    <Icon.Facebook />
    Sign in with Facebook
    <p className="absolute top-1/2 -translate-y-1/2 bg-amber-500/10 rounded-sm px-2 py-px right-4 text-[10px] border border-amber-500/20 text-amber-500">
      Coming soon
    </p>
  </Button>
);
