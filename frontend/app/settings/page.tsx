"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, Lock, Shield, Bell, Eye, Trash2, LogOut, Upload, Monitor } from "lucide-react";
import { useSettings } from "../../context/SettingsContext";
import { useTranslation } from "../../lib/translations";

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

  const [accountData, setAccountData] = useState<AccountData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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

        const res = await fetch("http://localhost:7000/api/clients/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setAccountData({
              firstName: data.firstName || "",
              lastName: data.lastName || "",
              email: data.email || "",
              phone: data.phone || "",
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

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/clients/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(accountData)
      });

      const data = await res.json();
      
      if (res.ok) {
        showMessage("success", t("accountUpdatedSuccess"));
      } else {
        showMessage("error", data.message || "Failed to update account");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage("error", t("passwordsDoNotMatch"));
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showMessage("error", t("passwordMust8Chars"));
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/password", {
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
        showMessage("success", t("passwordChangedSuccess"));
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      } else {
        showMessage("error", data.message || "Failed to change password");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify(settings.privacySettings)
      });

      const data = await res.json();
      
      if (res.ok) {
        showMessage("success", t("privacyUpdatedSuccess"));
      } else {
        showMessage("error", data.message || "Failed to update privacy settings");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleToggle2FA = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/2fa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // body: JSON.stringify({ enabled: !settings.twoFactorEnabled })
      });

      const data = await res.json();
      
      if (res.ok) {
        // settings.setTwoFactorEnabled(!settings.twoFactorEnabled);
        // showMessage("success", !settings.twoFactorEnabled ? t("twoFactorEnabledSuccess") : t("twoFactorDisabledSuccess"));
      } else {
        showMessage("error", data.message || "Failed to toggle 2FA");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings.notifications)
      });

      const data = await res.json();
      
      if (res.ok) {
        showMessage("success", t("notificationsSavedSuccess"));
      } else {
        showMessage("error", data.message || "Failed to update notifications");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleDisplayUpdate = async () => {
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/display", {
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

      const data = await res.json();
      
      if (res.ok) {
        showMessage("success", t("displaySettingsUpdatedSuccess"));
        await settings.refreshSettings();
      } else {
        showMessage("error", data.message || "Failed to update display settings");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:7000/api/settings/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/");
      } else {
        const data = await res.json();
        showMessage("error", data.message || "Failed to delete account");
      }
    } catch {
      showMessage("error", t("networkError"));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setAccountData({ ...accountData, profileImage: result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const navItems = [
    { name: "Account Management", icon: User },
    { name: "Privacy Settings", icon: Eye },
    { name: "Password", icon: Lock },
    { name: "Two-Factor Auth", icon: Shield },
    { name: "Notifications", icon: Bell },
    { name: "Display Settings", icon: Monitor },
    { name: "Delete Account", icon: Trash2 }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0a0a0a] transition-colors">
      <header className="bg-[#CBB677] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">Settings</h1>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#1a1a1a]">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button onClick={handleLogout} className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] transition">
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {message.text && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg ${message.type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
          {message.text}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 ${mobileMenuOpen ? "block" : "hidden lg:block"}`}>
            <nav className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = active === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setActive(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${isActive ? "bg-[#CBB677] text-white font-semibold" : "text-[#1a1a1a] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]"}`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </button>
                );
              })}
              <button onClick={handleLogout} className="w-full lg:hidden flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition mt-4">
                <LogOut size={20} />
                Logout
              </button>
            </nav>
          </aside>

          <main className="flex-1">
            {active === "Account Management" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Account Management</h2>
                
                <form onSubmit={handleAccountUpdate} className="space-y-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      {accountData.profileImage ? (
                        <Image src={accountData.profileImage} alt="Profile" width={96} height={96} className="w-24 h-24 rounded-full object-cover border-4 border-[#CBB677]" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-[#CBB677] flex items-center justify-center">
                          <User size={40} className="text-white" />
                        </div>
                      )}
                      <label className="absolute bottom-0 right-0 bg-[#1a1a1a] text-white p-2 rounded-full cursor-pointer hover:bg-[#2a2a2a]">
                        <Upload size={16} />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Profile Photo</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Upload a new profile picture</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">First Name *</label>
                      <input type="text" required value={accountData.firstName} onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Last Name *</label>
                      <input type="text" required value={accountData.lastName} onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Email *</label>
                      <input type="email" required value={accountData.email} onChange={(e) => setAccountData({ ...accountData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Phone Number</label>
                      <input type="tel" value={accountData.phone} onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Address</label>
                    <textarea value={accountData.address} onChange={(e) => setAccountData({ ...accountData, address: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {active === "Privacy Settings" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Privacy Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Profile Visibility</label>
                    <select 
                      // value={settings.privacySettings.profileVisibility} 
                      // onChange={(e) => settings.updatePrivacySettings({...settings.privacySettings, profileVisibility: e.target.value as 'public' | 'private' | 'contacts'})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent"
                    >
                      <option value="public">Public</option>
                      <option value="private">Private</option>
                      <option value="contacts">Contacts Only</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Show Email</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Display email on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      {/* <input 
                        type="checkbox" 
                        checked={settings.privacySettings.showEmail}
                        onChange={(e) => settings.updatePrivacySettings({...settings.privacySettings, showEmail: e.target.checked})}
                        className="sr-only peer"
                      /> */}
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Show Phone Number</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Display phone on your profile</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      {/* <input 
                        type="checkbox" 
                        checked={settings.privacySettings.showPhone}
                        onChange={(e) => settings.updatePrivacySettings({...settings.privacySettings, showPhone: e.target.checked})}
                        className="sr-only peer"
                      /> */}
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={handlePrivacyUpdate} disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? "Saving..." : "Save Privacy Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Password" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Change Password</h2>
                
                <form onSubmit={handlePasswordChange} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Current Password</label>
                    <input 
                      type="password" 
                      required 
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">New Password</label>
                    <input 
                      type="password" 
                      required 
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Must be at least 8 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Confirm New Password</label>
                    <input 
                      type="password" 
                      required 
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* {active === "Two-Factor Auth" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Two-Factor Authentication</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <Shield size={24} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Secure Your Account</h3>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Two-factor authentication adds an extra layer of security to your account by requiring a code from your phone in addition to your password.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${settings.twoFactorEnabled ? 'bg-green-100 dark:bg-green-900/20' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        <Shield size={24} className={settings.twoFactorEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">
                          {settings.twoFactorEnabled ? "Two-factor authentication is enabled" : "Two-factor authentication is disabled"}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {settings.twoFactorEnabled ? "✓ Your account is protected with two-factor authentication" : "Enable 2FA to secure your account"}
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={handleToggle2FA}
                      disabled={loading}
                      className={`px-6 py-2.5 rounded-lg font-semibold transition disabled:opacity-50 ${
                        settings.twoFactorEnabled 
                          ? 'bg-red-600 hover:bg-red-700 text-white' 
                          : 'bg-[#CBB677] hover:bg-[#B8A565] text-white'
                      }`}
                    >
                      {loading ? "Processing..." : settings.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Notifications" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Email Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => settings.updateNotifications({...settings.notifications, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">SMS Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive updates via text message</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.smsNotifications}
                        onChange={(e) => settings.updateNotifications({...settings.notifications, smsNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Push Notifications</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Receive push notifications on your device</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => settings.updateNotifications({...settings.notifications, pushNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Job Alerts</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new job opportunities</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.jobAlerts}
                        onChange={(e) => settings.updateNotifications({...settings.notifications, jobAlerts: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#2a2a2a] rounded-lg">
                    <div>
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">Message Alerts</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about new messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications.messageAlerts}
                        onChange={(e) => settings.updateNotifications({...settings.notifications, messageAlerts: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CBB677]/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#CBB677]"></div>
                    </label>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button onClick={handleNotificationUpdate} disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? "Saving..." : "Save Preferences"}
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {active === "Display Settings" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">Display Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Theme</label>
                    <select value={settings.theme} onChange={(e) => settings.setTheme(e.target.value as 'light' | 'dark' | 'auto')} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Language</label>
                    <select value={settings.language} onChange={(e) => settings.setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de')} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">Timezone</label>
                    <select value={settings.timezone} onChange={(e) => settings.setTimezone(e.target.value)} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time (EST)</option>
                      <option value="CST">Central Time (CST)</option>
                      <option value="MST">Mountain Time (MST)</option>
                      <option value="PST">Pacific Time (PST)</option>
                    </select>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={handleDisplayUpdate} disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? "Saving..." : "Save Display Settings"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {active === "Delete Account" && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-6">Delete Account</h2>
                
                <div className="space-y-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h3 className="font-bold text-red-900 dark:text-red-100 mb-2">⚠️ Warning: This action is permanent</h3>
                    <p className="text-sm text-red-700 dark:text-red-300 mb-3">Deleting your account will:</p>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                      <li>Permanently remove all your personal data</li>
                      <li>Delete all your job postings and history</li>
                      <li>Remove your saved handymen and favorites</li>
                      <li>Cancel any active jobs or bookings</li>
                    </ul>
                    <p className="text-sm text-red-800 dark:text-red-200 font-bold mt-3">This action cannot be undone.</p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Before you go...</h3>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      If you are having issues with your account, our support team is here to help. Consider reaching out before deleting your account.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={handleDeleteAccount}
                      disabled={loading}
                      className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition disabled:opacity-50"
                    >
                      {loading ? "Deleting..." : "Delete My Account"}
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