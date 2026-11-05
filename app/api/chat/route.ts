import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products";
import { createClient } from "@supabase/supabase-js";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
 try {
  const body = await request.json();
  const messages = Array.isArray(body.messages) ? body.messages.slice(-10) : [];
  const safeMessages = messages.filter((m: {role?:string;content?:string}) => ["user","assistant"].includes(m.role||"") && typeof m.content==="string").map((m:{role:string;content:string})=>({role:m.role as "user"|"assistant",content:m.content.slice(0,1500)}));
  let inventory = products.map(p=>`${p.name} | ₦${p.price.toLocaleString("en-NG")} | ${p.category} | stock: ${p.stock}`).join("\n");
  const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(url&&key){const db=createClient(url,key,{auth:{persistSession:false}});const {data}=await db.from("products").select("name,category,price,stock").eq("active",true).limit(60);if(data?.length)inventory=data.map(p=>`${p.name} | ₦${Number(p.price).toLocaleString("en-NG")} | ${p.category||"Technology"} | stock: ${p.stock}`).join("\n");}
  if(!process.env.OPENAI_API_KEY)return NextResponse.json({reply:"Our AI assistant is being configured. Please contact JICT on 08031940875 or 08123670163 for product enquiries."});
  const client=new OpenAI({apiKey:process.env.OPENAI_API_KEY});
  const response=await client.chat.completions.create({model:process.env.OPENAI_MODEL||"gpt-4.1-mini",messages:[{role:"system",content:`You are the JICT Online Store shopping assistant in Jos, Nigeria. Be warm, concise and helpful. Prices are in Nigerian Naira. Only claim availability and prices shown in this inventory; do not invent products, discounts, delivery promises or stock. If unsure, direct customers to 08031940875 or 08123670163. Inventory:\n${inventory}`},...safeMessages],max_tokens:350});
  return NextResponse.json({reply:response.choices[0]?.message?.content||"How can I help you shop at JICT?"});
 } catch {return NextResponse.json({reply:"Sorry, the assistant is temporarily unavailable. Please call 08031940875 or 08123670163."});}
}
