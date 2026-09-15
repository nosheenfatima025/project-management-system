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

function ProtectedRoute({ children }) { return localStorage.getItem('projectflow_token') ? children : <Navigate to="/login" replace />; }

export default ProtectedRoute;
