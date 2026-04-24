/**
 * Opening a `t.me/...` link in a new tab on iOS causes a bug: after the
 * universal link hands off to the Telegram app, the back gesture returns
 * to the now-blank tab instead of the current page. Workaround: same-tab
 * navigation on iOS (Safari restores the original page), new tab elsewhere.
 */
export function openTelegramLink(url: string): void {
  if (typeof window === "undefined") return;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (isIOS) {
    window.location.href = url;
  } else {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}
