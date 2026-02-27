import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/ui/Card.jsx';

export default function Help() {
  return (
    <DashboardLayout title="Help & Support" subtitle="Get quick assistance, raise tickets, and resolve your learning issues fast.">
      <section className="panel p-5">
        <div className="grid gap-4 lg:grid-cols-3">
          <input className="input-base lg:col-span-2" placeholder="Search help articles, issues, or FAQs..." />
          <button className="btn-primary">Search Help</button>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Frequently Asked Questions">
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">How do I enroll? Open a course and click Enroll.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">How to track progress? Progress updates from completed lessons.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">How to contact support? Use ticket form or AI chatbot.</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">Can I switch role? Contact support for role migration.</li>
          </ul>
        </Card>

        <Card title="Contact Support">
          <form className="space-y-3">
            <input className="input-base" placeholder="Your email" type="email" />
            <select className="input-base">
              <option>Issue Type: General</option>
              <option>Enrollment</option>
              <option>Video Playback</option>
              <option>Account & Billing</option>
            </select>
            <textarea className="input-base min-h-28" placeholder="Describe your issue" />
            <button type="button" className="btn-primary">
              Submit Ticket
            </button>
          </form>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Support Channels">
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Email: support@learnflow.com</li>
            <li>Phone: +1 555 294 1100</li>
            <li>Live Chat: Available 9 AM - 8 PM</li>
            <li>AI Assistant: Available 24/7</li>
          </ul>
        </Card>

        <Card title="Recent Tickets">
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">#4452 - Video not loading - In Progress</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">#4441 - Enrollment issue - Resolved</li>
            <li className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">#4428 - Profile update request - Pending</li>
          </ul>
        </Card>
      </section>
    </DashboardLayout>
  );
}
