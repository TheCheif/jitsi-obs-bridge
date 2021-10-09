declare namespace chrome {
    const runtime: any;
}
((src: any, tag: string) => {
    const node = document.getElementsByTagName(tag)[0];
    const script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', src);
    node.appendChild(script);
})(chrome.runtime.getURL('app.js'), 'body')