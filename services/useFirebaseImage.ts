import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/FirebaseConfig";

export function useFirebaseImage(imagePath: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;
    //  Reset state when imagePath changes
    setUrl(null);
    setError(null);
    setLoading(true);

    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imagePath);
        const downloadUrl = await getDownloadURL(imageRef);
        if (!cancelled) setUrl(downloadUrl);
      } catch (err: any) {
        if (!cancelled) setError(err as Error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchImage();

    return () => {
      cancelled = true;
    };
  }, [imagePath]);

  return { url, loading, error };
}

