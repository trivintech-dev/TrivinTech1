import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import api from "../../api/api.js";
import { Button, Field, Input } from "./AdminUI.jsx";

const ImageUpload = ({
  value,
  publicId,
  onChange,
  uploadUrl = "/portfolio/upload-image",
  label = "Image",
  hint
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      const { data } = await api.post(uploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      onChange({ imageUrl: data.imageUrl, imagePublicId: data.imagePublicId });
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const clear = () => onChange({ imageUrl: "", imagePublicId: "" });

  return (
    <div className="space-y-3">
      <Field label={label} hint={hint}>
        <div className="flex flex-col gap-3">
          {value ? (
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-700">
              <img src={value} alt="Preview" className="h-44 w-full object-cover" />
              <button
                type="button"
                onClick={clear}
                className="absolute right-2 top-2 inline-flex items-center gap-1 rounded-lg bg-black/70 px-2.5 py-1.5 text-xs font-semibold text-white transition hover:bg-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-600 bg-slate-900/40 text-slate-400 transition hover:border-cyan-400/50 hover:text-cyan-300"
            >
              {uploading ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
              <span className="text-sm">{uploading ? "Uploading..." : "Click to upload an image"}</span>
            </button>
          )}
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
          {!value && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              loading={uploading}
            >
              Choose file
            </Button>
          )}
        </div>
      </Field>
      <Field label="Or paste an image URL">
        <Input
          value={value || ""}
          placeholder="https://..."
          onChange={(event) => onChange({ imageUrl: event.target.value, imagePublicId: publicId })}
        />
      </Field>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
};

export default ImageUpload;
