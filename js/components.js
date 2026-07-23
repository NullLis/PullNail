// components.js — 动态生成导航栏和页脚，并初始化交互
document.addEventListener('DOMContentLoaded', () => {
    // 根据当前页面路径计算到网站根目录的相对路径前缀
    const basePath = getBasePath();

    // 注入导航栏
    const navContainer = document.getElementById('navbar-container');
    if (navContainer) {
        navContainer.innerHTML = getNavbarHTML(basePath);
        highlightCurrentPage();
        initNavbar();
    }

    // 注入页脚
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooterHTML(basePath);
    }
});

/**
 * 根据当前页面的 URL 计算出网站根目录的相对路径前缀。
 * 例如根目录页面返回 './'，html/ 子目录页面返回 '../'
 */
function getBasePath() {
    const path = window.location.pathname;
    // 移除最后一个斜杠及之后的内容（如果是文件）或保留目录
    let dir = path.substring(0, path.lastIndexOf('/'));
    if (dir === '') return './';       // 根目录页面，如 / 或 /index.html
    // 计算路径深度，每多一级就加一个 '../'
    const depth = dir.split('/').filter(Boolean).length;
    return '../'.repeat(depth) || './';
}

function getNavbarHTML(basePath) {
    return `
    <nav class="navbar">
        <a href="${basePath}index.html" class="nav-logo">🧱 PullNail</a>
        <button class="nav-toggle" id="navToggle">☰</button>
        <ul class="nav-links" id="navLinks">
            <li><a href="${basePath}index.html">首页</a></li>
            <li><a href="${basePath}html/links.html">🕹️ 更多游戏</a></li>
            <li class="dropdown" id="communityDropdown">
                <span class="dropdown-toggle" id="communityToggle">🗣️ 社区与反馈 ▾</span>
                <ul class="dropdown-menu">
                    <li><a href="https://github.com/NullLis/PullNail/issues">💬 问题反馈</a></li>
                    <li><a href="mailto:NullLis@example.com">📧 联系开发者</a></li>
                    <li><a href="https://github.com/NullLis/PullNail">🌟 支持项目</a></li>
                </ul>
            </li>
            <li><a href="${basePath}html/download.html">📥 下载游戏</a></li>
            <li><a href="${basePath}html/update.html">📅 更新日志</a></li>
            <li><a href="${basePath}html/upload.html">📤 上传文件</a></li>
        </ul>
    </nav>`;
}

function getFooterHTML(basePath) {
    return `
    <div class="footer">
        <div class="footer-links">
            <a href="${basePath}html/tos.html">服务条款</a>
            <a href="${basePath}html/privacy.html">隐私政策</a>
        </div>
        Built with ❤️ and Unreal Engine 5 &nbsp;|&nbsp; © 2026 NullLis
    </div>`;
}

// 高亮当前页面对应的菜单项
function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        // 简单匹配：链接末尾文件名与当前页相同则高亮
        if (href && (href.endsWith('/' + currentPath) || href === currentPath)) {
            link.classList.add('active');
        }
    });
}

// 初始化移动端菜单和下拉交互
function initNavbar() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // 点击菜单项后关闭移动端菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', (e) => {
        dropdowns.forEach(d => {
            if (!d.contains(e.target)) d.classList.remove('active');
        });
    });
}
