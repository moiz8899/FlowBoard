import { LegalPage } from "@/components/LegalPage";

export const metadata = {
  title: "Privacy Policy",
  description: "FlowBoard privacy policy."
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      intro="This policy explains what information FlowBoard collects and how it is used."
      sections={[
        {
          title: "Information We Collect",
          body: [
            "We may collect your email address, order details, support messages, and product access records when you buy a dashboard template or contact support.",
            "Payments are processed by third-party providers such as Paddle. FlowBoard does not store full card numbers."
          ]
        },
        {
          title: "How We Use Information",
          body: [
            "We use information to provide product delivery, customer support, refund handling, fraud prevention, and basic business records.",
            "Admin authentication is handled through Clerk. Product files and order records may be stored through Supabase."
          ]
        },
        {
          title: "Data Sharing",
          body: [
            "We share information only with service providers needed to operate the store, such as payment, authentication, hosting, storage, and analytics providers.",
            "We do not sell customer personal information."
          ]
        },
        {
          title: "Contact",
          body: [
            "For privacy questions or deletion requests, email dialyn360@gmail.com."
          ]
        }
      ]}
    />
  );
}
