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

function Login(){ const nav=useNavigate(); const [form,setForm]=useState({email:'',password:''}); const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const submit=async e=>{e.preventDefault();setLoading(true);try{const r=await api.post('/auth/login',form);localStorage.setItem('projectflow_token',r.data.token);localStorage.setItem('projectflow_user',JSON.stringify(r.data.user));nav('/dashboard')}catch(err){alert(err.response?.data?.message||'Login failed')}finally{setLoading(false)}}; return <AuthShell><form className="auth-fields" onSubmit={submit}><label>Email Address</label><div className="field-icon"><Mail size={16}/><input required type="email" value={form.email} placeholder="Enter your email" onChange={e=>setForm({...form,email:e.target.value})}/></div><label>Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type={show?'text':'password'} value={form.password} placeholder="Enter your password" onChange={e=>setForm({...form,password:e.target.value})}/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div><button className="primary-btn full" disabled={loading}>{loading?'Signing in...':'Login'}</button><p className="auth-foot">Don't have an account? <Link to="/register">Register</Link></p></form></AuthShell>; }

export default Login;
