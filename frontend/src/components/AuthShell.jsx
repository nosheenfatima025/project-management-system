import {
  LayoutDashboard, FolderKanban, CheckSquare, CalendarDays, Users,
  BarChart3, Settings, LogOut, Menu, X, Search, Bell, ChevronDown,
  Plus, ArrowRight, ShieldCheck, Zap, Smartphone, Headphones,
  CheckCircle2, TrendingUp, Package, LockKeyhole, Mail, Eye, EyeOff,
  Pencil, Trash2, Filter
} from 'lucide-react';
import { BrowserRouter, Navigate, NavLink, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getUser, isAdmin } from '../lib/auth';

function AuthShell({ children, register=false }) { return <div className="auth-page"><div className="auth-card"><div className="auth-form"><Logo/><div className="auth-heading"><h1>{register?'Create Your Account':'Welcome Back!'}</h1><p>{register?'Join us and start your journey.':'Sign in to your account to continue.'}</p></div>{children}</div><div className="auth-art"><div><b>{register?'Build Better Teams.':'Better Teams Build Great Projects.'}</b><span>Plan, collaborate and achieve together.</span></div><div className="mountains"/></div></div></div>; }

export default AuthShell;
