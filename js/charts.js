/**
 * グラフ描画とアニメーション制御用のJavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 売上高グラフのアニメーション
    animateBarCharts('.revenue-bar-fill', 'width');
    
    // 利益率グラフのアニメーション
    animateBarCharts('.profit-bar', 'height', 1000);
    
    // 四半期グラフのアニメーション
    animateBarCharts('.quarter-bar', 'height', 1500);

    // バーチャートのアニメーション（住友林業ページ用）
    animateBarCharts('.bar-fill', 'width', 800);

    // 検索機能（トップページ用）
    setupSearch();

    // 企業カードのホバーエフェクト設定（トップページ用）
    setupCompanyCards();
});

/**
 * グラフアニメーション用関数
 * @param {string} selector - アニメーションを適用する要素のセレクタ
 * @param {string} property - アニメーションするプロパティ（width/height）
 * @param {number} delay - アニメーション開始の遅延時間（ミリ秒）
 */
function animateBarCharts(selector, property, delay = 500) {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return; // 要素が存在しない場合は処理しない

    setTimeout(() => {
        elements.forEach(el => {
            const originalValue = el.style[property];
            if (originalValue) {
                el.style[property] = '0';
                setTimeout(() => {
                    el.style[property] = originalValue;
                }, 100);
            }
        });
    }, delay);
}

/**
 * 検索機能のセットアップ
 */
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    if (!searchInput) return; // 検索ボックスが存在しない場合は処理しない
    
    // 検索ボックスのフォーカス時の動作
    searchInput.addEventListener('focus', function() {
        this.placeholder = '企業名を入力して検索...';
    });
    
    // 検索ボックスのフォーカスが外れたときの動作
    searchInput.addEventListener('blur', function() {
        this.placeholder = '企業名で検索...';
    });

    // 検索機能の実装
    searchInput.addEventListener('input', function() {
        const searchText = this.value.toLowerCase();
        const companyCards = document.querySelectorAll('.company-card');
        
        companyCards.forEach(card => {
            const companyName = card.querySelector('.company-name').textContent.toLowerCase();
            const companyInfo = card.textContent.toLowerCase();
            
            // 企業名か企業情報にマッチするものを表示
            if (companyName.includes(searchText) || companyInfo.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * 企業カードのホバーエフェクト設定
 */
function setupCompanyCards() {
    const cards = document.querySelectorAll('.company-card');
    if (cards.length === 0) return; // カードが存在しない場合は処理しない
    
    cards.forEach(card => {
        // ホバー時のアイコン効果
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.company-icon');
            if (icon && !icon.classList.contains('fa-beat-fade')) {
                icon.classList.add('fa-beat');
            }
        });
        
        // ホバーが外れたときの処理
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.company-icon');
            if (icon && icon.classList.contains('fa-beat') && !icon.classList.contains('fa-beat-fade')) {
                icon.classList.remove('fa-beat');
            }
        });
    });
}