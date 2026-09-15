import React, { useEffect, useMemo, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, CalendarDays, Users, BarChart3, Settings, LogOut, Menu, X, Search, Bell, ChevronDown, Plus, ArrowRight, ShieldCheck, Zap, Smartphone, Headphones, MoreVertical, CheckCircle2, TrendingUp, UserPlus, Package, LockKeyhole, Mail, Eye, EyeOff, Pencil, Trash2, Download, Filter } from 'lucide-react';
import api from './services/api';

const navItems = [['/dashboard','Dashboard',LayoutDashboard],['/projects','Projects',FolderKanban],['/tasks','Tasks',CheckSquare],['/calendar','Calendar',CalendarDays],['/team','Team',Users],['/reports','Reports',BarChart3],['/inventory','Inventory',Package],['/settings','Settings',Settings]];
const getUser = () => { try { return JSON.parse(localStorage.getItem('projectflow_user') || 'null'); } catch { return null; } };
const isAdmin = () => ['admin','administrator','system admin'].includes(String(getUser()?.role || '').trim().toLowerCase());

function Logo({ light=false }) { return <div className={'logo '+(light?'logo-light':'')}><span className="logo-mark">◆</span><span>ProjectFlow</span></div>; }
function ProtectedRoute({ children }) { return localStorage.getItem('projectflow_token') ? children : <Navigate to="/login" replace />; }
function Layout({ children }) {
  const [open,setOpen] = useState(false); const nav = useNavigate(); const user = getUser();
  const logout = () => { localStorage.removeItem('projectflow_token'); localStorage.removeItem('projectflow_user'); nav('/login'); };
  return <div className="app-shell"><aside className={'sidebar '+(open?'open':'')}><div className="sidebar-top"><Logo light/><button className="close-mobile" onClick={()=>setOpen(false)}><X size={20}/></button></div><div className="side-links">{navItems.map(([to,label,Icon])=><NavLink key={to} to={to} onClick={()=>setOpen(false)} className={({isActive})=>isActive?'side-link active':'side-link'}><Icon size={17}/><span>{label}</span></NavLink>)}</div><button className="logout-btn" onClick={logout}><LogOut size={17}/> Logout</button></aside>{open&&<div className="mobile-overlay" onClick={()=>setOpen(false)}/>}<main className="main-area"><header className="topbar"><button className="menu-btn" onClick={()=>setOpen(true)}><Menu size={22}/></button><div className="top-search"><Search size={16}/><input placeholder="Search anything..."/></div><div className="top-actions"><button className="icon-btn"><Bell size={18}/></button><div className="user-chip"><div className="avatar">{(user?.name||'U').slice(0,2).toUpperCase()}</div><div><b>{user?.name || 'User'}</b><small>{user?.role || 'employee'}</small></div><ChevronDown size={14}/></div></div></header><div className="content">{children}</div></main></div>;
}
function AuthShell({ children, register=false }) { return <div className="auth-page"><div className="auth-card"><div className="auth-form"><Logo/><div className="auth-heading"><h1>{register?'Create Your Account':'Welcome Back!'}</h1><p>{register?'Join us and start your journey.':'Sign in to your account to continue.'}</p></div>{children}</div><div className="auth-art"><div><b>{register?'Build Better Teams.':'Better Teams Build Great Projects.'}</b><span>Plan, collaborate and achieve together.</span></div><div className="mountains"/></div></div></div>; }
function Login(){ const nav=useNavigate(); const [form,setForm]=useState({email:'',password:''}); const [show,setShow]=useState(false); const [loading,setLoading]=useState(false); const submit=async e=>{e.preventDefault();setLoading(true);try{const r=await api.post('/auth/login',form);localStorage.setItem('projectflow_token',r.data.token);localStorage.setItem('projectflow_user',JSON.stringify(r.data.user));nav('/dashboard')}catch(err){alert(err.response?.data?.message||'Login failed')}finally{setLoading(false)}}; return <AuthShell><form className="auth-fields" onSubmit={submit}><label>Email Address</label><div className="field-icon"><Mail size={16}/><input required type="email" value={form.email} placeholder="Enter your email" onChange={e=>setForm({...form,email:e.target.value})}/></div><label>Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type={show?'text':'password'} value={form.password} placeholder="Enter your password" onChange={e=>setForm({...form,password:e.target.value})}/><button type="button" onClick={()=>setShow(!show)}>{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div><button className="primary-btn full" disabled={loading}>{loading?'Signing in...':'Login'}</button><p className="auth-foot">Don't have an account? <Link to="/register">Register</Link></p></form></AuthShell>; }
function Register(){ const nav=useNavigate(); const [form,setForm]=useState({name:'',email:'',password:''}); const [confirm,setConfirm]=useState(''); const [loading,setLoading]=useState(false); const submit=async e=>{e.preventDefault();if(form.password!==confirm)return alert('Passwords do not match');setLoading(true);try{const r=await api.post('/auth/register',form);localStorage.setItem('projectflow_token',r.data.token);localStorage.setItem('projectflow_user',JSON.stringify(r.data.user));nav('/dashboard')}catch(err){alert(err.response?.data?.message||'Registration failed')}finally{setLoading(false)}}; return <AuthShell register><form className="auth-fields" onSubmit={submit}><label>Full Name</label><div className="field-icon"><Users size={16}/><input required value={form.name} placeholder="Enter your full name" onChange={e=>setForm({...form,name:e.target.value})}/></div><label>Email Address</label><div className="field-icon"><Mail size={16}/><input required type="email" value={form.email} placeholder="Enter your email" onChange={e=>setForm({...form,email:e.target.value})}/></div><label>Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type="password" value={form.password} placeholder="Create a password" onChange={e=>setForm({...form,password:e.target.value})}/></div><label>Confirm Password</label><div className="field-icon"><LockKeyhole size={16}/><input required minLength={6} type="password" value={confirm} placeholder="Confirm your password" onChange={e=>setConfirm(e.target.value)}/></div><button className="primary-btn full" disabled={loading}>{loading?'Creating...':'Register'}</button><p className="auth-foot">Already have an account? <Link to="/login">Login</Link></p></form></AuthShell>; }
function Landing(){return <div className="landing"><nav className="landing-nav"><Logo/><div className="landing-links"><a href="#features">Features</a><a href="#about">About</a></div><div><Link className="outline-btn" to="/login">Login</Link><Link className="primary-btn" to="/register">Get Started</Link></div></nav><section className="landing-hero"><div><span className="eyebrow">SMART PROJECT MANAGEMENT</span><h1>Plan. Collaborate.<br/>Achieve <em>Together.</em></h1><p>The modern project management platform that helps teams turn ideas into reality.</p><div className="hero-actions"><Link className="primary-btn" to="/register">Get Started Free <ArrowRight size={16}/></Link><a className="outline-btn" href="#features">Explore Features</a></div></div><div className="hero-illustration"><div className="glow"/><div className="screen-card"><div className="screen-line long"/><div className="screen-line"/><div className="screen-row"><span/><span/><span/></div><div className="screen-row"><span/><span/><span/></div></div><div className="person">●</div></div></section><section id="features" className="feature-strip">{[[CheckSquare,'Task Management','Organize your work'],[Users,'Team Collaboration','Work together easily'],[TrendingUp,'Progress Tracking','Track project status'],[ShieldCheck,'Secure & Reliable','Your data is safe']].map(([I,t,s])=><div key={t}><span className="feature-icon"><I size={18}/></span><div><b>{t}</b><small>{s}</small></div></div>)}</section><section className="why" id="about"><div><span className="eyebrow">WHY PROJECTFLOW?</span><h2>Build Better Together.</h2><p>Powerful features to help your team succeed.</p></div><div className="why-grid">{[[LockKeyhole,'Secure','Your data is protected.'],[Zap,'Fast','Built for speed.'],[Smartphone,'Flexible','Work on every device.'],[Headphones,'Support','Help when you need it.']].map(([I,t,s])=><div key={t}><I size={21}/><b>{t}</b><small>{s}</small></div>)}</div></section></div>}
function PageHead({title,sub,action}){return <div className="page-head"><div><h1>{title}</h1><p>{sub}</p></div>{action}</div>}
function StatCard({icon:Icon,title,value,change,kind}){return <div className="stat-card"><div className={'stat-icon '+(kind||'')}><Icon size={19}/></div><div><small>{title}</small><strong>{value}</strong><span>{change}</span></div></div>}
function Dashboard(){const [projects,setProjects]=useState([]);const [tasks,setTasks]=useState([]);useEffect(()=>{Promise.all([api.get('/projects'),api.get('/tasks')]).then(([p,t])=>{setProjects(p.data||[]);setTasks(t.data||[])}).catch(()=>{})},[]);const completed=tasks.filter(t=>t.status==='Completed').length;const progress=tasks.filter(t=>t.status==='In Progress').length;const avg=projects.length?Math.round(projects.reduce((a,p)=>a+(p.progress||0),0)/projects.length):0;return <><PageHead title="Dashboard" sub={`Good morning, ${getUser()?.name||'User'}! Here's what's happening with your projects today.`}/><div className="stats-grid"><StatCard icon={FolderKanban} title="Total Projects" value={projects.length} change="Live database data" kind="teal"/><StatCard icon={CheckSquare} title="Total Tasks" value={tasks.length} change={`${completed} completed`} kind="red"/><StatCard icon={TrendingUp} title="In Progress" value={progress} change="Live database data" kind="green"/><StatCard icon={CheckCircle2} title="Completed" value={completed} change="Live database data" kind="blue"/></div><div className="dashboard-grid"><section className="panel"><div className="panel-head"><div><h2>Project Progress</h2><small>Overall project completion</small></div></div><div className="progress-layout"><div className="donut" style={{'--progress':`${avg*3.6}deg`}}><div>{avg}%<small>Complete</small></div></div><div className="legend"><span><i className="dot completed"/>Completed <b>{completed}</b></span><span><i className="dot progress"/>In Progress <b>{progress}</b></span><span><i className="dot pending"/>Pending <b>{Math.max(tasks.length-completed-progress,0)}</b></span></div></div></section><section className="panel"><div className="panel-head"><div><h2>Recent Activity</h2><small>Latest tasks from database</small></div></div><div className="activity-list">{tasks.slice(0,5).map(t=><div className="activity" key={t._id}><div className="avatar small">{(t.assignee?.name||'U').slice(0,2).toUpperCase()}</div><div><b>{t.title}</b><small>{t.project?.name||'No project'}</small></div><time>{t.status}</time></div>)}{!tasks.length&&<div className="empty-state">No tasks found in database.</div>}</div></section></div><section className="panel project-overview"><div className="panel-head"><div><h2>Projects Overview</h2><small>Live projects from database</small></div><Link className="text-btn" to="/projects">View all</Link></div><div className="mini-projects">{projects.slice(0,3).map(p=><div className="mini-project" key={p._id}><div className="project-thumb teal"><FolderKanban size={19}/></div><div><b>{p.name}</b><small>{p.category}</small><div className="bar"><i style={{width:`${p.progress||0}%`}}/></div><small>{p.progress||0}% complete</small></div></div>)}{!projects.length&&<div className="empty-state">No projects found in database.</div>}</div></section></>}
function Projects(){const [items,setItems]=useState([]);const [form,setForm]=useState({name:'',description:'',category:'Development',dueDate:''});const [show,setShow]=useState(false);const [query,setQuery]=useState('');const load=()=>api.get('/projects').then(r=>setItems(r.data||[])).catch(e=>alert(e.response?.data?.message||'Unable to load projects'));useEffect(()=>{load()},[]);const filtered=items.filter(p=>p.name.toLowerCase().includes(query.toLowerCase()));const add=async e=>{e.preventDefault();try{await api.post('/projects',form);setForm({name:'',description:'',category:'Development',dueDate:''});setShow(false);load()}catch(err){alert(err.response?.data?.message||'Only admin can create projects')}};const remove=async id=>{if(!isAdmin()||!confirm('Delete this project?'))return;try{await api.delete('/projects/'+id);load()}catch(err){alert(err.response?.data?.message||'Delete failed')}};return <><PageHead title="Projects" sub="Manage projects using live database records." action={isAdmin()&&<button className="primary-btn" onClick={()=>setShow(!show)}><Plus size={16}/> New Project</button>}/>{show&&<form className="panel form-panel" onSubmit={add}><h2>Create Project</h2><div className="form-grid"><input required placeholder="Project name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/><input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/><input type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/><input placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})}/></div><button className="primary-btn">Save Project</button></form>}<div className="panel"><div className="task-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search projects..." value={query} onChange={e=>setQuery(e.target.value)}/></div><span>{filtered.length} project(s)</span></div><div className="project-grid">{filtered.map(p=><div className="project-card" key={p._id}><div className="project-card-top"><div className="project-thumb teal"><FolderKanban size={19}/></div>{isAdmin()&&<button className="dots" onClick={()=>remove(p._id)}><Trash2 size={16}/></button>}</div><h3>{p.name}</h3><small>{p.category}</small><p>{p.description||'No description provided.'}</p><div className="bar large"><i style={{width:`${p.progress||0}%`}}/></div><div className="project-meta"><span>{p.progress||0}%</span><span>{p.status}</span></div></div>)}{!filtered.length&&<div className="empty-state">No projects found in database.</div>}</div></div></>}
function Tasks(){const [items,setItems]=useState([]);const [projects,setProjects]=useState([]);const [form,setForm]=useState({title:'',project:'',priority:'Medium',dueDate:''});const [show,setShow]=useState(false);const [query,setQuery]=useState('');const load=()=>api.get('/tasks').then(r=>setItems(r.data||[])).catch(e=>alert(e.response?.data?.message||'Unable to load tasks'));useEffect(()=>{load();api.get('/projects').then(r=>setProjects(r.data||[])).catch(()=>{})},[]);const add=async e=>{e.preventDefault();try{await api.post('/tasks',form);setShow(false);setForm({title:'',project:'',priority:'Medium',dueDate:''});load()}catch(err){alert(err.response?.data?.message||'Only admin can create tasks')}};const update=async(t,status)=>{try{await api.put('/tasks/'+t._id,{status});load()}catch(err){alert(err.response?.data?.message||'You can update only assigned tasks')}};const filtered=items.filter(t=>t.title.toLowerCase().includes(query.toLowerCase()));return <><PageHead title="Tasks" sub="Update and track real tasks from the database." action={isAdmin()&&<button className="primary-btn" onClick={()=>setShow(!show)}><Plus size={16}/> New Task</button>}/>{show&&<form className="panel form-panel" onSubmit={add}><h2>Create Task</h2><div className="form-grid"><input required placeholder="Task title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/><select required value={form.project} onChange={e=>setForm({...form,project:e.target.value})}><option value="">Select project</option>{projects.map(p=><option key={p._id} value={p._id}>{p.name}</option>)}</select><select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Low</option><option>Medium</option><option>High</option></select><input type="date" value={form.dueDate} onChange={e=>setForm({...form,dueDate:e.target.value})}/></div><button className="primary-btn">Save Task</button></form>}<div className="panel"><div className="task-toolbar"><div className="search-box"><Search size={16}/><input placeholder="Search tasks..." value={query} onChange={e=>setQuery(e.target.value)}/></div><span>{filtered.length} task(s)</span></div><div className="task-table"><div className="task-row task-head"><span>Title</span><span>Project</span><span>Priority</span><span>Due Date</span><span>Status</span><span>Action</span></div>{filtered.map(t=><div className="task-row" key={t._id}><b>{t.title}</b><span>{t.project?.name||'—'}</span><span className={'priority '+t.priority.toLowerCase()}>{t.priority}</span><span>{t.dueDate?new Date(t.dueDate).toLocaleDateString():'—'}</span><select value={t.status} onChange={e=>update(t,e.target.value)} disabled={!isAdmin()&&String(t.assignee?._id)!==String(getUser()?.id)}><option>To Do</option><option>In Progress</option><option>Completed</option></select><MoreVertical size={16}/></div>)}{!filtered.length&&<div className="empty-state">No tasks found in database.</div>}</div></div></>}
function CalendarPage(){return <><PageHead title="Calendar" sub="Your database task deadlines."/><div className="panel calendar-panel"><div className="empty-state"><CalendarDays size={40}/><h2>Calendar View</h2><p>Calendar is connected to your tasks. Upcoming task dates will appear here.</p></div></div></>}
function Team(){const [users,setUsers]=useState([]);const load=()=>api.get('/auth/team').then(r=>setUsers(r.data||[])).catch(e=>alert(e.response?.data?.message||'Only admin can view team'));useEffect(()=>{load()},[]);const changeRole=async(id,role)=>{try{await api.put('/auth/team/'+id+'/role',{role});load()}catch(e){alert(e.response?.data?.message||'Role update failed')}};if(!isAdmin())return <AccessDenied/>;return <><PageHead title="Team Members" sub="Admin-controlled employees and roles."/><div className="panel"><div className="team-table"><div className="team-row team-head"><span>Name</span><span>Email</span><span>Role</span><span>Status</span></div>{users.map(u=><div className="team-row" key={u._id}><div className="member"><div className="avatar">{u.name.slice(0,2).toUpperCase()}</div><b>{u.name}</b></div><span>{u.email}</span><select value={u.role} onChange={e=>changeRole(u._id,e.target.value)}><option>admin</option><option>employee</option><option>developer</option><option>designer</option><option>tester</option><option>client</option></select><span className="active-pill">Active</span></div>)}</div></div></>}
function AccessDenied(){return <div className="panel empty-state"><ShieldCheck size={42}/><h2>Access Restricted</h2><p>Only administrators can access this section.</p></div>}
function Reports(){const [p,setP]=useState([]);const [t,setT]=useState([]);useEffect(()=>{api.get('/projects').then(r=>setP(r.data||[]));api.get('/tasks').then(r=>setT(r.data||[]))},[]);return <><PageHead title="Reports" sub="Analytics calculated from your database records."/><div className="stats-grid"><StatCard icon={FolderKanban} title="Projects" value={p.length} change="Live data" kind="teal"/><StatCard icon={CheckSquare} title="Tasks" value={t.length} change="Live data" kind="purple"/><StatCard icon={CheckCircle2} title="Completed" value={t.filter(x=>x.status==='Completed').length} change="Live data" kind="green"/><StatCard icon={Users} title="Members" value="—" change="Admin team view" kind="blue"/></div><div className="panel empty-state"><BarChart3 size={42}/><h2>Reports are live</h2><p>These statistics are calculated directly from MongoDB. No demo records are added.</p></div></>}
function Inventory(){
  const emptyForm = { name:'', category:'General', stock:'', price:'', sku:'' };
  const [items,setItems] = useState([]);
  const [form,setForm] = useState(emptyForm);
  const [editing,setEditing] = useState(null);
  const [show,setShow] = useState(false);
  const [query,setQuery] = useState('');
  const [loading,setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    api.get('/inventory')
      .then(r => setItems(r.data || []))
      .catch(e => alert(e.response?.data?.message || 'Unable to load inventory'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setShow(true);
  };

  const openEdit = (item) => {
    setEditing(item._id);
    setForm({
      name:item.name || '',
      category:item.category || 'General',
      stock:String(item.stock ?? ''),
      price:String(item.price ?? ''),
      sku:item.sku || ''
    });
    setShow(true);
  };

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editing) await api.put('/inventory/' + editing, form);
      else await api.post('/inventory', form);
      setShow(false);
      setEditing(null);
      setForm(emptyForm);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to save product');
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete('/inventory/' + id);
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Unable to delete product');
    }
  };

  const filtered = items.filter(item =>
    `${item.name} ${item.category} ${item.sku}`.toLowerCase().includes(query.toLowerCase())
  );

  return <>
    <PageHead
      title="Inventory"
      sub="Manage products and stock using live database records."
      action={<div className="head-actions">{isAdmin() ? <button type="button" className="primary-btn" onClick={openCreate}><Plus size={16}/> Add Product</button> : <span className="permission-note">Only Admin can add products</span>}</div>}
    />

    {show && isAdmin() && <form className="panel form-panel" onSubmit={save}>
      <div className="panel-head">
        <div>
          <h2>{editing ? 'Edit Product' : 'Add Product'}</h2>
          <small>Save this product to MongoDB inventory collection.</small>
        </div>
        <button type="button" className="dots" onClick={() => setShow(false)}>✕</button>
      </div>

      <div className="form-grid">
        <input required placeholder="Product name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})}/>
        <input placeholder="SKU (optional)" value={form.sku} onChange={e=>setForm({...form,sku:e.target.value})}/>
        <input required type="number" min="0" placeholder="Stock quantity" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})}/>
        <input required type="number" min="0" step="0.01" placeholder="Price" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/>
      </div>

      <div className="head-actions">
        <button type="submit" className="primary-btn">{editing ? 'Update Product' : 'Save Product'}</button>
        <button type="button" className="outline-btn" onClick={()=>setShow(false)}>Cancel</button>
      </div>
    </form>}

    <div className="panel">
      <div className="task-toolbar">
        <div className="search-box">
          <Search size={16}/>
          <input placeholder="Search products..." value={query} onChange={e=>setQuery(e.target.value)}/>
        </div>
        <span>{filtered.length} product(s)</span>
      </div>

      {loading ? <div className="empty-state">Loading inventory...</div> :
      <div className="inventory-table">
        <div className="inv-row inv-head">
          <span>Product</span><span>Category</span><span>Stock</span><span>Price</span><span>Status</span><span>Actions</span>
        </div>
        {filtered.map(item => <div className="inv-row" key={item._id}>
          <div className="product-name"><div className="product-box"><Package size={16}/></div><div><b>{item.name}</b><small>{item.sku || 'No SKU'}</small></div></div>
          <span>{item.category}</span>
          <span>{item.stock}</span>
          <span>Rs. {Number(item.price || 0).toLocaleString()}</span>
          <span className={item.status === 'Low Stock' || item.status === 'Out of Stock' ? 'low-stock' : 'stock'}>{item.status}</span>
          <div className="head-actions">
            {isAdmin() && <button className="icon-btn" title="Edit product" onClick={()=>openEdit(item)}><Pencil size={15}/></button>}
            {isAdmin() && <button className="icon-btn" title="Delete product" onClick={()=>remove(item._id)}><Trash2 size={15}/></button>}
          </div>
        </div>)}
        {!filtered.length && <div className="empty-state"><Package size={40}/><h2>No inventory records</h2><p>No products are available in the database.</p></div>}
      </div>}
    </div>
  </>;
}
function SettingsPage(){const [user,setUser]=useState(getUser()||{});const [name,setName]=useState(user.name||'');const [saved,setSaved]=useState(false);const save=async e=>{e.preventDefault();try{const r=await api.put('/auth/me',{name});setUser(r.data);localStorage.setItem('projectflow_user',JSON.stringify(r.data));setSaved(true);setTimeout(()=>setSaved(false),2000)}catch(err){alert(err.response?.data?.message||'Update failed')}};return <><PageHead title="Settings" sub="Manage your real account information."/><div className="settings-grid"><section className="panel profile-panel"><div className="profile-cover"><div className="profile-avatar">{name.slice(0,2).toUpperCase()}</div></div><form className="profile-form" onSubmit={save}><label>Full Name<input value={name} onChange={e=>setName(e.target.value)} required/></label><label>Email Address<input value={user.email||''} readOnly/></label><label>Role<input value={user.role||''} readOnly/></label><button className="primary-btn">{saved?'Saved ✓':'Update Profile'}</button></form></section><section className="panel notification-panel"><div className="panel-head"><div><h2>Account Permissions</h2><small>Your access is controlled by your role.</small></div></div><div className="setting-row"><div><b>Current role</b><small>{user.role||'employee'}</small></div><span className="active-pill">Active</span></div><div className="setting-row"><div><b>Admin access</b><small>{user.role==='admin'?'Full system access':'Restricted to assigned work'}</small></div></div></section></div></>}
function SimpleDetails(){return <><PageHead title="Order / Task Details" sub="Details are available through task records."/><div className="panel empty-state"><h2>Select a task from Tasks page</h2><p>No static order data is shown. This application uses database records only.</p></div></>}
function Payment(){return <><PageHead title="Payment" sub="Mock payment module."/><div className="panel empty-state"><LockKeyhole size={42}/><h2>Mock Payment</h2><p>No payment is processed. This section is ready for a future payment record integration.</p></div></>}
function App(){return <HashRouter><Routes><Route path="/" element={<Landing/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard/></Layout></ProtectedRoute>}/><Route path="/projects" element={<ProtectedRoute><Layout><Projects/></Layout></ProtectedRoute>}/><Route path="/tasks" element={<ProtectedRoute><Layout><Tasks/></Layout></ProtectedRoute>}/><Route path="/calendar" element={<ProtectedRoute><Layout><CalendarPage/></Layout></ProtectedRoute>}/><Route path="/team" element={<ProtectedRoute><Layout><Team/></Layout></ProtectedRoute>}/><Route path="/reports" element={<ProtectedRoute><Layout><Reports/></Layout></ProtectedRoute>}/><Route path="/inventory" element={<ProtectedRoute><Layout><Inventory/></Layout></ProtectedRoute>}/><Route path="/settings" element={<ProtectedRoute><Layout><SettingsPage/></Layout></ProtectedRoute>}/><Route path="/details" element={<ProtectedRoute><Layout><SimpleDetails/></Layout></ProtectedRoute>}/><Route path="/payment" element={<ProtectedRoute><Layout><Payment/></Layout></ProtectedRoute>}/><Route path="*" element={<Navigate to="/dashboard" replace/>}/></Routes></HashRouter>}
export default App;
