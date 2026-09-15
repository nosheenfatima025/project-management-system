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

function Payment(){return <><PageHead title="Payment" sub="Mock payment module."/><div className="panel empty-state"><LockKeyhole size={42}/><h2>Mock Payment</h2><p>No payment is processed. This section is ready for a future payment record integration.</p></div></>}

export default Payment;
