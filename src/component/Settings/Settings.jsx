import React, { useEffect, useRef, useState } from "react";
import {
  Settings as SettingsIcon,
  UserRound,
  CreditCard,
  Building2,
  Bell,
  Palette,
  Shield,
  Link2,
  ChevronRight,
  Camera,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  Languages,
  Lock,
  ShieldCheck,
  Monitor,
  Clock3,
  Copy,
  Check,
  Pencil,
  Save,
  X,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Laptop,
  CheckCircle2,
  CircleAlert,
  Plug,
  Unplug,
  Crown,
  Search,
} from "lucide-react";

import AppSidebar from "../../layouts/AppSidebar";
import "./Settings.css";

const defaultProfile = {
  firstName: "John",
  lastName: "Doe",
  email: "john@company.com",
  jobTitle: "Product Manager",
  phone: "9876543210",
  countryCode: "+91",
  timezone: "Asia/Kolkata (GMT+5:30)",
  language: "English",
  team: "Product Team",
  location: "Pune, India",
  username: "johndoe",
  accountId: "TF-2026-0012",
  memberSince: "Oct 10, 2026",
  accountType: "Free Plan",
  photo: "",
};

const defaultNotifications = {
  email: true,
  taskAssigned: true,
  taskCompleted: true,
  projectUpdates: true,
  chatMessages: true,
  weeklySummary: false,
};

const defaultIntegrations = {
  google: false,
  github: false,
  slack: false,
  microsoft: false,
};

