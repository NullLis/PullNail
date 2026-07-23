// components.js — 动态生成导航栏和页脚，兼容 GitHub Pages 子目录和根域名部署
document.addEventListener('DOMContentLoaded', () => {
    // 自动计算网站根路径（适配 GitHub Pages 的子目录项目）
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
 * 智能计算网站根路径（相对于当前 HTML 页面）
 * 例如：
 *   - 根目录访问 /index.html        → basePath = './'
 *   - 子目录访问 /PullNail/index.html → basePath = './'
 *   - 更深目录 /PullNail/html/links.html → basePath = '../'
 */
function getBasePath() {
    const path = window.location.pathname;
    // 如果 URL 中包含 "/html/" 这样的子目录，说明当前页面在子目录中
    const pathParts = path.split('/').filter(Boolean);

    // 检查最后一个部分是不是文件（如 .html），如果是，计算到仓库根目录的层级
    let depth = 0;
    if (pathParts.length > 0 && pathParts[pathParts.length - 1].includes('.')) {
        // 最后一段是文件，所以目录深度 = 层数 - 1
        depth = pathParts.length - 1;
    } else {
        depth = pathParts.length;
    }

    // 但还要考虑 GitHub Pages 项目站点可能多一层仓库名
    // 如果路径的第一段看起来像仓库名（不是常见目录，如 'html'），且当前部署在 GitHub Pages 子目录，
    // 则需额外回退一层。我们统一用相对路径处理：深度是多少就回退多少层。
    if (depth === 0) return './';  // 根目录
    return '../'.repeat(depth);
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
            <a href="#">服务条款</a>
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

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        dropdowns.forEach(d => {
            if (!d.contains(e.target)) d.classList.remove('active');
        });
    });
}
