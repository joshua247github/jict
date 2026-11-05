"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { LockKeyhole, Package, ShoppingBag, Users, RefreshCw } from "lucide-react";

export default function AdminPage(){
 const [state,setState]=useState<"loading"|"denied"|"ready">("loading");
 const [stats,setStats]=useState({products:0,orders:0,customers:0});
 const [orders,setOrders]=useState<any[]>([]);
 const [error,setError]=useState("");
 useEffect(()=>{(async()=>{
  if(!supabase){setState("denied");setError("Supabase is not configured. Add the project URL and anon key.");return;}
  const {data:{user}}=await supabase.auth.getUser();
  if(!user){setState("denied");setError("Sign in with an administrator account to continue.");return;}
  const {data:profile}=await supabase.from("profiles").select("role").eq("id",user.id).single();
  if(profile?.role!=="admin"){setState("denied");setError("This account does not have administrator permissions.");return;}
  const [p,o,c]=await Promise.all([supabase.from("products").select("id",{count:"exact",head:true}),supabase.from("orders").select("id,customer_name,phone,total,status,created_at").order("created_at",{ascending:false}).limit(8),supabase.from("profiles").select("id",{count:"exact",head:true})]);
  setStats({products:p.count||0,orders:o.data?.length||0,customers:c.count||0});setOrders(o.data||[]);setState("ready");
 })()},[]);
 if(state==="loading")return <main className="adminShell"><p>Checking administrator access…</p></main>;
 if(state==="denied")return <main className="adminShell"><div className="adminGate"><LockKeyhole size={34}/><h1>JICT Admin</h1><p>{error}</p><a href="/">Return to store</a></div></main>;
 return <main className="adminShell"><header><a href="/">← JICT Store</a><h1>Admin dashboard</h1><button onClick={()=>location.reload()}><RefreshCw size={16}/> Refresh</button></header><p className="adminIntro">Store overview and recent customer orders.</p><div className="adminStats"><div><Package/><span>Products</span><b>{stats.products}</b></div><div><ShoppingBag/><span>Recent orders</span><b>{stats.orders}</b></div><div><Users/><span>Customers</span><b>{stats.customers}</b></div></div><section className="adminTable"><h2>Recent orders</h2>{orders.length?<div className="adminRows">{orders.map(o=><div key={o.id}><span><b>{o.customer_name}</b><small>{o.phone} · {new Date(o.created_at).toLocaleDateString()}</small></span><strong>₦{Number(o.total).toLocaleString("en-NG")}</strong><em>{o.status}</em></div>)}</div>:<p>No orders have been recorded yet.</p>}</section></main>;
}
