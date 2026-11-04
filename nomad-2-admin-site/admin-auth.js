// 管理者の2段階認証（TOTP）。DB側も、2段階認証済み（aal2）でないと管理者として扱いません（sql/setup3.sql）。
async function mfaOk(box){
  const show=m=>{box.hidden=false;box.textContent=m;return false};
  try{
    const M=sb.auth.mfa;
    const {data:a,error:ae}=await M.getAuthenticatorAssuranceLevel();
    if(ae)return show('2段階認証の状態を確認できませんでした：'+ae.message);
    if(a&&a.currentLevel==='aal2'){box.hidden=true;return true}
    const {data:f,error:fe}=await M.listFactors();
    if(fe)return show('2段階認証の情報を取得できませんでした：'+fe.message);
    const t=f&&f.totp&&f.totp[0];
    let fid,secret=null,html;
    if(t){fid=t.id;html='<p>認証アプリの6桁コードを入力してください。</p>'}
    else{
      for(const x of (f&&f.all)||[])if(x.status==='unverified')await M.unenroll({factorId:x.id});
      const {data:e,error}=await M.enroll({factorType:'totp',friendlyName:'wing-'+Date.now()});
      if(error)return show('2段階認証を開始できませんでした：'+error.message);
      fid=e.id;secret=e.totp.secret;
      html='<p>はじめに、認証アプリ（Google Authenticator など）でQRコードを読み取ってください。</p><img src="'+e.totp.qr_code+'" alt="" style="width:180px;max-width:100%"><p class="mut" id="mfs"></p>';
    }
    box.innerHTML=html+'<label>6桁のコード<input id="mfc" inputmode="numeric" maxlength="6" autocomplete="one-time-code"></label><button id="mfb" class="btn" style="margin-top:12px">確認する</button><p id="mfm" class="err"></p>';
    box.hidden=false;
    if(secret)box.querySelector('#mfs').textContent='読み取れない場合のキー：'+secret;
    box.querySelector('#mfb').onclick=async()=>{
      const m=box.querySelector('#mfm');
      try{
        const c=await M.challenge({factorId:fid});
        if(c.error){m.textContent='確認を開始できませんでした：'+c.error.message;return}
        const v=await M.verify({factorId:fid,challengeId:c.data.id,code:box.querySelector('#mfc').value.trim()});
        if(v.error)m.textContent='コードが違うか、期限切れです。もう一度入力してください。';else location.reload();
      }catch(err){m.textContent='通信に失敗しました。'}
    };
    return false;
  }catch(err){return show('2段階認証の処理でエラーが発生しました：'+((err&&err.message)||err))}
}

// CSVを作ってダウンロード（Excel用にBOM付き。=+-@ で始まる値は、数式として実行されないよう無効化）
function downloadCsv(name,header,rows){
  const q=v=>{let s=v==null?'':String(v);if(/^[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"'};
  const t='\ufeff'+[header,...rows].map(r=>r.map(q).join(',')).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([t],{type:'text/csv;charset=utf-8'}));
  a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}
