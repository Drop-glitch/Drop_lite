'use client'
import {useState} from 'react'
export default function Page(){
 const [tab,setTab]=useState('my');
 const users=[{id:'@lucas',dist:'120m'},{id:'@ana',dist:'340m'}];
 return <main style={{padding:16,minHeight:'100vh',background:'#020617',color:'#fff'}}>
 <h1>Drops Lite</h1>
 <div style={{display:'flex',gap:8,marginBottom:16}}>
 <button onClick={()=>setTab('my')}>My Drops</button>
 <button onClick={()=>setTab('nearby')}>Nearby</button>
 </div>
 {tab==='my' ? <div>Seus Drops aparecerão aqui.</div> :
 <div>{users.map((u,i)=><div key={i}>{u.id} • {u.dist}</div>)}</div>}
 </main>
}