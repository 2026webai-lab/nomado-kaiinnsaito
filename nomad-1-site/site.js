// 言語切替と、共通のヘッダー・フッター
(function(){
  const L=localStorage.getItem('nc_lang')||((navigator.language||'').startsWith('ja')?'ja':'en');
  document.documentElement.lang=L;
  const nav=[['index.html','Home','ホーム'],['hotel.html','Guide','参加案内'],['apply.html','Apply','申請'],['terms.html','Terms','規約'],['privacy.html','Privacy','プライバシー']];
  const h=document.createElement('header');h.className='nav';
  h.innerHTML='<a class="brand" href="index.html">Nomad Community</a><nav>'+nav.map(n=>'<a href="'+n[0]+'"><span lang="en">'+n[1]+'</span><span lang="ja">'+n[2]+'</span></a>').join('')+'</nav><button id="lt" class="lt" type="button">EN / 日本語</button>';
  document.body.prepend(h);
  document.getElementById('lt').onclick=()=>{const n=document.documentElement.lang==='ja'?'en':'ja';localStorage.setItem('nc_lang',n);document.documentElement.lang=n};
  const f=document.createElement('footer');
  f.innerHTML='<span lang="ja">運営：合同会社ウィング（</span><span lang="en">Operated by 合同会社ウィング (</span><a href="'+NC.company+'" target="_blank" rel="noopener noreferrer"><span lang="ja">公式ホームページ</span><span lang="en">company site</span></a>)<br>© Nomad Community';
  document.body.appendChild(f);
})();
