import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Digital Delivery",
  description: "FlowBoard digital delivery policy."
};

export default function DeliveryPage() {
  return (
    <LegalPage
      eyebrow="Delivery"
      title="Digital Delivery Policy"
      intro="FlowBoard products are delivered digitally. No physical shipping is provided."
      sections={[
        {
          title: "Delivery Method",
          body: [
            "After a successful payment, the buyer receives access to the purchased dashboard ZIP file through the checkout provider or a secure download link.",
            "The ZIP file may include HTML, CSS, JavaScript, images, documentation, and related assets required by the template."
          ]
        },
        {
          title: "Delivery Time",
          body: [
            "Digital delivery is intended to be instant after payment confirmation. In some cases, fraud review, payment method delays, or email filtering may delay access.",
            "If you do not receive access after purchase, email dialyn360@gmail.com with your order details."
          ]
        },
        {
          title: "No Shipping",
          body: [
            "FlowBoard does not ship physical goods. Shipping fees do not apply to dashboard template purchases."
          ]
        }
      ]}
    />
  );
}
