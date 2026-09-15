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

function Reports(){const [p,setP]=useState([]);const [t,setT]=useState([]);useEffect(()=>{api.get('/projects').then(r=>setP(r.data||[]));api.get('/tasks').then(r=>setT(r.data||[]))},[]);return <><PageHead title="Reports" sub="Analytics calculated from your database records."/><div className="stats-grid"><StatCard icon={FolderKanban} title="Projects" value={p.length} change="Live data" kind="teal"/><StatCard icon={CheckSquare} title="Tasks" value={t.length} change="Live data" kind="purple"/><StatCard icon={CheckCircle2} title="Completed" value={t.filter(x=>x.status==='Completed').length} change="Live data" kind="green"/><StatCard icon={Users} title="Members" value="—" change="Admin team view" kind="blue"/></div><div className="panel empty-state"><BarChart3 size={42}/><h2>Reports are live</h2><p>These statistics are calculated directly from MongoDB. No demo records are added.</p></div></>}

export default Reports;
