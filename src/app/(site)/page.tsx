import Link from "next/link";

import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { routes } from "@/constants/routes";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="flex items-center justify-center gap-2">
        <Logo className="size-12" />
        <h1 className="text-2xl font-bold">Vynspire Blog</h1>
      </div>

      <div className="flex items-center justify-center gap-2">
        <Button asChild>
          <Link href={routes.AUTH.LOGIN}>Login</Link>
        </Button>

        <Button asChild>
          <Link href={routes.AUTH.REGISTER}>Register</Link>
        </Button>
      </div>
    </div>
  );
}
