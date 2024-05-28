const audioCache = new Map<string, () => Promise<void>>();

export async function playSoundFromUrl(url: string) {
  let doPlay = audioCache.get(url);

  if (!doPlay) {
    // Wait for an audio file to load
    const canPlayPromise = new Promise<HTMLAudioElement>((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener('canplaythrough', () => resolve(audio), {
        once: true,
      });
    });

    doPlay = async () => {
      const audio = await canPlayPromise;
      await audio.play();
    };

    // Save to cache
    audioCache.set(url, doPlay);
  }

  await doPlay();
}