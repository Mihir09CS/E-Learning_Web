import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/ui/Card.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useCourses } from '../context/CourseContext.jsx';

const dummyUsers = [
  { id: 'u1', name: 'Contest Student', role: 'student', status: 'Active', joined: '2026-02-21' },
  { id: 'u2', name: 'Asha Verma', role: 'instructor', status: 'Pending', joined: '2026-02-20' },
  { id: 'u3', name: 'Rahul Jain', role: 'student', status: 'Active', joined: '2026-02-18' },
  { id: 'u4', name: 'Nisha Roy', role: 'instructor', status: 'Active', joined: '2026-02-17' },
];

const logs = [
  '11:24 UTC - Admin approved "React Foundation Sprint".',
  '10:55 UTC - User role updated from student to instructor.',
  '10:33 UTC - 2 reports marked resolved.',
  '10:10 UTC - Daily analytics snapshot generated.',
];

export default function Admin() {
  const { user } = useAuth();
  const { courses } = useCourses();

  if (user?.role !== 'admin') {
    return (
      <DashboardLayout title="Admin Access" subtitle="This view is restricted to admin accounts.">
        <div className="panel p-5 text-sm text-slate-600">
          Login with an email containing <span className="font-semibold">admin</span> from the Login page to access this panel.
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Admin Panel" subtitle="Manage users, approve courses, review reports, and monitor platform health.">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { label: 'Total Users', value: 1240 },
          { label: 'Active Instructors', value: 62 },
          { label: 'Pending Approvals', value: courses.length },
          { label: 'Open Reports', value: 7 },
        ].map((item) => (
          <Card key={item.label} className="soft-gradient-panel hover-lift">
            <p className="text-sm text-slate-500">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-900">{item.value}</p>
          </Card>
        ))}
      </section>

      <section className="glass-card soft-gradient-panel p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="section-title">User Management</h2>
          <div className="flex flex-wrap gap-2">
            <input className="input-base w-52" placeholder="Search users..." />
            <select className="input-base w-40">
              <option>All Roles</option>
              <option>Student</option>
              <option>Instructor</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dummyUsers.map((item) => (
                <tr key={item.id} className="border-t border-slate-200">
                  <td className="px-4 py-3 text-slate-700">{item.name}</td>
                  <td className="px-4 py-3 capitalize text-slate-600">{item.role}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{item.joined}</td>
                  <td className="px-4 py-3">
                    <button className="btn-secondary">Review</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Course Approval Queue" className="soft-gradient-panel">
          <ul className="space-y-2 text-sm text-slate-600">
            {courses.map((course) => (
              <li key={course.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2">
                <div>
                  <p className="font-medium text-slate-800">{course.title}</p>
                  <p className="text-xs text-slate-500">{course.instructor}</p>
                </div>
                <div className="flex gap-2">
                  <button className="btn-primary">Approve</button>
                  <button className="btn-secondary">Reject</button>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Analytics Dashboard" className="soft-gradient-panel">
          <div className="space-y-4">
            {[
              { label: 'Daily Active Users', value: 78 },
              { label: 'Course Completion Rate', value: 64 },
              { label: 'Support Resolution Rate', value: 91 },
            ].map((metric) => (
              <div key={metric.label} className="rounded-lg border border-slate-200 bg-white p-3">
                <div className="mb-1 flex items-center justify-between text-sm text-slate-600">
                  <span>{metric.label}</span>
                  <span>{metric.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200">
                  <div className="h-2 rounded-full bg-indigo-600" style={{ width: `${metric.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card title="Reports" className="soft-gradient-panel">
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Flagged content report (2 unresolved)</li>
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Spam account report (under review)</li>
            <li className="rounded-lg border border-slate-200 bg-white px-3 py-2">Payment mismatch report (resolved)</li>
          </ul>
        </Card>

        <Card title="System Logs" className="soft-gradient-panel">
          <ul className="space-y-2 text-xs text-slate-600">
            {logs.map((item) => (
              <li key={item} className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </section>
    </DashboardLayout>
  );
}
