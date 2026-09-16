"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/src/components/ui/button";
import { getApiErrorMessage } from "@/src/lib/api-error";

import StartupForm from "../create/StartupForm";
import { startupToFormValues } from "../create/schema";
import { useUpdateStartup } from "../create/useStartup";
import type { Startup, StartupFormValues } from "../types";

export default function EditStartupSection({ startup }: { startup: Startup }) {
  const router = useRouter();
  const { mutateAsync: updateStartup, isPending } = useUpdateStartup(
    startup.id,
  );

  const onSubmit = async (values: StartupFormValues) => {
    try {
      await updateStartup(values);
      toast.success("Изменения сохранены");

      router.refresh();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Не удалось сохранить изменения"));
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold">Информация о стартапе</h3>
          <p className="text-sm text-muted-foreground">
            Изменения сразу появятся на публичной странице проекта.
          </p>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/startup/${startup.id}`}>
            <ExternalLink className="h-4 w-4" />
            Открыть страницу
          </Link>
        </Button>
      </div>

      <StartupForm
        defaultValues={startupToFormValues(startup)}
        onSubmit={onSubmit}
        isPending={isPending}
        submitLabel="Сохранить изменения"
        pendingLabel="Сохраняем..."
        currentLogoUrl={startup.logo_url || undefined}
      />
    </div>
  );
}
