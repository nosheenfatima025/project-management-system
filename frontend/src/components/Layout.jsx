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

function Layout({ children }) {
  const [open,setOpen] = useState(false); const nav = useNavigate(); const user = getUser();
  const logout = () => { localStorage.removeItem('projectflow_token'); localStorage.removeItem('projectflow_user'); nav('/login'); };
  return <div className="app-shell"><aside className={'sidebar '+(open?'open':'')}><div className="sidebar-top"><Logo light/><button className="close-mobile" onClick={()=>setOpen(false)}><X size={20}/></button></div><div className="side-links">{navItems.map(([to,label,Icon])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'side-link active':'side-link'}><Icon size={17}/><span>{label}</span></NavLink>)}</div><button className="logout-btn" onClick={logout}><LogOut size={17}/> Logout</button></aside>{open&&<div className="mobile-overlay" onClick={()=>setOpen(false)}/>}<main className="main-area"><header className="topbar"><button className="menu-btn" onClick={()=>setOpen(true)}><Menu size={22}/></button><div className="top-search"><Search size={16}/><input placeholder="Search anything..."/></div><div className="top-actions"><button className="icon-btn"><Bell size={18}/></button><div className="user-chip"><div className="avatar">{(user?.name||'U').slice(0,2).toUpperCase()}</div><div><b>{user?.name || 'User'}</b><small>{user?.role || 'employee'}</small></div><ChevronDown size={14}/></div></div></header><div className="content">{children}</div></main></div>;
}

export default Layout;
