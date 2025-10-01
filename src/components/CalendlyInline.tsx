// CalendlyInline.tsx
import { InlineWidget } from "react-calendly";

export default function CalendlyInline() {
  return (
    <div style={{ display: "grid", placeItems: "center", padding: 16 }}>
      <InlineWidget
        url="https://calendly.com/saima-ahmed-2528/30min"
        styles={{ height: "700px", minWidth: "320px", width: "100%" }}
        // Optional appearance tweaks:
        pageSettings={{
          backgroundColor: "0a0f1f", // hex without #
          primaryColor: "0ea5e9",
          textColor: "ffffff",
          hideGdprBanner: true,
        }}
        // Optional: prefill fields, utm, locale, etc.
        // prefill={{ email: "guest@email.com", name: "Guest" }}
        // utm={{ source: "site", medium: "inline-widget" }}
      />
    </div>
  );
}
