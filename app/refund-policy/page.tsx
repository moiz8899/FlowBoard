import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Refund Policy",
  description: "FlowBoard refund policy for digital dashboard templates."
};

export default function RefundPolicyPage() {
  return (
    <LegalPage
      eyebrow="Refund Policy"
      title="Refund Policy"
      intro="FlowBoard sells downloadable digital dashboard templates. This policy explains how refund requests are handled."
      sections={[
        {
          title: "30-Day Refund Window",
          body: [
            "You may request a refund within 30 days of purchase if the template is defective, materially different from its product description, or cannot be accessed after reasonable support attempts.",
            "Because the products are digital source files, refund requests may be declined where the product has been successfully delivered and substantially matches the product description."
          ]
        },
        {
          title: "How to Request a Refund",
          body: [
            "Email dialyn360@gmail.com with your order email, product name, order reference, and a short explanation of the issue.",
            "If payment was processed by Paddle, the refund may also be processed through Paddle according to their shopper support process."
          ]
        },
        {
          title: "Processing Time",
          body: [
            "Approved refunds are usually submitted within 5 business days. Your bank, card provider, PayPal, or payment method may take additional time to post the refund."
          ]
        }
      ]}
    />
  );
}