const settingsMenu = [
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
  },
  {
    id: "account",
    label: "Account",
    icon: CreditCard,
  },
  {
    id: "workspace",
    label: "Workspace",
    icon: Building2,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Link2,
  },
  {
    id: "billing",
    label: "Billing",
    icon: CreditCard,
  },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function Settings() {
  const fileInputRef = useRef(null);

  const [activeSection, setActiveSection] = useState("profile");

  const [profile, setProfile] = useState(() =>
    readStorage("teamflow_profile", defaultProfile)
  );

  const [form, setForm] = useState(profile);

  const [notifications, setNotifications] = useState(() =>
    readStorage(
      "teamflow_notifications",
      defaultNotifications
    )
  );

  const [integrations, setIntegrations] = useState(() =>
    readStorage(
      "teamflow_integrations",
      defaultIntegrations
    )
  );

  const [appearance, setAppearance] = useState(() =>
    localStorage.getItem("teamflow_appearance") || "light"
  );

  const [twoFactor, setTwoFactor] = useState(() =>
    localStorage.getItem("teamflow_2fa") === "true"
  );

  const [saved, setSaved] = useState(false);

  const [search, setSearch] = useState("");

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [passwordData, setPasswordData] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [passwordError, setPasswordError] = useState("");

  const [workspaceName, setWorkspaceName] = useState(
    () =>
      localStorage.getItem("teamflow_workspace_name") ||
      "Product Team"
  );

  const [workspacePlan, setWorkspacePlan] = useState(
    () =>
      localStorage.getItem("teamflow_workspace_plan") ||
      "Free Plan"
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    document.body.classList.remove(
      "theme-light",
      "theme-dark"
    );

    document.body.classList.add(
      appearance === "dark"
        ? "theme-dark"
        : "theme-light"
    );

    localStorage.setItem(
      "teamflow_appearance",
      appearance
    );
  }, [appearance]);

  useEffect(() => {
    localStorage.setItem(
      "teamflow_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(
      "teamflow_integrations",
      JSON.stringify(integrations)
    );
  }, [integrations]);

  useEffect(() => {
    localStorage.setItem(
      "teamflow_2fa",
      String(twoFactor)
    );
  }, [twoFactor]);

  const updateForm = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const saveProfile = () => {
    const updatedProfile = {
      ...form,
      team: workspaceName,
    };

    setProfile(updatedProfile);
    setForm(updatedProfile);

    localStorage.setItem(
      "teamflow_profile",
      JSON.stringify(updatedProfile)
    );

    localStorage.setItem(
      "teamflow_current_user",
      JSON.stringify(updatedProfile)
    );

    setSaved(true);
    setMessage("Profile changes saved successfully.");

    setTimeout(() => {
      setSaved(false);
      setMessage("");
    }, 2500);
  };

  const cancelProfile = () => {
    setForm(profile);
    setMessage("");
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setMessage("Please select a valid image file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const image = reader.result;

      setForm((previous) => ({
        ...previous,
        photo: image,
      }));

      setProfile((previous) => ({
        ...previous,
        photo: image,
      }));

      localStorage.setItem(
        "teamflow_profile",
        JSON.stringify({
          ...form,
          photo: image,
        })
      );

      setMessage("Profile photo updated.");

      setTimeout(() => {
        setMessage("");
      }, 2000);
    };

    reader.readAsDataURL(file);
  };

  const handleNotificationChange = (
    setting,
    value
  ) => {
    setNotifications((previous) => ({
      ...previous,
      [setting]: value,
    }));
  };

  const toggleIntegration = (name) => {
    setIntegrations((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  const saveWorkspace = () => {
    localStorage.setItem(
      "teamflow_workspace_name",
      workspaceName
    );

    localStorage.setItem(
      "teamflow_workspace_plan",
      workspacePlan
    );

    setMessage("Workspace settings saved.");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const changePassword = () => {
    setPasswordError("");

    if (
      !passwordData.current ||
      !passwordData.newPassword ||
      !passwordData.confirm
    ) {
      setPasswordError(
        "Please fill in all password fields."
      );
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirm
    ) {
      setPasswordError(
        "New passwords do not match."
      );
      return;
    }

    localStorage.setItem(
      "teamflow_password",
      passwordData.newPassword
    );

    setPasswordData({
      current: "",
      newPassword: "",
      confirm: "",
    });

    setShowPasswordModal(false);

    setMessage("Password changed successfully.");

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const copyAccountId = async () => {
    try {
      await navigator.clipboard.writeText(
        profile.accountId
      );

      setMessage("Account ID copied.");

      setTimeout(() => {
        setMessage("");
      }, 1500);
    } catch {
      setMessage("Unable to copy Account ID.");
    }
  };

  const renderProfile = () => {
    return (
      <>
        <section className="settings-card profile-card">
          <div className="settings-card-header">
            <div className="section-icon blue">
              <UserRound size={21} />
            </div>

            <div>
              <h2>Profile Information</h2>

              <p>
                Update your personal information and how
                others see you.
              </p>
            </div>

            <button
              className="outline-button change-photo-button"
              type="button"
              onClick={() =>
                fileInputRef.current?.click()
              }
            >
              <Camera size={17} />
              Change Photo
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handlePhotoChange}
            />
          </div>

          <div className="profile-editor">
            <div className="profile-preview">
              <div className="large-avatar">
                {form.photo ? (
                  <img
                    src={form.photo}
                    alt="Profile"
                  />
                ) : (
                  <span>
                    {form.firstName
                      ?.charAt(0)
                      .toUpperCase()}
                    {form.lastName
                      ?.charAt(0)
                      .toUpperCase()}
                  </span>
                )}

                <button
                  type="button"
                  className="avatar-camera"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                >
                  <Camera size={15} />
                </button>
              </div>

              <h3>
                {form.firstName} {form.lastName}
              </h3>

              <span className="role-badge">
                {form.jobTitle || "Team Member"}
              </span>

              <div className="profile-meta">
                <span>
                  <Users size={16} />
                  {form.team}
                </span>

                <span>
                  <MapPin size={16} />
                  {form.location}
                </span>
              </div>
            </div>

            <div className="profile-fields">
              <div className="form-grid two">
                <div className="form-group">
                  <label>First Name</label>

                  <input
                    value={form.firstName}
                    onChange={(e) =>
                      updateForm(
                        "firstName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Last Name</label>

                  <input
                    value={form.lastName}
                    onChange={(e) =>
                      updateForm(
                        "lastName",
                        e.target.value
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Work Email</label>

                  <input
                    value={form.email}
                    onChange={(e) =>
                      updateForm(
                        "email",
                        e.target.value
                      )
                    }
                    type="email"
                  />
                </div>

                <div className="form-group">
                  <label>Job Title</label>

                  <input
                    value={form.jobTitle}
                    onChange={(e) =>
                      updateForm(
                        "jobTitle",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>

              <div className="form-grid three">
                <div className="form-group">
                  <label>Phone Number</label>

                  <div className="phone-input">
                    <select
                      value={form.countryCode}
                      onChange={(e) =>
                        updateForm(
                          "countryCode",
                          e.target.value
                        )
                      }
                    >
                      <option value="+91">
                        🇮🇳 +91
                      </option>

                      <option value="+1">
                        🇺🇸 +1
                      </option>

                      <option value="+44">
                        🇬🇧 +44
                      </option>

                      <option value="+61">
                        🇦🇺 +61
                      </option>
                    </select>

                    <input
                      value={form.phone}
                      onChange={(e) =>
                        updateForm(
                          "phone",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Timezone</label>

                  <select
                    value={form.timezone}
                    onChange={(e) =>
                      updateForm(
                        "timezone",
                        e.target.value
                      )
                    }
                  >
                    <option>
                      Asia/Kolkata (GMT+5:30)
                    </option>

                    <option>
                      America/New_York (GMT-5)
                    </option>

                    <option>
                      Europe/London (GMT+0)
                    </option>

                    <option>
                      Asia/Dubai (GMT+4)
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Language</label>

                  <select
                    value={form.language}
                    onChange={(e) =>
                      updateForm(
                        "language",
                        e.target.value
                      )
                    }
                  >
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card-actions">
            <button
              className="secondary-button"
              type="button"
              onClick={cancelProfile}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="button"
              onClick={saveProfile}
            >
              {saved ? (
                <>
                  <Check size={17} />
                  Saved
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </section>

        <div className="settings-bottom-grid">
          {renderAccountCard()}
          {renderSecurityCard()}
        </div>
      </>
    );
  };

  const renderAccountCard = () => {
    return (
      <section className="settings-card compact-card">
        <div className="settings-card-header">
          <div className="section-icon blue">
            <CreditCard size={20} />
          </div>

          <div>
            <h2>Account Information</h2>
            <p>
              Manage your account details and preferences.
            </p>
          </div>
        </div>

        <div className="information-list">
          <div className="information-row">
            <UserRound size={18} />

            <span>Username</span>

            <strong>{profile.username}</strong>

            <button
              type="button"
              onClick={() =>
                setActiveSection("profile")
              }
            >
              Edit
            </button>
          </div>

          <div className="information-row">
            <Mail size={18} />

            <span>Email Address</span>

            <strong>{profile.email}</strong>

            <button
              type="button"
              onClick={() =>
                setActiveSection("profile")
              }
            >
              Edit
            </button>
          </div>

          <div className="information-row">
            <span className="hash-icon">#</span>

            <span>Account ID</span>

            <strong>{profile.accountId}</strong>

            <button
              type="button"
              className="icon-only-button"
              onClick={copyAccountId}
              title="Copy Account ID"
            >
              <Copy size={16} />
            </button>
          </div>

          <div className="information-row">
            <Clock3 size={18} />

            <span>Member Since</span>

            <strong>{profile.memberSince}</strong>

            <span />
          </div>

          <div className="information-row">
            <Crown size={18} />

            <span>Account Type</span>

            <strong>{profile.accountType}</strong>

            <button
              type="button"
              className="small-upgrade"
              onClick={() =>
                setActiveSection("billing")
              }
            >
              Upgrade
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderSecurityCard = () => {
    return (
      <section className="settings-card compact-card">
        <div className="settings-card-header">
          <div className="section-icon blue">
            <ShieldCheck size={20} />
          </div>

          <div>
            <h2>Security</h2>
            <p>Keep your account safe and secure.</p>
          </div>
        </div>

        <div className="information-list">
          <div className="information-row">
            <Lock size={18} />

            <span>Password</span>

            <strong>••••••••</strong>

            <button
              type="button"
              onClick={() =>
                setShowPasswordModal(true)
              }
            >
              Change Password
            </button>
          </div>

          <div className="information-row">
            <Shield size={18} />

            <span>Two-Factor Authentication</span>

            <strong
              className={
                twoFactor
                  ? "status-enabled"
                  : "status-disabled"
              }
            >
              {twoFactor
                ? "Enabled"
                : "Not enabled"}
            </strong>

            <button
              type="button"
              onClick={() =>
                setTwoFactor((previous) => !previous)
              }
            >
              {twoFactor ? "Disable" : "Enable"}
            </button>
          </div>

          <div className="information-row">
            <Monitor size={18} />

            <span>Active Sessions</span>

            <strong>3 active sessions</strong>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Session manager opened. This demo has 3 active sessions."
                )
              }
            >
              View Sessions
            </button>
          </div>

          <div className="information-row">
            <Clock3 size={18} />

            <span>Login History</span>

            <strong>Last login: Oct 20, 2026</strong>

            <button
              type="button"
              onClick={() =>
                setMessage(
                  "Last 5 login activities loaded."
                )
              }
            >
              View History
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderAccount = () => {
    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon blue">
            <CreditCard size={21} />
          </div>

          <div>
            <h2>Account Settings</h2>
            <p>
              Manage your TeamFlow account information.
            </p>
          </div>
        </div>

        <div className="large-settings-grid">
          <div className="setting-block">
            <label>Username</label>

            <div className="setting-input-row">
              <input
                value={form.username}
                onChange={(e) =>
                  updateForm(
                    "username",
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                onClick={saveProfile}
              >
                <Save size={16} />
                Save
              </button>
            </div>
          </div>

          <div className="setting-block">
            <label>Email Address</label>

            <input
              value={form.email}
              onChange={(e) =>
                updateForm("email", e.target.value)
              }
              type="email"
            />
          </div>

          <div className="setting-block">
            <label>Account ID</label>

            <div className="readonly-input">
              {profile.accountId}

              <button
                type="button"
                onClick={copyAccountId}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>

          <div className="setting-block">
            <label>Account Type</label>

            <div className="plan-box">
              <div>
                <strong>Free Plan</strong>
                <span>
                  Upgrade to unlock advanced features.
                </span>
              </div>

              <button
                type="button"
                onClick={() =>
                  setActiveSection("billing")
                }
              >
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const renderWorkspace = () => {
    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon purple">
            <Building2 size={21} />
          </div>

          <div>
            <h2>Workspace Settings</h2>
            <p>
              Configure your TeamFlow workspace.
            </p>
          </div>
        </div>

        <div className="large-settings-grid">
          <div className="setting-block">
            <label>Workspace Name</label>

            <input
              value={workspaceName}
              onChange={(e) =>
                setWorkspaceName(e.target.value)
              }
            />
          </div>

          <div className="setting-block">
            <label>Workspace Plan</label>

            <select
              value={workspacePlan}
              onChange={(e) =>
                setWorkspacePlan(e.target.value)
              }
            >
              <option>Free Plan</option>
              <option>Pro Plan</option>
              <option>Business Plan</option>
            </select>
          </div>

          <div className="setting-block">
            <label>Workspace URL</label>

            <input
              value="teamflow.local/product-team"
              readOnly
            />
          </div>

          <div className="setting-block">
            <label>Default Member Role</label>

            <select defaultValue="Member">
              <option>Member</option>
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>

        <div className="card-actions">
          <button
            className="primary-button"
            type="button"
            onClick={saveWorkspace}
          >
            <Save size={17} />
            Save Workspace
          </button>
        </div>
      </section>
    );
  };

  const renderNotifications = () => {
    const items = [
      [
        "email",
        "Email Notifications",
        "Receive important updates through email.",
      ],
      [
        "taskAssigned",
        "Task Assigned",
        "Notify me when a task is assigned to me.",
      ],
      [
        "taskCompleted",
        "Task Completed",
        "Notify me when a task is completed.",
      ],
      [
        "projectUpdates",
        "Project Updates",
        "Receive updates from projects I follow.",
      ],
      [
        "chatMessages",
        "Chat Messages",
        "Notify me about new team messages.",
      ],
      [
        "weeklySummary",
        "Weekly Summary",
        "Receive a weekly productivity summary.",
      ],
    ];

    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon orange">
            <Bell size={21} />
          </div>

          <div>
            <h2>Notification Settings</h2>
            <p>
              Choose which notifications TeamFlow sends
              you.
            </p>
          </div>
        </div>

        <div className="toggle-list">
          {items.map(
            ([key, title, description]) => (
              <div
                className="toggle-row"
                key={key}
              >
                <div>
                  <strong>{title}</strong>
                  <span>{description}</span>
                </div>

                <button
                  type="button"
                  className={`toggle ${
                    notifications[key]
                      ? "on"
                      : ""
                  }`}
                  onClick={() =>
                    handleNotificationChange(
                      key,
                      !notifications[key]
                    )
                  }
                  aria-label={`Toggle ${title}`}
                >
                  <span />
                </button>
              </div>
            )
          )}
        </div>
      </section>
    );
  };

  const renderAppearance = () => {
    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon pink">
            <Palette size={21} />
          </div>

          <div>
            <h2>Appearance</h2>
            <p>
              Customize how TeamFlow looks on your device.
            </p>
          </div>
        </div>

        <div className="appearance-options">
          <button
            type="button"
            className={`appearance-option ${
              appearance === "light" ? "selected" : ""
            }`}
            onClick={() =>
              setAppearance("light")
            }
          >
            <Sun size={28} />
            <strong>Light</strong>
            <span>Clean and bright interface.</span>
          </button>

          <button
            type="button"
            className={`appearance-option ${
              appearance === "dark" ? "selected" : ""
            }`}
            onClick={() =>
              setAppearance("dark")
            }
          >
            <Moon size={28} />
            <strong>Dark</strong>
            <span>Comfortable for low-light work.</span>
          </button>

          <button
            type="button"
            className={`appearance-option ${
              appearance === "system"
                ? "selected"
                : ""
            }`}
            onClick={() =>
              setAppearance("system")
            }
          >
            <Laptop size={28} />
            <strong>System</strong>
            <span>Follow your device settings.</span>
          </button>
        </div>
      </section>
    );
  };

  const renderSecurity = () => {
    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon green">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2>Security</h2>
            <p>
              Protect your account and manage security
              preferences.
            </p>
          </div>
        </div>

        <div className="security-settings-list">
          <div className="security-setting">
            <div className="security-setting-icon">
              <Lock size={20} />
            </div>

            <div>
              <strong>Password</strong>
              <span>
                Change your account password regularly.
              </span>
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() =>
                setShowPasswordModal(true)
              }
            >
              Change Password
            </button>
          </div>

          <div className="security-setting">
            <div className="security-setting-icon">
              <Shield size={20} />
            </div>

            <div>
              <strong>
                Two-Factor Authentication
              </strong>
              <span>
                Add another layer of protection to your
                account.
              </span>
            </div>

            <button
              type="button"
              className={`security-action ${
                twoFactor ? "enabled" : ""
              }`}
              onClick={() =>
                setTwoFactor((value) => !value)
              }
            >
              {twoFactor ? (
                <>
                  <CheckCircle2 size={16} />
                  Enabled
                </>
              ) : (
                "Enable"
              )}
            </button>
          </div>

          <div className="security-setting">
            <div className="security-setting-icon">
              <Monitor size={20} />
            </div>

            <div>
              <strong>Active Sessions</strong>
              <span>
                You currently have 3 active sessions.
              </span>
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() =>
                setMessage(
                  "Session list: Windows PC, Chrome, Mobile."
                )
              }
            >
              View Sessions
            </button>
          </div>

          <div className="security-setting">
            <div className="security-setting-icon">
              <Clock3 size={20} />
            </div>

            <div>
              <strong>Login History</strong>
              <span>
                Review recent sign-in activity.
              </span>
            </div>

            <button
              type="button"
              className="outline-button"
              onClick={() =>
                setMessage(
                  "Recent login: Oct 20, 2026."
                )
              }
            >
              View History
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderIntegrations = () => {
    const apps = [
      {
        key: "google",
        name: "Google",
        description:
          "Connect Google services and calendar.",
        icon: "G",
      },
      {
        key: "github",
        name: "GitHub",
        description:
          "Connect repositories and development activity.",
        icon: "GH",
      },
      {
        key: "slack",
        name: "Slack",
        description:
          "Send TeamFlow notifications to Slack.",
        icon: "S",
      },
      {
        key: "microsoft",
        name: "Microsoft",
        description:
          "Connect Microsoft productivity services.",
        icon: "M",
      },
    ];

    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon purple">
            <Link2 size={21} />
          </div>

          <div>
            <h2>Integrations</h2>
            <p>
              Connect TeamFlow with the tools your team
              uses.
            </p>
          </div>
        </div>

        <div className="integration-grid">
          {apps.map((app) => (
            <div
              className="integration-card"
              key={app.key}
            >
              <div className="integration-logo">
                {app.icon}
              </div>

              <div className="integration-content">
                <strong>{app.name}</strong>
                <span>{app.description}</span>
              </div>

              <button
                type="button"
                className={
                  integrations[app.key]
                    ? "connected-button"
                    : "outline-button"
                }
                onClick={() =>
                  toggleIntegration(app.key)
                }
              >
                {integrations[app.key] ? (
                  <>
                    <Check size={15} />
                    Connected
                  </>
                ) : (
                  <>
                    <Plug size={15} />
                    Connect
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </section>
    );
  };

  const renderBilling = () => {
    return (
      <section className="settings-card full-section-card">
        <div className="settings-card-header">
          <div className="section-icon yellow">
            <Crown size={21} />
          </div>

          <div>
            <h2>Billing & Plans</h2>
            <p>
              Manage your TeamFlow subscription.
            </p>
          </div>
        </div>

        <div className="current-plan">
          <div>
            <span>Current Plan</span>
            <h3>{workspacePlan}</h3>
            <p>
              Your workspace is currently using the
              {workspacePlan.toLowerCase()}.
            </p>
          </div>

          <div className="plan-price">
            {workspacePlan === "Free Plan"
              ? "$0"
              : "$12"}
            <span>/ user / month</span>
          </div>
        </div>

        <div className="billing-plans">
          <div className="billing-plan">
            <h3>Free</h3>
            <strong>$0</strong>
            <span>Basic collaboration</span>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setWorkspacePlan("Free Plan");

                localStorage.setItem(
                  "teamflow_workspace_plan",
                  "Free Plan"
                );

                setMessage(
                  "Free Plan selected."
                );
              }}
            >
              Select
            </button>
          </div>

          <div className="billing-plan featured">
            <div className="popular-label">
              Most Popular
            </div>

            <h3>Pro</h3>
            <strong>$12</strong>
            <span>Advanced team features</span>

            <button
              type="button"
              className="primary-button"
              onClick={() => {
                setWorkspacePlan("Pro Plan");

                localStorage.setItem(
                  "teamflow_workspace_plan",
                  "Pro Plan"
                );

                setMessage(
                  "Pro Plan selected for this demo."
                );
              }}
            >
              Upgrade
            </button>
          </div>

          <div className="billing-plan">
            <h3>Business</h3>
            <strong>$25</strong>
            <span>For growing organizations</span>

            <button
              type="button"
              className="secondary-button"
              onClick={() => {
                setWorkspacePlan(
                  "Business Plan"
                );

                localStorage.setItem(
                  "teamflow_workspace_plan",
                  "Business Plan"
                );

                setMessage(
                  "Business Plan selected for this demo."
                );
              }}
            >
              Upgrade
            </button>
          </div>
        </div>
      </section>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "profile":
        return renderProfile();

      case "account":
        return renderAccount();

      case "workspace":
        return renderWorkspace();

      case "notifications":
        return renderNotifications();

      case "appearance":
        return renderAppearance();

      case "security":
        return renderSecurity();

      case "integrations":
        return renderIntegrations();

      case "billing":
        return renderBilling();

      default:
        return renderProfile();
    }
  };

  const filteredMenu = settingsMenu.filter(
    (item) =>
      item.label
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const activeItem = settingsMenu.find(
    (item) => item.id === activeSection
  );

  return (
    <div className="settings-layout">
      <AppSidebar />

      <main className="settings-main">
        <header className="settings-topbar">
          <div className="settings-search">
            <Search size={19} />

            <input
              placeholder="Search files, folders, projects, members..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />
          </div>

          <div className="topbar-right">
            <button
              className="topbar-icon-button"
              type="button"
              onClick={() =>
                setMessage(
                  "You have 3 notifications."
                )
              }
            >
              <Bell size={20} />

              <span className="notification-dot" />
            </button>

            <button
              className="topbar-icon-button"
              type="button"
              onClick={() =>
                setMessage(
                  "TeamFlow Help Center opened."
                )
              }
            >
              ?
            </button>

            <div className="topbar-user">
              <div className="topbar-avatar">
                {profile.photo ? (
                  <img
                    src={profile.photo}
                    alt=""
                  />
                ) : (
                  <>
                    {profile.firstName.charAt(0)}
                    {profile.lastName.charAt(0)}
                  </>
                )}
              </div>

              <div>
                <strong>
                  {profile.firstName}{" "}
                  {profile.lastName}
                </strong>

                <span>{profile.team}</span>
              </div>

              <ChevronRight size={17} />
            </div>
          </div>
        </header>

        <div className="settings-page">
          <div className="settings-heading">
            <div className="settings-title-icon">
              <SettingsIcon size={29} />
            </div>

            <div>
              <h1>Settings</h1>

              <p>
                Manage your account, workspace and
                preferences.
              </p>
            </div>
          </div>

          {message && (
            <div className="settings-toast">
              <CheckCircle2 size={17} />
              {message}
            </div>
          )}

          <div className="settings-content">
            <aside className="settings-menu">
              {filteredMenu.length > 0 ? (
                filteredMenu.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      key={item.id}
                      className={`settings-menu-item ${
                        activeSection === item.id
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        setActiveSection(item.id)
                      }
                    >
                      <Icon size={19} />

                      <span>{item.label}</span>

                      <ChevronRight size={17} />
                    </button>
                  );
                })
              ) : (
                <div className="no-settings-results">
                  No settings found.
                </div>
              )}
            </aside>

            <section className="settings-panel">
              <div className="mobile-section-heading">
                <span>
                  {activeItem?.label}
                </span>
              </div>

              {renderSection()}
            </section>
          </div>
        </div>
      </main>

      {showPasswordModal && (
        <div
          className="modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowPasswordModal(false);
            }
          }}
        >
          <div className="password-modal">
            <div className="modal-header">
              <div>
                <h2>Change Password</h2>

                <p>
                  Create a new secure password for your
                  account.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="modal-form">
              <div className="form-group">
                <label>Current Password</label>

                <div className="password-field">
                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={passwordData.current}
                    onChange={(e) =>
                      setPasswordData(
                        (previous) => ({
                          ...previous,
                          current:
                            e.target.value,
                        })
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>New Password</label>

                <div className="password-field">
                  <input
                    type={
                      showNewPassword
                        ? "text"
                        : "password"
                    }
                    value={
                      passwordData.newPassword
                    }
                    onChange={(e) =>
                      setPasswordData(
                        (previous) => ({
                          ...previous,
                          newPassword:
                            e.target.value,
                        })
                      )
                    }
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowNewPassword(
                        (value) => !value
                      )
                    }
                  >
                    {showNewPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Confirm New Password
                </label>

                <input
                  type="password"
                  value={passwordData.confirm}
                  onChange={(e) =>
                    setPasswordData(
                      (previous) => ({
                        ...previous,
                        confirm: e.target.value,
                      })
                    )
                  }
                />
              </div>

              {passwordError && (
                <div className="modal-error">
                  <CircleAlert size={17} />
                  {passwordError}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  setShowPasswordModal(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={changePassword}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;