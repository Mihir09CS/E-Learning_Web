import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout.jsx';
import Card from '../components/ui/Card.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Button from '../components/ui/Button.jsx';

export default function Profile() {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    weeklyDigest: true,
    profileVisibility: 'Public',
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <DashboardLayout title="Profile & Settings" subtitle="Manage your account details, preferences, and learning profile.">
      <section className="grid gap-4 lg:grid-cols-3">
        <Card title="User Details" className="lg:col-span-2 soft-gradient-panel">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Full Name</span>
              <input className="input-base" value={user?.name ?? ''} readOnly />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Email</span>
              <input className="input-base" value={user?.email ?? ''} readOnly />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Role</span>
              <input className="input-base capitalize" value={user?.role ?? ''} readOnly />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs text-slate-500">Enrolled Courses</span>
              <input className="input-base" value={user?.enrolledCourses.length ?? 0} readOnly />
            </label>
          </div>
        </Card>

        <Card title="Account Actions" className="soft-gradient-panel">
          <div className="space-y-2">
            <Button className="w-full">Edit Profile</Button>
            <Button variant="secondary" className="w-full">
              Change Password
            </Button>
            <Button variant="secondary" className="w-full">
              Download Data
            </Button>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card title="Settings" className="soft-gradient-panel">
          <div className="space-y-3 text-sm text-slate-700">
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span>Email Notifications</span>
              <button className="btn-secondary" onClick={() => handleToggle('emailNotifications')}>
                {settings.emailNotifications ? 'On' : 'Off'}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span>Weekly Digest</span>
              <button className="btn-secondary" onClick={() => handleToggle('weeklyDigest')}>
                {settings.weeklyDigest ? 'On' : 'Off'}
              </button>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="mb-1 block">Profile Visibility</span>
              <select
                className="input-base"
                value={settings.profileVisibility}
                onChange={(event) => setSettings((prev) => ({ ...prev, profileVisibility: event.target.value }))}
              >
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div>
        </Card>

        <Card title="Learning Snapshot" className="soft-gradient-panel">
          <ul className="space-y-2 text-sm text-slate-600">
            <li>Current streak: 6 days</li>
            <li>Lessons completed this week: 4</li>
            <li>Most active category: Frontend Development</li>
            <li>Recommended next focus: Advanced React state management</li>
          </ul>
        </Card>
      </section>

      <div className="glass-card soft-gradient-panel p-4">
        <p className="text-xs text-slate-500">Profile and settings actions are currently UI-only for contest mode.</p>
      </div>
    </DashboardLayout>
  );
}
