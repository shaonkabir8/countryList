const menu = document.querySelectorAll('.menu li a');
menu.forEach(singleMenuItem => {
    singleMenuItem.addEventListener('click', () => {
        NProgress.start();
        NProgress.set(0.6); 
        NProgress.inc(); 
        NProgress.configure({ ease: 'ease', speed: 1000 }); 
        NProgress.configure({trickleSpeed: 1000 });
        NProgress.configure({ showSpinner: true });
        NProgress.done(); 
    })
})