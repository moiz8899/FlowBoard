import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Terms",
  description: "FlowBoard terms for digital dashboard templates."
};

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Service"
      intro="These terms apply to your use of FlowBoard and purchases of digital dashboard templates."
      sections={[
        {
          title: "Digital Products",
          body: [
            "FlowBoard provides downloadable HTML, CSS, JavaScript, and related dashboard template files.",
            "Products are sold as digital templates for customization by developers, freelancers, founders, students, and small teams."
          ]
        },
        {
          title: "License",
          body: [
            "A purchase grants you a non-exclusive license to use and modify the template for your own projects or client projects.",
            "You may not resell, redistribute, sublicense, or publish the original template files as a competing template product."
          ]
        },
        {
          title: "Payments",
          body: [
            "Payments may be processed by Paddle or another listed payment provider. Payment provider terms may also apply at checkout.",
            "Prices are shown before checkout. Taxes, currency conversion, and payment method availability may depend on the payment provider and buyer location."
          ]
        },
        {
          title: "Support",
          body: [
            "Support covers download access and product file issues. Custom development, installation, integrations, and business-specific modifications are not included unless separately agreed.",
            "For support, email dialyn360@gmail.com."
          ]
        }
      ]}
    />
  );
}
