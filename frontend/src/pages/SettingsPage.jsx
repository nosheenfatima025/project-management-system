import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FolderKanban, CheckSquare, Users, BarChart3, Search, Mail,
  LockKeyhole, Eye, EyeOff, ShieldCheck, Zap, Smartphone, Headphones,
  ArrowRight, TrendingUp, CheckCircle2, Package, Plus, Pencil, Trash2
} from 'lucide-react';
import api from '../services/api';
import { getUser, isAdmin } from '../lib/auth';
import PageHead from '../components/PageHead';
import StatCard from '../components/StatCard';
import AuthShell from '../components/AuthShell';

function SettingsPage(){const [user,setUser]=useState(getUser()||{});const [name,setName]=useState(user.name||'');const [saved,setSaved]=useState(false);const save=async e=>{e.preventDefault();try{const r=await api.put('/auth/me',{name});setUser(r.data);localStorage.setItem('projectflow_user',JSON.stringify(r.data));setSaved(true);setTimeout(()=>setSaved(false),2000)}catch(err){alert(err.response?.data?.message||'Update failed')}};return <><PageHead title="Settings" sub="Manage your real account information."/><div className="settings-grid"><section className="panel profile-panel"><div className="profile-cover"><div className="profile-avatar">{name.slice(0,2).toUpperCase()}</div></div><form className="profile-form" onSubmit={save}><label>Full Name<input value={name} onChange={e=>setName(e.target.value)} required/></label><label>Email Address<input value={user.email||''} readOnly/></label><label>Role<input value={user.role||''} readOnly/></label><button className="primary-btn">{saved?'Saved ✓':'Update Profile'}</button></form></section><section className="panel notification-panel"><div className="panel-head"><div><h2>Account Permissions</h2><small>Your access is controlled by your role.</small></div></div><div className="setting-row"><div><b>Current role</b><small>{user.role||'employee'}</small></div><span className="active-pill">Active</span></div><div className="setting-row"><div><b>Admin access</b><small>{user.role==='admin'?'Full system access':'Restricted to assigned work'}</small></div></div></section></div></>}

export default SettingsPage;
