const startBtn=document.getElementById('startBtn');
const surpriseBtn=document.getElementById('surpriseBtn');
const modal=document.getElementById('modal');
const closeBtn=document.getElementById('close');
const backdrop=document.getElementById('backdrop');
const againBtn=document.getElementById('again');
const musicBtn=document.getElementById('musicBtn');
const audio=document.getElementById('audio');

startBtn.addEventListener('click',()=>{document.getElementById('letter').scrollIntoView({behavior:'smooth'});confetti(55);});

function openSurprise(){
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';
  closeBtn.focus();
  confetti(130);
}
function closeSurprise(){
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  surpriseBtn.focus();
}
surpriseBtn.addEventListener('click',openSurprise);
closeBtn.addEventListener('click',closeSurprise);
backdrop.addEventListener('click',closeSurprise);
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeSurprise();});
againBtn.addEventListener('click',()=>confetti(100));

musicBtn.addEventListener('click',async()=>{
  if(audio.paused){
    try{await audio.play();musicBtn.textContent='♫ Music on';}
    catch(e){alert('Add your audio file as music/birthday.mp3 to enable music.');}
  }else{audio.pause();musicBtn.textContent='♫ Play music';}
});

function confetti(count){
  const colors=['#f4d28a','#b9a6ff','#ffb8d1','#fffaf5','#a8e6cf'];
  for(let i=0;i<count;i++){
    const p=document.createElement('span');p.className='confetti';
    p.style.left=Math.random()*100+'vw';
    p.style.width=5+Math.random()*8+'px';p.style.height=8+Math.random()*10+'px';
    p.style.background=colors[Math.floor(Math.random()*colors.length)];
    p.style.borderRadius=Math.random()>.5?'50%':'2px';
    p.style.animationDuration=2.2+Math.random()*2.1+'s';
    p.style.animationDelay=Math.random()*.35+'s';
    document.body.appendChild(p);setTimeout(()=>p.remove(),5000);
  }
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(section=>observer.observe(section));
