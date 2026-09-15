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

function Landing(){return <div className="landing"><nav className="landing-nav"><Logo/><div className="landing-links"><a href="#features">Features</a><a href="#about">About</a></div><div><Link className="outline-btn" to="/login">Login</Link><Link className="primary-btn" to="/register">Get Started</Link></div></nav><section className="landing-hero"><div><span className="eyebrow">SMART PROJECT MANAGEMENT</span><h1>Plan. Collaborate.<br/>Achieve <em>Together.</em></h1><p>The modern project management platform that helps teams turn ideas into reality.</p><div className="hero-actions"><Link className="primary-btn" to="/register">Get Started Free <ArrowRight size={16}/></Link><a className="outline-btn" href="#features">Explore Features</a></div></div><div className="hero-illustration"><div className="glow"/><div className="screen-card"><div className="screen-line long"/><div className="screen-line"/><div className="screen-row"><span/><span/><span/></div><div className="screen-row"><span/><span/><span/></div></div><div className="person">●</div></div></section><section id="features" className="feature-strip">{[[CheckSquare,'Task Management','Organize your work'],[Users,'Team Collaboration','Work together easily'],[TrendingUp,'Progress Tracking','Track project status'],[ShieldCheck,'Secure & Reliable','Your data is safe']].map(([I,t,s])=><div key={t}><span className="feature-icon"><I size={18}/></span><div><b>{t}</b><small>{s}</small></div></div>)}</section><section className="why" id="about"><div><span className="eyebrow">WHY PROJECTFLOW?</span><h2>Build Better Together.</h2><p>Powerful features to help your team succeed.</p></div><div className="why-grid">{[[LockKeyhole,'Secure','Your data is protected.'],[Zap,'Fast','Built for speed.'],[Smartphone,'Flexible','Work on every device.'],[Headphones,'Support','Help when you need it.']].map(([I,t,s])=><div key={t}><I size={21}/><b>{t}</b><small>{s}</small></div>)}</div></section></div>}

export default Landing;
