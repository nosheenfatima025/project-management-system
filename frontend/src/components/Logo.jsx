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

function Logo({ light=false }) { return <div className={'logo '+(light?'logo-light':'')}><span className="logo-mark">◆</span><span>ProjectFlow</span></div>; }

export default Logo;
