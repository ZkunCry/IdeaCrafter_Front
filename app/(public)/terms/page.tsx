import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for IdeaCrafter",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
        <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: <time dateTime="2025-09-27">September 27, 2025</time>
        </p>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">1. General Provisions</h2>
          <p>
            <strong>
              This Service is provided by an individual — [Eugene Aksentev].
            </strong>{" "}
            By using the Service, you agree to these Terms. If you do not agree,
            please do not use the Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">2. Use of Service</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>
                The Service is provided for personal and non-commercial use
                only.
              </strong>
            </li>
            <li>
              <strong>
                You agree not to use the Service for any unlawful or prohibited
                activities.
              </strong>
            </li>
            <li>
              <strong>
                The Service owner reserves the right to restrict access if these
                rules are violated.
              </strong>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">3. Liability</h2>
          <p>
            <strong>
              The Service is provided "as is" without warranties of any kind.
            </strong>
            The Service owner is not responsible for possible failures, data
            loss, or damages caused by the use of the Service. The user is
            solely responsible for their actions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">4. Personal Data</h2>
          <p>
            <strong>
              Some personal data may be collected (e.g., name, email, technical
              info).
            </strong>
            Data is used only for the functioning of the Service and is not
            shared with third parties, except as required by law. See our{" "}
            <Link href="/privacy" className="text-primary underline font-bold">
              Privacy Policy
            </Link>{" "}
            for more details.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">5. Changes</h2>
          <p>
            <strong>These Terms may be updated from time to time.</strong>
            Continued use of the Service after updates means you agree to the
            new version.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">6. Contact</h2>
          <p>
            <strong>If you have questions, please contact us at:</strong>{" "}
            <a
              href="mailto:your@email.com"
              className="text-primary underline font-bold"
            >
              eugaksoleg@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
