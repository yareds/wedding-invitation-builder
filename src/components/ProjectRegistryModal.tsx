import React, { useState, useEffect } from 'react';
import { WeddingConfig, RSVPData } from '../types';
import {
  getAllSavedProjects,
  getAllProjectsFromFirestore,
  deleteProjectFromDatabase,
  subscribeToRSVPs,
  SavedProject
} from '../utils/projectDatabase';
import { generateAndDownloadProjectZip } from '../utils/projectExporter';
import { auth, googleProvider } from '../lib/firebase';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  X,
  FolderOpen,
  Download,
  Trash2,
  Calendar,
  Check,
  Copy,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Globe,
  Lock,
  LogOut,
  AlertCircle,
  UserCheck,
  CheckCircle2,
  Users,
  MessageSquare,
  PhoneCall,
  UserCheck2,
  UserX,
  RefreshCcw,
  CloudCheck,
  KeyRound
} from 'lucide-react';

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
  const [isLoadingFirestore, setIsLoadingFirestore] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [isExportingActive, setIsExportingActive] = useState<boolean>(false);

  // Active project RSVP inspection drawer state
  const [selectedRsvpProject, setSelectedRsvpProject] = useState<SavedProject | null>(null);
  const [projectRsvps, setProjectRsvps] = useState<RSVPData[]>([]);

  // Firebase Authentication state
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAuthenticatingGoogle, setIsAuthenticatingGoogle] = useState<boolean>(false);
  const [confirmingDeleteId, setConfirmingDeleteId] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (user && user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setIsAuthenticated(true);
        loadProjectsFromDatabase();
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch projects from Firestore on modal open & auth
  useEffect(() => {
    if (isOpen && isAuthenticated) {
      loadProjectsFromDatabase();
    }
  }, [isOpen, isAuthenticated]);

  const loadProjectsFromDatabase = async () => {
    setIsLoadingFirestore(true);
    setProjects(getAllSavedProjects());
    try {
      const remote = await getAllProjectsFromFirestore();
      setProjects(remote);
    } catch (err) {
      console.error('Firestore load error:', err);
    } finally {
      setIsLoadingFirestore(false);
    }
  };

  // Real-time Firestore RSVP subscription for active selected project
  useEffect(() => {
    if (selectedRsvpProject) {
      const unsubscribe = subscribeToRSVPs(selectedRsvpProject.id, (rsvps) => {
        setProjectRsvps(rsvps);
      });
      return () => unsubscribe();
    }
  }, [selectedRsvpProject]);

  if (!isOpen) return null;

  // Firebase Auth Google Sign-In
  const handleFirebaseGoogleSignIn = async () => {
    setIsAuthenticatingGoogle(true);
    setAuthError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
        setIsAuthenticated(true);
        setFirebaseUser(user);
        loadProjectsFromDatabase();
      } else {
        await signOut(auth);
        setIsAuthenticated(false);
        setFirebaseUser(null);
        setAuthError(
          `Access Denied: Firebase Auth User '${user.email}' is NOT authorized for Admin Dashboard access.`
        );
      }
    } catch (err: any) {
      console.error('Firebase Auth Sign-In Error:', err);
      // If iframe blocks popup or window closed, display clear feedback
      setAuthError(
        err.message || 'Firebase Authentication failed. Please ensure popups are allowed in browser.'
      );
    } finally {
      setIsAuthenticatingGoogle(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign out error:', err);
    }
    setIsAuthenticated(false);
    setFirebaseUser(null);
    setAuthError(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProjectFromDatabase(id);
      await loadProjectsFromDatabase();
      setConfirmingDeleteId(null);
    } catch (err: any) {
      console.error('Delete rejected by Firestore rules:', err);
      alert('Delete operation rejected: Firestore security rules permit deletion only for authenticated admin (yared.abegaz@gmail.com).');
    }
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

  // Calculate RSVP metrics for selected project
  const totalRsvpResponses = projectRsvps.length;
  const attendingRsvps = projectRsvps.filter((r) => r.attending);
  const totalAttendingSeats = attendingRsvps.reduce((acc, r) => acc + (r.guestCount || 1), 0);
  const decliningRsvps = projectRsvps.filter((r) => !r.attending);

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
                  {isAuthenticated ? 'Studio Admin Dashboard' : 'Log in'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#3B0B1F] text-[#C8A84B] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  <KeyRound className="w-3 h-3 text-[#C8A84B]" />
                  {isAuthenticated ? 'FIREBASE AUTH VERIFIED' : 'FIREBASE AUTH'}
                </span>
              </div>
              <p className="font-body text-xs text-[#3B0B1F]/70">
                Firebase Authentication &amp; Firestore Security Rules &bull; Admin Access Gate
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
                Admin Authentication Required
              </h3>
              <p className="font-body text-xs text-[#3B0B1F]/70 leading-relaxed max-w-sm mx-auto">
                Sign in with Firebase Authentication (Google Provider) to access the studio project registry.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-2xl bg-red-100 border border-red-300 text-red-800 text-xs flex items-start gap-2.5 text-left shadow-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {/* FIREBASE AUTH GOOGLE SIGN-IN BUTTON */}
            <div className="bg-[#FDF0F3] p-6 rounded-2xl border-2 border-[#C8A84B]/60 shadow-md space-y-4 text-center">
              <div className="flex items-center justify-center gap-2">
                <GoogleGIcon />
                <span className="font-body text-xs font-bold uppercase tracking-wider text-[#3B0B1F]">
                  Firebase Auth &bull; Google Sign-In
                </span>
              </div>

              <p className="font-body text-xs text-[#3B0B1F]/80 max-w-xs mx-auto leading-relaxed">
                Click below to authenticate using real Firebase Auth Google Provider.
              </p>

              <button
                type="button"
                onClick={handleFirebaseGoogleSignIn}
                disabled={isAuthenticatingGoogle}
                className="w-full py-3.5 px-4 rounded-xl bg-white border border-gray-300 hover:border-[#C8A84B] text-gray-800 font-body text-xs font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-[0.99]"
              >
                <GoogleGIcon />
                <span className="text-sm font-medium">
                  {isAuthenticatingGoogle ? 'Authenticating with Firebase Auth...' : 'Sign in with Google (Firebase Auth)'}
                </span>
              </button>

              <div className="pt-1 flex items-center justify-center gap-1.5 text-[11px] text-[#3B0B1F]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C8A84B]" />
                <span>Enforced by Firestore Security Rules (<code className="font-mono">request.auth.token.email</code>)</span>
              </div>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED ADMIN DASHBOARD VIEW */
          <>
            {/* Admin Session Identity Bar */}
            <div className="mb-4 p-3.5 rounded-2xl bg-[#3B0B1F]/5 border border-[#C8A84B]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-body">
                {firebaseUser?.photoURL ? (
                  <img
                    src={firebaseUser.photoURL}
                    alt="Firebase Auth Profile"
                    className="w-8 h-8 rounded-full border border-[#C8A84B] object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#3B0B1F] text-[#C8A84B] flex items-center justify-center font-bold">
                    YA
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3B0B1F]">
                      {firebaseUser?.displayName || 'Yared Abegaz'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                      <CloudCheck className="w-3 h-3 text-emerald-600" />
                      FIREBASE AUTH VERIFIED &bull; UID: {firebaseUser?.uid.slice(0, 8)}...
                    </span>
                  </div>
                  <div className="text-[11px] text-[#3B0B1F]/70 font-mono">
                    {firebaseUser?.email || AUTHORIZED_ADMIN_EMAIL}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={loadProjectsFromDatabase}
                  className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FDF0F3] border border-[#C8A84B]/40 text-[#3B0B1F] font-body text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  title="Sync with Firestore Database"
                >
                  <RefreshCcw className={`w-3.5 h-3.5 text-[#C8A84B] ${isLoadingFirestore ? 'animate-spin' : ''}`} />
                  <span>Sync Firestore</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-body text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                  title="Sign out of Firebase Auth"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Selected Project RSVP Inspection Overlay / Drawer */}
            {selectedRsvpProject && (
              <div className="mb-6 p-5 rounded-2xl bg-[#2D0817] text-[#FDF0F3] border-2 border-[#C8A84B] shadow-2xl space-y-4 animate-fadeIn">
                <div className="flex items-start justify-between border-b border-[#C8A84B]/30 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#C8A84B] text-[#3B0B1F] font-mono text-[10px] font-bold uppercase">
                        {selectedRsvpProject.id}
                      </span>
                      <span className="text-xs text-[#C8A84B] font-mono flex items-center gap-1">
                        <CloudCheck className="w-3.5 h-3.5 text-emerald-400" /> Live Firestore Collection: projects/{selectedRsvpProject.id}/rsvps
                      </span>
                    </div>
                    <h3 className="font-serif-heading text-xl font-bold text-[#C8A84B]">
                      Guest RSVP Dashboard &bull; {selectedRsvpProject.coupleNames}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedRsvpProject(null)}
                    className="p-1.5 rounded-full bg-[#3B0B1F] text-gray-300 hover:text-white border border-[#C8A84B]/40 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* RSVP Summary Metrics Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#3B0B1F] border border-[#C8A84B]/30">
                    <p className="text-[10px] font-bold uppercase text-[#C8A84B] tracking-wider">Total Submissions</p>
                    <p className="font-serif-heading text-2xl font-bold text-white mt-1">{totalRsvpResponses}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#3B0B1F] border border-emerald-500/40">
                    <p className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">Attending Parties</p>
                    <p className="font-serif-heading text-2xl font-bold text-emerald-400 mt-1">{attendingRsvps.length}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#3B0B1F] border border-[#C8A84B]/40">
                    <p className="text-[10px] font-bold uppercase text-[#C8A84B] tracking-wider">Total Seats Confirmed</p>
                    <p className="font-serif-heading text-2xl font-bold text-[#C8A84B] mt-1">{totalAttendingSeats}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#3B0B1F] border border-rose-500/40">
                    <p className="text-[10px] font-bold uppercase text-rose-400 tracking-wider">Declines</p>
                    <p className="font-serif-heading text-2xl font-bold text-rose-400 mt-1">{decliningRsvps.length}</p>
                  </div>
                </div>

                {/* Guest Response List */}
                {projectRsvps.length === 0 ? (
                  <div className="p-6 text-center bg-[#3B0B1F] rounded-xl border border-dashed border-[#C8A84B]/30 space-y-1">
                    <Users className="w-8 h-8 text-[#C8A84B] mx-auto opacity-70" />
                    <p className="text-xs font-bold text-[#C8A84B]">No Guest RSVPs Received Yet</p>
                    <p className="text-[11px] text-gray-300">
                      When guests fill out the RSVP form on the wedding invitation website, their live responses will stream instantly into this Firestore subcollection.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[30vh] overflow-y-auto pr-1">
                    {projectRsvps.map((rsvp, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#3B0B1F] border border-[#C8A84B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{rsvp.guestName}</span>
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                                rsvp.attending
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                                  : 'bg-rose-950 text-rose-300 border border-rose-700'
                              }`}
                            >
                              {rsvp.attending ? (
                                <>
                                  <UserCheck2 className="w-3 h-3 text-emerald-400" /> Joyfully Attending ({rsvp.guestCount} seat/s)
                                </>
                              ) : (
                                <>
                                  <UserX className="w-3 h-3 text-rose-400" /> Declined
                                </>
                              )}
                            </span>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-gray-300">
                            {rsvp.phone && (
                              <span className="flex items-center gap-1">
                                <PhoneCall className="w-3 h-3 text-[#C8A84B]" /> {rsvp.phone}
                              </span>
                            )}
                            {rsvp.submittedAt && (
                              <span className="text-gray-400">
                                Submitted: {new Date(rsvp.submittedAt).toLocaleString()}
                              </span>
                            )}
                          </div>

                          {rsvp.message && (
                            <p className="text-gray-300 italic pt-1 border-t border-gray-800 text-[11px] mt-1">
                              "{rsvp.message}"
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Active Customizer Standalone Export Banner */}
            {currentConfig && !selectedRsvpProject && (
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
                <span>Saved Projects Firestore Database ({projects.length})</span>
              </h3>
            </div>

            {/* Project List */}
            {projects.length === 0 ? (
              <div className="text-center py-12 bg-[#FDF0F3] rounded-2xl border border-dashed border-[#C8A84B]/40 space-y-3">
                <FolderOpen className="w-10 h-10 text-[#C8A84B] mx-auto opacity-70" />
                <h3 className="font-serif-heading text-lg text-[#3B0B1F]">No Saved Customer Projects Yet</h3>
                <p className="font-body text-xs text-[#3B0B1F]/60 max-w-md mx-auto">
                  When couples create or submit orders in the builder, their project records will automatically populate in Firestore.
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
                      {/* View Firestore RSVPs Button */}
                      <button
                        onClick={() => setSelectedRsvpProject(proj)}
                        className="px-3.5 py-2 rounded-xl bg-[#C8A84B] text-[#3B0B1F] font-body text-xs font-bold hover:bg-[#E2C873] transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                        title="View live Firestore guest RSVPs"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>Guest RSVPs</span>
                      </button>

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
                        className="p-2.5 rounded-xl bg-white border border-[#C8A84B]/40 text-[#3B0B1F] hover:bg-[#FDF0F3] transition-all cursor-pointer"
                        title="Download static HTML ZIP website package"
                      >
                        <Download className="w-4 h-4 text-[#C8A84B]" />
                      </button>

                      <button
                        onClick={() => handleCopyUrl(proj.customUrl || `https://wedding-invitations.et/view/${proj.id}`, proj.id)}
                        className="p-2.5 rounded-xl bg-white border border-[#C8A84B]/40 text-[#3B0B1F] hover:bg-[#FDF0F3] transition-all cursor-pointer"
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
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-all cursor-pointer"
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
