import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { products as demoProducts } from "@/lib/products";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim().slice(0,120);
    const phone = String(body.phone || "").trim().slice(0,30);
    const email = String(body.email || "").trim().slice(0,180);
    const address = String(body.address || "").trim().slice(0,500);
    const items = Array.isArray(body.items) ? body.items : [];
    if (!name || !phone || !address || !items.length || items.length > 30) {
      return NextResponse.json({ error: "Please provide your name, phone, delivery address and items." }, { status: 400 });
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      return NextResponse.json({ error: "Order requests are not connected yet. Please call 08031940875 or 08123670163 to complete your order." }, { status: 503 });
    }
    const db = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const ids = items.map((item:any)=>String(item.id));
    const { data: liveProducts } = await db.from("products").select("id,name,price,stock,active").in("id",ids);
    const liveMap = new Map((liveProducts||[]).map((p:any)=>[String(p.id),p]));
    const orderLines = [];
    let subtotal = 0;
    for (const item of items) {
      const id = String(item.id);
      const qty = Number(item.qty);
      const live = liveMap.get(id);
      const demo = demoProducts.find(p=>p.id===id);
      const product = live ? {id:live.id,name:live.name,price:Number(live.price),stock:Number(live.stock),active:live.active} :
        demo ? {id:null,name:demo.name,price:demo.price,stock:demo.stock,active:true} : null;
      if (!product || !product.active || !Number.isInteger(qty) || qty < 1 || qty > 20 || qty > product.stock) {
        return NextResponse.json({ error: "A selected product or quantity is unavailable. Please refresh your cart." }, { status: 400 });
      }
      subtotal += product.price * qty;
      orderLines.push({ product_id: product.id, product_name: product.name, quantity: qty, unit_price: product.price });
    }
    if (subtotal > 100000000) return NextResponse.json({ error: "Order total is outside the accepted range." }, { status: 400 });
    const { data: order, error } = await db.from("orders").insert({
      customer_name:name,phone,email:email||null,delivery_address:address,
      subtotal,delivery_fee:0,total:subtotal,status:"pending",payment_status:"unpaid"
    }).select("id").single();
    if(error||!order)return NextResponse.json({error:"We could not save your order. Please contact JICT."},{status:500});
    const {error:lineError}=await db.from("order_items").insert(orderLines.map(line=>({...line,order_id:order.id})));
    if(lineError){await db.from("orders").delete().eq("id",order.id);return NextResponse.json({error:"We could not save the order items. Please contact JICT."},{status:500});}
    return NextResponse.json({ok:true,orderId:order.id});
  } catch {
    return NextResponse.json({ error: "Invalid order request." }, { status: 400 });
  }
}
