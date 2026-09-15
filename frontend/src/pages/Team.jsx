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

function Team(){const [users,setUsers]=useState([]);const load=()=>api.get('/auth/team').then(r=>setUsers(r.data||[])).catch(e=>alert(e.response?.data?.message||'Only admin can view team'));useEffect(()=>{load()},[]);const changeRole=async(id,role)=>{try{await api.put('/auth/team/'+id+'/role',{role});load()}catch(e){alert(e.response?.data?.message||'Role update failed')}};if(!isAdmin())return <AccessDenied/>;return <><PageHead title="Team Members" sub="Admin-controlled employees and roles."/><div className="panel"><div className="team-table"><div className="team-row team-head"><span>Name</span><span>Email</span><span>Role</span><span>Status</span></div>{users.map(u=><div className="team-row" key={u._id}><div className="member"><div className="avatar">{u.name.slice(0,2).toUpperCase()}</div><b>{u.name}</b></div><span>{u.email}</span><select value={u.role} onChange={e=>changeRole(u._id,e.target.value)}><option>admin</option><option>employee</option><option>developer</option><option>designer</option><option>tester</option><option>client</option></select><span className="active-pill">Active</span></div>)}</div></div></>}

export default Team;
