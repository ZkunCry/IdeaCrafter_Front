import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for IdeaCrafter",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-6">
      <div className="max-w-3xl mx-auto text-lg leading-relaxed space-y-6">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-8">
          Last updated: <time dateTime="2025-09-27">September 27, 2025</time>
        </p>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">1. Information Collection</h2>
          <p>
            <strong>
              We may collect personal information such as your name and email
              address.
            </strong>
            This information is provided voluntarily when you sign up or use the
            Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">2. Use of Information</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>
                Information is used to provide and improve the Service.
              </strong>
            </li>
            <li>
              <strong>
                We may send notifications, updates, or important announcements
                to your email.
              </strong>
            </li>
            <li>
              <strong>Your data is never sold to third parties.</strong>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">3. Data Security</h2>
          <p>
            <strong>
              We take reasonable measures to protect your personal information.
            </strong>
            However, no method of transmission over the Internet or electronic
            storage is 100% secure.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">4. Sharing of Information</h2>
          <p>
            <strong>
              We do not share your personal data with third parties, except as
              required by law.
            </strong>
            Only minimal information is shared if necessary to provide the
            Service.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">5. Cookies and Tracking</h2>
          <p>
            <strong>
              The Service may use cookies or similar technologies for analytics.
            </strong>
            These are used to understand usage patterns and improve user
            experience.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">6. Changes to Privacy Policy</h2>
          <p>
            <strong>
              We may update this Privacy Policy from time to time.
            </strong>
            Continued use of the Service after changes means you accept the
            updated policy.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-bold text-xl">7. Contact</h2>
          <p>
            <strong>
              If you have questions regarding privacy, contact us at:
            </strong>{" "}
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
