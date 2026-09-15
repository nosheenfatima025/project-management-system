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

function Register(){ const nav=useNavigate(); const [form,setForm]=useState({name:'',email:'',password:''}); const [confirm,setConfirm]=useState(''); const [loading,setLoading]=useState(false); const submit=async e=>{e.preventDefault();if(form.password!==confirm)return alert('Passwords do not match');setLoading(true);try{const r=await api.post('/auth/register',form);localStorage.setItem('projectflow_token',r.data.token);localStorage.setItem('projectflow_user',JSON.stringify(r.data.user));nav('/dashboard')}catch(err){alert(err.response?.data?.message||'Registration failed')}finally{setLoading(false)}}; return <AuthShell register><form className="auth-fields" onSubmit={submit}><label>Full Name</label><div className="field-icon"><Users size={16}/><input required value={form.name} placeholder="Enter your full name" onChange={e=>setForm({...form,name:e.target.value})}/></div><label>Email Address</label><div className="field-icon"><Mail size={16}/><input required type="email" value={form.email} placeholder="Enter your email" onChange={e=>setForm({...form,email:e.target.value})}/></div><label>Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type="password" value={form.password} placeholder="Create a password" onChange={e=>setForm({...form,password:e.target.value})}/></div><label>Confirm Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type="password" value={confirm} placeholder="Confirm your password" onChange={e=>setConfirm(e.target.value)}/></div><button className="primary-btn full" disabled={loading}>{loading?'Creating...':'Register'}</button><p className="auth-foot">Already have an account? <Link to="/login">Login</Link></p></form></AuthShell>; }

export default Register;
