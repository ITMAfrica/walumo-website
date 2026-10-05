/** Typewriter timing, shared by the client headline and the server hero (to delay what follows). */
export const TYPE_MS = 32;
export const TYPE_START = 350;
export const TYPE_PAUSE = 260;

export function typedDuration(title: string, accent?: string) {
  return TYPE_START + (title.length + (accent?.length ?? 0)) * TYPE_MS + (accent ? TYPE_PAUSE : 0);
}
