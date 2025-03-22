/**
 * Google Analytics タグを動的に挿入するためのスクリプト
 * すべてのページに共通で使用することで、一元管理を実現します
 */

// Google Analytics タグを動的に挿入する関数
function insertGoogleTag() {
  // すでにタグが挿入されている場合は処理をスキップ
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) {
    return;
  }

  // GTMスクリプトタグを作成（外部スクリプト）
  const scriptTag1 = document.createElement('script');
  scriptTag1.async = true;
  scriptTag1.src = 'https://www.googletagmanager.com/gtag/js?id=G-D94PFMPFKJ';
  
  // 設定スクリプトを作成（インラインスクリプト）
  const scriptTag2 = document.createElement('script');
  scriptTag2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-D94PFMPFKJ');
  `;
  
  // headタグに追加
  document.head.appendChild(scriptTag1);
  document.head.appendChild(scriptTag2);
  
  console.log('Google Analytics タグが正常に挿入されました');
}

// DOMの読み込みが完了した時点でタグを挿入
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', insertGoogleTag);
} else {
  // DOMがすでに読み込まれている場合は即時実行
  insertGoogleTag();
}
