import { NewsletterManagement } from "@/components/admin/newsletter-management";

export default function AdminNewsletterPage() {
  return <NewsletterManagement />;
}

export const metadata = {
  title: "Newsletter Management - Admin",
  description: "Manage newsletter subscribers and campaigns",
};
