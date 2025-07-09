function inject() {
    let typewriterElement = document.querySelector('#subtitle');

    if (typewriterElement === null) {
        return;
    }

    // 改为异步获取文本长度
    let textLength = 0;
    const textLengthInterval = setInterval(() => {
        textLength = typewriterElement.textContent.length;
        if (textLength !== 0) {
            clearInterval(textLengthInterval);

            // 修改元素为div
            typewriterElement.outerHTML = `<div id="subtitle">${typewriterElement.textContent}</div>`;
            typewriterElement = document.querySelector('#subtitle');

            // 动画设置
            typewriterElement.style.animation = `typing ${textLength / 3}s steps(${textLength}, end) infinite`;
            typewriterElement.style.opacity = 1;
        }
    }, 100);
}

document.addEventListener('DOMContentLoaded', function () {
    let callback = function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                let styleAttribute = mutation.target.getAttribute('style');
                // 检查style属性中是否不包含'overflow: hidden'
                if (styleAttribute !== undefined && !styleAttribute.includes('overflow: hidden')) {
                    inject();
                }
            }
        }
    };

    let observer = new MutationObserver(callback);
    let targetNode = document.body;
    let config = {attributes: true};
    observer.observe(targetNode, config);
});
