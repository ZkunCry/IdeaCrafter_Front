"use client";

import { Upload, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "../../ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
} from "../../ui/file-upload";

export function FileUploader({
  onFileSelect,
}: {
  onFileSelect: (file: File | null) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  const onFileValidate = useCallback(
    (file: File): string | null => {
      if (files.length >= 1) {
        return "Вы можете загрузить только одно изображение";
      }

      if (!file.type.startsWith("image/")) {
        return "Поддерживаются только изображения";
      }

      const MAX_SIZE = 2 * 1024 * 1024; // 2MB
      if (file.size > MAX_SIZE) {
        return `Размер изображения должен быть меньше чем ${
          MAX_SIZE / (1024 * 1024)
        }MB`;
      }

      return null;
    },
    [files]
  );

  const onFileReject = useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" запрос был отклонен`,
    });
  }, []);
  useEffect(() => {
    onFileSelect(files.length > 0 ? files[0] : null);
  }, [files]);
  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onFileValidate={onFileValidate}
      onFileReject={onFileReject}
      accept="image/*"
      maxFiles={2}
      className="w-full max-w-md"
      multiple
    >
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Перенесите файлы сюда</p>
          <p className="text-muted-foreground text-xs">
            Или кликните чтобы выбрать (максимально одно изображение)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Просмотр файлов
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>
      <FileUploadList>
        {files.map((file) => (
          <FileUploadItem key={file.name} value={file}>
            <FileUploadItemPreview />
            <FileUploadItemMetadata />
            <FileUploadItemDelete asChild>
              <Button variant="ghost" size="icon" className="size-7">
                <X />
              </Button>
            </FileUploadItemDelete>
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
