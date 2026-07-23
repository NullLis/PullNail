// load-components.js — 动态加载导航栏和页脚
document.addEventListener('DOMContentLoaded', async () => {
    // 获取当前页面相对于根目录的路径，用于正确加载 nav.html/footer.html
    // 假设所有页面都在根目录或 html/ 子目录，通过路径层级判断
    const pathSegments = window.location.pathname.split('/').filter(s => s);
    const depth = pathSegments.length - 1; // 如果页面在根目录，depth=0；在html/下，depth=1
    const prefix = depth > 0 ? '../'.repeat(depth) : '';

    try {
        // 加载导航栏
        const navResponse = await fetch(prefix + 'nav.html');
        if (navResponse.ok) {
            document.getElementById('navbar-container').innerHTML = await navResponse.text();
            // 高亮当前页菜单项
            highlightCurrentPage();
            // 初始化导航栏的交互（下拉菜单、移动端菜单）
            initNavbar();
        }

        // 加载页脚
        const footerResponse = await fetch(prefix + 'footer.html');
        if (footerResponse.ok) {
            document.getElementById('footer-container').innerHTML = await footerResponse.text();
        }
    } catch (err) {
        console.error('加载公共组件失败:', err);
    }
});

function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPath || href === '../' + currentPath || href === './' + currentPath)) {
            link.classList.add('active');
        }
    });
}

function initNavbar() {
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    // 下拉菜单交互（如果使用点击触发而非悬停）
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
