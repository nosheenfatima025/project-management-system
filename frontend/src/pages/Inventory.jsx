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

export default Inventory;
