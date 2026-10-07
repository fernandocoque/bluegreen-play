import { createClient } from '@supabase/supabase-js';
const client=createClient('https://lxydvojoftjkqrdnzhrb.supabase.co','sb_publishable_Xbf7GtNFgrT9p32Lonlfkw_XA8lMJFV');
let user=null;
const redirect='https://bluegreen-play.vercel.app/';
function header(){document.querySelector('#profile').textContent=user?(user.user_metadata?.display_name||'Minha conta'):'Entrar / Criar conta'}
function message(text){const el=document.querySelector('#auth-message');if(el)el.textContent=text}
function screen(mode='login'){
 if(modal.open)modal.close();
 if(user&&mode==='login'){open(`<h2>Minha conta</h2><p>${esc(user.email)}</p><p>Cadastro conectado. Saldo e jogos desta versão são demonstrações locais.</p><button id="auth-logout" class="primary">Sair da conta</button>`);document.querySelector('#auth-logout').onclick=async()=>{const {error}=await client.auth.signOut();if(error)return toast('Não foi possível sair. Tente novamente.');modal.close();};return;}
 const signup=mode==='signup',recover=mode==='recover',reset=mode==='reset';
 open(`<div class="eyebrow">BLUEGREEN PLAY · SUA CONTA</div><h2>${signup?'Criar conta':recover?'Recuperar senha':reset?'Definir nova senha':'Entrar'}</h2><form id="auth-form">${signup?'<label for="auth-name">Seu nome</label><input id="auth-name" maxlength="40" autocomplete="given-name" required>':''}${!reset?'<label for="auth-email">E-mail</label><input id="auth-email" type="email" autocomplete="email" required>':''}${!recover?`<label for="auth-password">${reset?'Nova senha':'Senha'}</label><input id="auth-password" type="password" minlength="8" autocomplete="${signup||reset?'new-password':'current-password'}" required>`:''}<p id="auth-message" role="status" aria-live="polite"></p><button class="primary" id="auth-submit">${signup?'Cadastrar':recover?'Enviar link':reset?'Salvar senha':'Entrar'}</button></form>${!reset?'<div class="actions" style="margin-top:16px"><button id="auth-login">Entrar</button><button id="auth-signup">Criar conta</button><button id="auth-recover">Esqueci minha senha</button></div>':''}`);
 for(const m of ['login','signup','recover']){const b=document.querySelector('#auth-'+m);if(b)b.onclick=()=>screen(m)}
 document.querySelector('#auth-form').onsubmit=async e=>{e.preventDefault();const button=document.querySelector('#auth-submit');button.disabled=true;message('Aguarde…');const email=document.querySelector('#auth-email')?.value.trim(),password=document.querySelector('#auth-password')?.value;try{
 let result;
 if(signup)result=await client.auth.signUp({email,password,options:{emailRedirectTo:redirect,data:{display_name:document.querySelector('#auth-name').value.trim()}}});
 else if(recover)result=await client.auth.resetPasswordForEmail(email,{redirectTo:redirect});
 else if(reset)result=await client.auth.updateUser({password});
 else result=await client.auth.signInWithPassword({email,password});
 if(result.error){const code=result.error.code;message(code==='invalid_credentials'?'E-mail ou senha incorretos.':code==='email_not_confirmed'?'Confirme seu e-mail antes de entrar.':code==='over_email_send_rate_limit'?'Limite de envio atingido. Aguarde e tente novamente.':'Não foi possível concluir. Confira os dados ou tente novamente mais tarde.');return;}
 if(recover||signup&&!result.data.session){message(recover?'Se o endereço puder receber a recuperação, enviaremos um link.':'Confira seu e-mail para confirmar o cadastro.');document.querySelector('#auth-password')?.setAttribute('value','');}
 else{modal.close();toast(reset?'Senha atualizada.':'Você entrou na sua conta.');}
 }catch{message('Falha de conexão. Tente novamente.')}finally{button.disabled=false}};
}
client.auth.onAuthStateChange((event,session)=>{user=session?.user||null;header();if(event==='PASSWORD_RECOVERY')setTimeout(()=>screen('reset'),0)});
client.auth.getSession().then(({data,error})=>{if(!error)user=data.session?.user||null;header()});
document.querySelector('#profile').onclick=()=>screen();
const oldHeader=updateHeader;updateHeader=function(){oldHeader();header()};
