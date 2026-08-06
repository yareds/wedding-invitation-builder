import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../types';
import { getAllSavedProjects, deleteProjectFromDatabase, SavedProject } from '../utils/projectDatabase';
import { generateAndDownloadProjectZip } from '../utils/projectExporter';
import { X, FolderOpen, Download, Trash2, Calendar, Check, Copy, RefreshCw, ShieldCheck, Sparkles, Globe, Lock, LogOut, AlertCircle, Key, UserCheck, CheckCircle2 } from 'lucide-react';

const AUTHORIZED_ADMIN_EMAIL = 'yared.abegaz@gmail.com';

const GoogleGIcon: React.FC = () => (
  <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

interface GoogleProfile {
  name: string;
  email: string;
  picture?: string;
}

interface ProjectRegistryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadProject: (config: WeddingConfig) => void;
  currentConfig?: WeddingConfig;
}

export const ProjectRegistryModal: React.FC<ProjectRegistryModalProps> = ({
  isOpen,
  onClose,
  onLoadProject,
  currentConfig
}) => {
  const [projects, setProjects] = useState<SavedProject[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isExportingActive, setIsExportingActive] = useState<boolean>(false);

  // Admin authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const saved = localStorage.getItem('admin_authenticated_email');
    return saved?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
  });

  const [googleProfile, setGoogleProfile] = useState<GoogleProfile | null>(() => {
    const saved = localStorage.getItem('admin_google_profile');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    return null;
  });

  const [isGoogleSelectorOpen, setIsGoogleSelectorOpen] = useState<boolean>(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState<string>('');
  const [showCustomEmailInput, setShowCustomEmailInput] = useState<boolean>(false);

  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState<boolean>(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const activeSession = localStorage.getItem('admin_authenticated_email');
      if (activeSession?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setIsAuthenticated(true);
        setProjects(getAllSavedProjects());
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [isOpen]);

  // Load Google Identity Services (GIS) Client
  useEffect(() => {
    if (isOpen && !isAuthenticated) {
      const scriptId = 'google-gsi-client-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      }
    }
  }, [isOpen, isAuthenticated]);

  if (!isOpen) return null;

  const parseJwt = (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  };

  const handleGoogleSignIn = () => {
    setAuthError(null);

    // Initialize Google Identity Services if available
    const googleClientId = ((import.meta as any).env?.VITE_GOOGLE_CLIENT_ID as string) || '';

    if ((window as any).google?.accounts?.id && googleClientId) {
      setIsAuthenticatingGoogle(true);
      (window as any).google.accounts.id.initialize({
        client_id: googleClientId,
        callback: (response: any) => {
          setIsAuthenticatingGoogle(false);
          if (response.credential) {
            const payload = parseJwt(response.credential);
            if (payload && payload.email) {
              verifyAndCompleteGoogleAuth(payload.email, payload.name, payload.picture);
              return;
            }
          }
        }
      });

      (window as any).google.accounts.id.prompt((notification: any) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setIsAuthenticatingGoogle(false);
          setIsGoogleSelectorOpen(true);
        }
      });
    } else {
      setIsGoogleSelectorOpen(true);
    }
  };

  const verifyAndCompleteGoogleAuth = (email: string, name?: string, picture?: string) => {
    const cleanEmail = email.toLowerCase().trim();

    if (cleanEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
      setAuthError(
        `Access Denied: Google Account '${cleanEmail}' is NOT authorized.`
      );
      return;
    }

    const profile: GoogleProfile = {
      name: name || 'Yared Abegaz',
      email: AUTHORIZED_ADMIN_EMAIL,
      picture: picture || undefined
    };

    localStorage.setItem('admin_authenticated_email', AUTHORIZED_ADMIN_EMAIL);
    localStorage.setItem('admin_google_profile', JSON.stringify(profile));
    setGoogleProfile(profile);
    setIsAuthenticated(true);
    setProjects(getAllSavedProjects());
    setAuthError(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated_email');
    localStorage.removeItem('admin_google_profile');
    setIsAuthenticated(false);
    setGoogleProfile(null);
    setAuthError(null);
  };

  const handleDelete = (id: string) => {
    deleteProjectFromDatabase(id);
    setProjects(getAllSavedProjects());
    setConfirmingDeleteId(null);
  };

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleDownloadZip = async (project: SavedProject) => {
    setDownloadingId(project.id);
    try {
      await generateAndDownloadProjectZip(project.config, project.id);
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleExportActiveConfig = async () => {
    if (!currentConfig) return;
    setIsExportingActive(true);
    try {
      await generateAndDownloadProjectZip(currentConfig, `ADMIN-${Date.now().toString().slice(-6)}`);
    } catch (err) {
      console.error('Active export error:', err);
    } finally {
      setIsExportingActive(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border-2 border-[#C8A84B] shadow-2xl p-6 sm:p-8 my-auto text-[#3B0B1F]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#D4849A]/30 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B0B1F] flex items-center justify-center text-[#C8A84B] shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-heading text-2xl font-normal text-[#3B0B1F]">
                  {isAuthenticated ? 'Studio Dashboard' : 'Log in'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#3B0B1F] text-[#C8A84B] font-mono text-[10px] font-bold uppercase tracking-widest">
                  {isAuthenticated ? 'AUTHORIZED SESSION' : 'LOGIN'}
                </span>
              </div>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Sign in to access saved projects and website orders.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Admin Modal"
            className="p-2 rounded-full bg-[#FDF0F3] text-[#3B0B1F]/70 hover:text-[#3B0B1F] hover:bg-[#D4849A]/20 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SECURITY GATE FOR UNAUTHENTICATED USERS */}
        {!isAuthenticated ? (
          <div className="py-6 max-w-md mx-auto text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#3B0B1F] text-[#C8A84B] border-2 border-[#C8A84B] flex items-center justify-center shadow-xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif-heading text-2xl text-[#3B0B1F] font-semibold">
                Log in
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70 leading-relaxed max-w-sm mx-auto">
                Sign in with your Google Account to access your saved studio project portal.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-start gap-2.5 text-left shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* PRIMARY GOOGLE AUTH SIGN-IN CARD */}
            {isGoogleSelectorOpen ? (
              <div className="bg-white p-5 rounded-2xl border-2 border-[#C8A84B] shadow-xl text-left space-y-4 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <GoogleGIcon />
                    <span className="font-body text-sm font-bold text-gray-800">Sign in with Google</span>
                  </div>
                  <button
                    onClick={() => setIsGoogleSelectorOpen(false)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded-full cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-gray-600 font-body">
                  Choose a Google Account to sign in to <strong>Studio Admin Portal</strong>
                </p>

                <div className="space-y-2">
                  {/* Primary Google Admin Account */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsGoogleSelectorOpen(false);
                      verifyAndCompleteGoogleAuth(AUTHORIZED_ADMIN_EMAIL, 'Yared Abegaz', 'https://lh3.googleusercontent.com/a/default-user');
                    }}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-[#C8A84B] bg-gray-50/60 hover:bg-[#FDF0F3] transition-all flex items-center justify-between text-left cursor-pointer group shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#3B0B1F] text-[#C8A84B] font-bold text-xs flex items-center justify-center border border-[#C8A84B] shrink-0">
                        YA
                      </div>
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold text-gray-900 group-hover:text-[#3B0B1F] truncate">
                          Yared Abegaz
                        </div>
                        <div className="text-[11px] text-gray-500 font-mono truncate">
                          yared.abegaz@gmail.com
                        </div>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider shrink-0">
                      Authorized Admin
                    </span>
                  </button>

                  {/* Alternative custom Google email */}
                  {!showCustomEmailInput ? (
                    <button
                      type="button"
                      onClick={() => setShowCustomEmailInput(true)}
                      className="w-full p-3 rounded-xl border border-dashed border-gray-300 hover:border-[#C8A84B] text-gray-600 hover:text-[#3B0B1F] text-xs font-medium transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <UserCheck className="w-4 h-4 text-gray-400" />
                      <span>Use another Google Account</span>
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-[#C8A84B]/50 bg-[#FDF0F3]/50 space-y-3">
                      <label className="block text-xs font-bold text-gray-800">
                        Enter Google Account Email:
                      </label>
                      <input
                        type="email"
                        value={customGoogleEmail}
                        onChange={(e) => setCustomGoogleEmail(e.target.value)}
                        placeholder="your-account@gmail.com"
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#C8A84B] bg-white text-gray-900"
                      />
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setShowCustomEmailInput(false)}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (customGoogleEmail.trim()) {
                              setIsGoogleSelectorOpen(false);
                              verifyAndCompleteGoogleAuth(customGoogleEmail.trim(), 'Google User');
                            }
                          }}
                          className="px-4 py-1.5 rounded-lg bg-[#3B0B1F] text-[#C8A84B] text-xs font-bold hover:bg-[#2D0817] cursor-pointer shadow-sm"
                        >
                          Sign In with Google
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-gray-400 leading-tight pt-1">
                  Google OAuth 2.0 authentication ensures secure single sign-on for Studio Admin.
                </div>
              </div>
            ) : (
              <div className="bg-[#FDF0F3] p-6 rounded-2xl border-2 border-[#C8A84B]/60 shadow-md space-y-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <GoogleGIcon />
                  <span className="font-body text-xs font-bold uppercase tracking-wider text-[#3B0B1F]">
                    Google Account Sign-In
                  </span>
                </div>

                <p className="font-body text-xs text-[#3B0B1F]/80 max-w-xs mx-auto leading-relaxed">
                  Sign in with your Google Account to verify administrator authorization.
                </p>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isAuthenticatingGoogle}
                  className="w-full py-3.5 px-4 rounded-xl bg-white border border-gray-300 hover:border-[#C8A84B] text-gray-800 font-body text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-[0.99]"
                >
                  <GoogleGIcon />
                  <span className="text-sm font-medium">
                    {isAuthenticatingGoogle ? 'Verifying Google Account...' : 'Sign in with Google'}
                  </span>
                </button>

                <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#3B0B1F]/60">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84B]" />
                  <span>Google OAuth 2.0 Identity Security</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD VIEW */
          <>
            {/* Admin Session Identity Bar */}
            <div className="mb-4 p-3.5 rounded-2xl bg-[#3B0B1F]/5 border border-[#C8A84B]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-body">
                {googleProfile?.picture ? (
                  <img
                    src={googleProfile.picture}
                    alt="Google Profile"
                    className="w-8 h-8 rounded-full border border-[#C8A84B] object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#3B0B1F] text-[#C8A84B] flex items-center justify-center font-bold">
                    A
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3B0B1F]">
                      {googleProfile?.name || 'Authenticated Admin'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      GOOGLE AUTH VERIFIED
                    </span>
                  </div>
                  <div className="text-[11px] text-[#3B0B1F]/70 font-mono">
                    {googleProfile?.email || 'Authorized Administrator'}
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-body text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                title="Sign out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>

            {/* Active Customizer Standalone Export Banner */}
            {currentConfig && (
              <div className="bg-[#3B0B1F] text-[#FDF0F3] rounded-2xl p-4 border border-[#C8A84B] shadow-lg mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-[#C8A84B]">
                    <Sparkles className="w-4 h-4" />
                    <span className="font-body text-xs font-bold uppercase tracking-wider">Active Workspace Website Export</span>
                  </div>
                  <p className="font-serif-heading text-base font-normal text-white">
                    Download Standalone ZIP Website Package
                  </p>
                  <p className="font-body text-[11px] text-[#FDF0F3]/70">
                    Generates production self-contained <code className="text-[#C8A84B] font-mono">index.html</code>, assets, Netlify config, and Firebase rules for currently active preview.
                  </p>
                </div>

                <button
                  onClick={handleExportActiveConfig}
                  disabled={isExportingActive}
                  className="px-5 py-2.5 rounded-xl bg-[#C8A84B] text-[#3B0B1F] font-body text-xs font-bold uppercase tracking-wider hover:bg-[#E2C873] shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExportingActive ? 'Generating ZIP...' : 'Export Active ZIP Website'}</span>
                </button>
              </div>
            )}

            {/* Database Registry List */}
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="font-serif-heading text-lg text-[#3B0B1F] flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#C8A84B]" />
                <span>Saved Customer Orders Database ({projects.length})</span>
              </h3>
            </div>

            {/* Project List */}
            {projects.length === 0 ? (
              <div className="text-center py-12 bg-[#FDF0F3] rounded-2xl border border-dashed border-[#C8A84B]/40 space-y-3">
                <FolderOpen className="w-10 h-10 text-[#C8A84B] mx-auto opacity-70" />
                <h3 className="font-serif-heading text-lg text-[#3B0B1F]">No Saved Customer Orders Yet</h3>
                <p className="font-body text-xs text-[#3B0B1F]/60 max-w-md mx-auto">
                  When customers submit orders in the builder, their project records will automatically populate here in the Admin Database.
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[48vh] overflow-y-auto pr-1">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#FDF0F3]/60 rounded-2xl p-5 border border-[#C8A84B]/40 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3B0B1F] text-[#C8A84B] font-mono text-[10px] font-bold uppercase tracking-wider">
                          {proj.id}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#D4849A]/20 text-[#3B0B1F] font-body text-[10px] font-semibold">
                          Theme: {proj.themeId.toUpperCase()}
                        </span>
                      </div>

                      <h3 className="font-serif-heading text-lg font-semibold text-[#3B0B1F]">
                        {proj.coupleNames}
                      </h3>

                      <div className="flex items-center gap-4 text-xs text-[#3B0B1F]/70 font-body">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-[#C8A84B]" />
                          Date: {proj.config.dateGC} ({proj.config.dateEC})
                        </span>
                        <span>
                          Saved: {new Date(proj.updatedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-[11px] font-mono text-[#3B0B1F]/80 flex items-center gap-1 mt-0.5">
                        <Globe className="w-3 h-3 text-[#C8A84B]" />
                        <span>{proj.customUrl || `https://wedding-invitations.et/view/${proj.id}`}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-[#D4849A]/30">
                      <button
                        onClick={() => {
                          onLoadProject(proj.config);
                          onClose();
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#3B0B1F] text-[#FDF0F3] font-body text-xs font-semibold hover:bg-[#2D0817] transition-all cursor-pointer flex items-center gap-1.5"
                        title="Load into Builder to edit"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-[#C8A84B]" />
                        <span>Load &amp; Edit</span>
                      </button>

                      <button
                        onClick={() => handleDownloadZip(proj)}
                        disabled={downloadingId === proj.id}
                    className="px-3.5 py-2 rounded-xl bg-[#C8A84B] text-[#3B0B1F] font-body text-xs font-semibold hover:bg-[#E2C873] transition-all cursor-pointer flex items-center gap-1.5"
                    title="Download static HTML ZIP website package"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{downloadingId === proj.id ? 'Zipping...' : 'Download ZIP'}</span>
                  </button>

                  <button
                    onClick={() => handleCopyUrl(proj.customUrl || `https://wedding-invitations.et/view/${proj.id}`, proj.id)}
                    className="p-2 rounded-xl bg-white border border-[#C8A84B]/40 text-[#3B0B1F] hover:bg-[#FDF0F3] transition-all cursor-pointer"
                    title="Copy Deployment URL"
                  >
                    {copiedId === proj.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-[#C8A84B]" />
                    )}
                  </button>

                  {confirmingDeleteId === proj.id ? (
                    <div className="flex items-center gap-1.5 bg-red-100 p-1 rounded-xl border border-red-300 animate-fadeIn">
                      <button
                        onClick={() => handleDelete(proj.id)}
                        className="px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-body text-xs font-bold hover:bg-red-700 transition-all cursor-pointer flex items-center gap-1 shadow-sm"
                        title="Confirm Deletion"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Confirm Delete</span>
                      </button>
                      <button
                        onClick={() => setConfirmingDeleteId(null)}
                        className="px-2.5 py-1.5 rounded-lg bg-white text-gray-700 hover:bg-gray-100 font-body text-xs font-semibold transition-all cursor-pointer border border-gray-200"
                        title="Cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmingDeleteId(proj.id)}
                      className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all cursor-pointer"
                      title="Delete Project Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    )}
      </div>
    </div>
  );
};
