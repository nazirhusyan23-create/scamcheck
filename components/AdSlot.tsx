/**
 * AdSlot marks a designated, non-intrusive advertising placement zone.
 *
 * This component renders NOTHING that looks like an ad until real AdSense
 * code is added (see ADSENSE-READINESS.md). It never mimics a button or
 * navigation element, and it never overlaps the main checker tool.
 *
 * To activate real ads: once your AdSense account/site is approved, place
 * your <ins class="adsbygoogle"> unit + script inside the marked area below,
 * gated by NEXT_PUBLIC_ADSENSE_CLIENT_ID being set.
 */
export default function AdSlot({
  placement,
  className = "",
}: {
  placement: "header" | "in-content" | "sidebar" | "footer";
  className?: string;
}) {
  const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

  if (!adsenseClientId) {
    // No ad network configured yet: render an empty, unobtrusive reserved
    // space (not a fake ad graphic) so layout stays stable once ads are on.
    return (
      <div
        data-ad-placement={placement}
        aria-hidden="true"
        className={`hidden ${className}`}
      />
    );
  }

  // Real AdSense unit renders here once NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
  // See ADSENSE-READINESS.md for the exact <ins> markup and script tag.
  return (
    <div data-ad-placement={placement} className={`w-full text-center ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adsenseClientId}
        data-ad-slot=""
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
