import { useEffect, useState } from "react";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "@/FirebaseConfig";

export function useFirebaseImage(imagePath: string) {
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    let isMounted = true;

    setLoading(true);
    const fetchImage = async () => {
      try {
        const imageRef = ref(storage, imagePath);
        const downloadUrl = await getDownloadURL(imageRef);
        if (isMounted) {
          setUrl(downloadUrl);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [imagePath]);

  return { url, loading, error };
}
