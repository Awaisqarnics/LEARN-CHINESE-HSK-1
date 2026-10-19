'use strict';
const ProgressStore = (() => {
  const KEY = 'hsk1-studio-progress-v1';
  const todayKey = () => new Date().toISOString().slice(0,10);
  function load(){ try { const saved=JSON.parse(localStorage.getItem(KEY)||'{}'); return {words:saved.words||{},history:Array.isArray(saved.history)?saved.history:[],daily:saved.daily||{date:todayKey(),count:0}}; } catch(e){ return {words:{},history:[],daily:{date:todayKey(),count:0}}; } }
  let data=load();
  function persist(){ try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){console.warn('Progress could not be saved',e);} }
  function get(serial){return data.words[String(serial)]||{status:'Not Started',attempts:0};}
  function setStatus(serial,status){const old=get(serial);data.words[String(serial)]={...old,status,updatedAt:new Date().toISOString()};persist();}
  function recordPractice(serial){const old=get(serial);data.words[String(serial)]={...old,attempts:(old.attempts||0)+1,lastPracticed:new Date().toISOString()};const today=todayKey();if(data.daily.date!==today)data.daily={date:today,count:0};data.daily.count++;let h=data.history.find(x=>x.date===today);if(!h){h={date:today,count:0,words:[]};data.history.unshift(h);}h.count++;if(!h.words.includes(serial))h.words.push(serial);data.history=data.history.slice(0,30);persist();}
  function counts(){const c={'Not Started':0,'Learning':0,'Learned':0,'Difficult':0};Object.values(data.words).forEach(w=>{if(c[w.status]!==undefined)c[w.status]++;});c['Not Started']=Math.max(0,150-Object.keys(data.words).filter(k=>c[data.words[k].status]!==undefined).length);return c;}
  function history(){return data.history.slice();}function dailyCount(){if(data.daily.date!==todayKey()){data.daily={date:todayKey(),count:0};persist();}return data.daily.count;}
  function reset(){data={words:{},history:[],daily:{date:todayKey(),count:0}};persist();}
  function exportData(){return JSON.stringify({exportedAt:new Date().toISOString(),words:data.words,history:data.history,daily:data.daily},null,2);}
  return {get,setStatus,recordPractice,counts,history,dailyCount,reset,exportData};
})();
