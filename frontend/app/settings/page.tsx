"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, Lock, Bell, Trash2, LogOut, Upload, Monitor } from "lucide-react";
import { useSettings } from "../contexts/SettingsContext";
import { useTranslation } from "../lib/translations";

interface AccountData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
}

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SettingsPage() {
  const router = useRouter();
  const settings = useSettings();
  const { t } = useTranslation(settings.language);
  
  const [active, setActive] = useState("Account Management");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");

  const [accountData, setAccountData] = useState<AccountData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "+1 ",
    address: "",
    profileImage: ""
  });

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/signup?mode=login");
          return;
        }

        const res = await fetch("http://localhost:8000/api/clients/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setAccountData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              phone: data.phone || "+1 ",
              address: data.address || "",
              profileImage: data.profileImage || ""
            });
          }
        } else if (res.status === 401) {
          router.push("/signup?mode=login");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };

    fetchSettings();
    settings.refreshSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handlePhoneChange = (value: string) => {
    let cleaned = value.replace(/[^\d+]/g, '');
    if (!cleaned.startsWith('+1')) {
      cleaned = '+1 ' + cleaned.replace(/^\+?1?/, '');
    } else if (!cleaned.startsWith('+1 ')) {
      cleaned = cleaned.replace('+1', '+1 ');
    }
    const numbers = cleaned.substring(3).replace(/\D/g, '');
    let formatted = '+1 ';
    if (numbers.length > 0) formatted += numbers.substring(0, 3);
    if (numbers.length > 3) formatted += '-' + numbers.substring(3, 6);
    if (numbers.length > 6) formatted += '-' + numbers.substring(6, 10);
    setAccountData({ ...accountData, phone: formatted });
  };

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/clients/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(accountData)
      });

      const data = await res.json();
      if (res.ok) {
        showMessage("success", "Account updated successfully");
      } else {
        showMessage("error", data.message || "Failed to update account");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", "Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showMessage("error", "Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/settings/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      });

      const data = await res.json();
      if (res.ok) {
        showMessage("success", "Password changed successfully");
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showMessage("error", data.message || "Failed to change password");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings.notifications)
      });

      if (res.ok) {
        showMessage("success", "Notification preferences updated");
        settings.refreshSettings();
      } else {
        showMessage("error", "Failed to update notifications");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleDisplayUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/settings/display", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          theme: settings.theme,
          language: settings.language,
          timezone: settings.timezone
        })
      });

      if (res.ok) {
        showMessage("success", "Display settings updated");
        settings.refreshSettings();
      } else {
        showMessage("error", "Failed to update display settings");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/signup?mode=login");
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation.toLowerCase() !== "delete") {
      showMessage("error", "Please type DELETE to confirm");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/clients/delete", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/signup?mode=signup");
      } else {
        showMessage("error", "Failed to delete account");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteConfirmation("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/clients/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setAccountData({ ...accountData, profileImage: data.imageUrl });
        showMessage("success", "Profile image updated");
      } else {
        showMessage("error", "Failed to upload image");
      }
    } catch {
      showMessage("error", "Network error");
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    { id: "Account Management", icon: User, label: "Account Management" },
    { id: "Change Password", icon: Lock, label: "Change Password" },
    { id: "Display Settings", icon: Monitor, label: "Display Settings" },
    { id: "Notifications", icon: Bell, label: "Notifications" },
    { id: "Logout", icon: LogOut, label: "Logout" },
    { id: "Delete Account", icon: Trash2, label: "Delete Account" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl max-w-md w-full p-6 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400">⚠️ Delete Account</h3>
              <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(""); }} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition">
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">This action is <span className="font-bold text-red-600">PERMANENT</span> and cannot be undone.</p>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-sm text-red-700 dark:text-red-300 font-semibold mb-2">All your data will be permanently deleted:</p>
                <ul className="text-sm text-red-600 dark:text-red-400 space-y-1 list-disc list-inside">
                  <li>Personal information</li>
                  <li>Job postings and history</li>
                  <li>Saved handymen</li>
                  <li>Active bookings</li>
                </ul>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type <span className="font-bold text-red-600">DELETE</span> to confirm:</label>
                <input type="text" value={deleteConfirmation} onChange={(e) => setDeleteConfirmation(e.target.value)} placeholder="Type DELETE" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setShowDeleteModal(false); setDeleteConfirmation(""); }} className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition font-medium">
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} disabled={loading || deleteConfirmation.toLowerCase() !== "delete"} className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success/Error Message */}
      {message.text && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          {message.text}
        </div>
      )}

      <div className="container mx-auto px-4 py-6 flex-1 max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1a1a1a] dark:text-gray-100">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Manage your account and preferences</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]">
          {/* Mobile Menu Toggle */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md">
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            <span className="font-medium">Menu</span>
          </button>

          {/* Compact Sidebar */}
          <aside className={`${mobileMenuOpen ? 'block' : 'hidden'} lg:block lg:w-56 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-3 h-fit`}>
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isLogout = item.id === "Logout";
                const isDelete = item.id === "Delete Account";
                
                if (isLogout) {
                  return (
                    <button key={item.id} onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                      <Icon size={18} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                }
                
                return (
                  <button key={item.id} onClick={() => { setActive(item.id); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition ${active === item.id ? "bg-[#CBB677] text-white" : isDelete ? "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20" : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"}`}>
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Compact Main Content */}
          <main className="flex-1 overflow-y-auto">
            {active === "Account Management" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 h-full">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-4">Account Management</h2>
                <form onSubmit={handleAccountUpdate} className="space-y-4">
                  {/* Profile Image - Compact */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {accountData.profileImage ? (
                        <Image src={accountData.profileImage} alt="Profile" width={80} height={80} className="rounded-full object-cover" />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <User size={32} className="text-gray-400" />
                        </div>
                      )}
                      <label className="absolute bottom-0 right-0 bg-[#CBB677] p-1.5 rounded-full cursor-pointer hover:bg-[#B8A565] transition">
                        <Upload size={14} className="text-white" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Profile Picture</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Upload new picture</p>
                    </div>
                  </div>

                  {/* Compact Form Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">First Name</label>
                      <input type="text" value={accountData.firstName} onChange={(e) => setAccountData({...accountData, firstName: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Last Name</label>
                      <input type="text" value={accountData.lastName} onChange={(e) => setAccountData({...accountData, lastName: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Email Address</label>
                    <input type="email" value={accountData.email} onChange={(e) => setAccountData({...accountData, email: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Contact Number <span className="text-xs text-gray-500">(+1 XXX-XXX-XXXX)</span></label>
                    <input type="tel" value={accountData.phone} onChange={(e) => handlePhoneChange(e.target.value)} placeholder="+1 555-555-5555" className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Address</label>
                    <textarea value={accountData.address} onChange={(e) => setAccountData({...accountData, address: e.target.value})} rows={2} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={loading} className="px-5 py-2 text-sm bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50 font-medium">
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {active === "Change Password" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-4">Change Password</h2>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Current Password</label>
                    <input type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">New Password</label>
                    <input type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required minLength={8} />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be at least 8 characters</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Confirm New Password</label>
                    <input type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" required />
                  </div>
                  <div className="flex justify-end pt-2">
                    <button type="submit" disabled={loading} className="px-5 py-2 text-sm bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50 font-medium">
                      {loading ? "Changing..." : "Change Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {active === "Notifications" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-4">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive updates via email' },
                    { key: 'smsNotifications', label: 'SMS Notifications', desc: 'Receive updates via text' },
                    { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive push notifications' },
                    { key: 'jobAlerts', label: 'Job Alerts', desc: 'Get notified about new jobs' },
                    { key: 'messageAlerts', label: 'Message Alerts', desc: 'Get notified about messages' }
                  ].map(({ key, label, desc }) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100 text-sm">{label}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={settings.notifications[key as keyof typeof settings.notifications]} onChange={(e) => settings.updateNotifications({...settings.notifications, [key]: e.target.checked})} className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                      </label>
                    </div>
                  ))}
                  <div className="flex justify-end pt-2">
                    <button onClick={handleNotificationUpdate} disabled={loading} className="px-5 py-2 text-sm bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50 font-medium">
                      {loading ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Display Settings" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-4">Display Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Theme</label>
                    <select value={settings.theme} onChange={(e) => settings.setTheme(e.target.value as 'light' | 'dark' | 'auto')} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Language</label>
                    <select value={settings.language} onChange={(e) => settings.setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de')} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-1">Timezone</label>
                    <select value={settings.timezone} onChange={(e) => settings.setTimezone(e.target.value)} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button onClick={handleDisplayUpdate} disabled={loading} className="px-5 py-2 text-sm bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50 font-medium">
                      {loading ? "Saving..." : "Save Display Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Delete Account" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Delete Account</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">⚠️ Warning: This action is permanent</h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-2">Deleting your account will:</p>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                      <li>Permanently remove all your personal data</li>
                      <li>Delete all your job postings and history</li>
                      <li>Remove your saved handymen and favorites</li>
                      <li>Cancel any active jobs or bookings</li>
                    </ul>
                    <p className="text-sm text-red-800 dark:text-red-200 font-bold mt-2">This action cannot be undone.</p>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Before you go...</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">If you are having issues with your account, our support team is here to help. Consider reaching out before deleting your account.</p>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={() => setShowDeleteModal(true)} className="px-5 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}