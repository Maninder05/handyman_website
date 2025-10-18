"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X, User, Lock, Shield, Bell, Eye, Trash2, LogOut, Upload } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { useTranslation } from "@/lib/translations";

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

  const fetchSettings = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/clients/settings", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.account) setAccountData(data.account);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const showMessage = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 3000);
  };

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/clients/settings/account", {
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
      const res = await fetch("http://localhost:8000/api/clients/settings/password", {
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
      const res = await fetch("http://localhost:8000/api/clients/settings/privacy", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(settings.privacySettings)
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
      const res = await fetch("http://localhost:8000/api/clients/settings/2fa", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ enabled: !settings.twoFactorEnabled })
      });

      const data = await res.json();
      
      if (res.ok) {
        settings.setTwoFactorEnabled(!settings.twoFactorEnabled);
        showMessage("success", !settings.twoFactorEnabled ? t("twoFactorEnabledSuccess") : t("twoFactorDisabledSuccess"));
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
      const res = await fetch("http://localhost:8000/api/clients/settings/notifications", {
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
      const res = await fetch("http://localhost:8000/api/clients/settings/display", {
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
      const res = await fetch("http://localhost:8000/api/clients/settings/account", {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/login");
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
    { name: t("accountManagement"), icon: User },
    { name: t("privacySettings"), icon: Eye },
    { name: t("password"), icon: Lock },
    { name: t("twoFactorAuth"), icon: Shield },
    { name: t("notifications"), icon: Bell },
    { name: t("displaySettings"), icon: User },
    { name: t("deleteAccount"), icon: Trash2 }
  ];

  return (
    <div className="min-h-screen bg-[#F9F9F9] dark:bg-[#0a0a0a] transition-colors">
      <header className="bg-[#CBB677] shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-[#1a1a1a]">{t("settings")}</h1>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 text-[#1a1a1a]">
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <button onClick={handleLogout} className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white rounded-lg hover:bg-[#2a2a2a] transition">
              <LogOut size={18} />
              {t("logout")}
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
                {t("logout")}
              </button>
            </nav>
          </aside>

          <main className="flex-1">
            {active === t("accountManagement") && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">{t("accountManagement")}</h2>
                
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
                      <h3 className="font-semibold text-[#1a1a1a] dark:text-gray-100">{t("profilePhoto")}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{t("uploadNewPhoto")}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("firstName")} *</label>
                      <input type="text" required value={accountData.firstName} onChange={(e) => setAccountData({ ...accountData, firstName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("lastName")} *</label>
                      <input type="text" required value={accountData.lastName} onChange={(e) => setAccountData({ ...accountData, lastName: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("email")} *</label>
                      <input type="email" required value={accountData.email} onChange={(e) => setAccountData({ ...accountData, email: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("phoneNumber")}</label>
                      <input type="tel" value={accountData.phone} onChange={(e) => setAccountData({ ...accountData, phone: e.target.value })} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("address")}</label>
                    <textarea value={accountData.address} onChange={(e) => setAccountData({ ...accountData, address: e.target.value })} rows={3} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent" />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#CBB677] text-white rounded-lg hover:bg-[#B8A565] transition disabled:opacity-50">
                      {loading ? t("saving") : t("saveChanges")}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {active === t("displaySettings") && (
              <div className="bg-white dark:bg-[#1a1a1a] rounded-lg shadow-md p-6 max-w-2xl">
                <h2 className="text-2xl font-bold text-[#1a1a1a] dark:text-gray-100 mb-6">{t("displaySettings")}</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("theme")}</label>
                    <select value={settings.theme} onChange={(e) => settings.setTheme(e.target.value as 'light' | 'dark' | 'auto')} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="light">{t("light")}</option>
                      <option value="dark">{t("dark")}</option>
                      <option value="auto">{t("auto")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("language")}</label>
                    <select value={settings.language} onChange={(e) => settings.setLanguage(e.target.value as 'en' | 'es' | 'fr' | 'de')} className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-[#CBB677] focus:border-transparent">
                      <option value="en">{t("english")}</option>
                      <option value="es">{t("spanish")}</option>
                      <option value="fr">{t("french")}</option>
                      <option value="de">{t("german")}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#1a1a1a] dark:text-gray-300 mb-2">{t("timezone")}</label>
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
                      {loading ? t("saving") : t("saveDisplaySettings")}
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