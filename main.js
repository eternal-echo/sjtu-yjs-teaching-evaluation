// ==UserScript==
// @name         SJTU Teaching Evaluation 上海交通大学研究生网上评教
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  上海交通大学研究生网上评教脚本
// @author       You
// @match        *://yjs.sjtu.edu.cn/gsapp/sys/wspjapp/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let hasBeenFilled = false; // 设置一个标志，初始为false

    const fillAndSelect = () => {
        // 如果已经填写过，则不再执行
        if (hasBeenFilled) return;

        // 填写文本框并触发input事件
        const textarea1 = document.getElementById('wb_983bb2c5d10e42fd9ef5e7dc9e8cb4c8');
        if (textarea1) {
            textarea1.value = '非常好';
            textarea1.dispatchEvent(new Event('input', { bubbles: true }));
        }

        const textarea2 = document.getElementById('wb_ebe5747f1f134df489565e892ae53eec');
        if (textarea2) {
            textarea2.value = '非常好';
            textarea2.dispatchEvent(new Event('input', { bubbles: true }));
        }

        // 选择单选按钮
        const satisfiedRadio = Array.from(document.querySelectorAll("input[type='radio'][name='xx_54e70f817bac4a28ac6a757415eec2bf']")).find(radio => radio.value === '5');
        if (satisfiedRadio) {
            satisfiedRadio.checked = true;
        }

        // 模拟点击提交按钮和确认按钮
        setTimeout(() => {
            const submitButton = document.querySelector("[data-action='提交']"); // 以“data-action='提交'”为例
            if (submitButton) {
                submitButton.click();
                // 等待确认按钮出现并点击它
                setTimeout(() => {
                    const confirmButton = Array.from(document.querySelectorAll("a, button")).find(el => el.textContent.includes('确定')); // 根据文本内容寻找确认按钮
                    if (confirmButton) {
                        confirmButton.click();
                    }
                }, 1000); // 延迟1秒点击确认按钮
            }
        }, 1000); // 延迟1秒点击提交按钮

        hasBeenFilled = true; // 设置标志为true，表示已经填写
    };

    const observer = new MutationObserver((mutations, obs) => {
        if (document.getElementById('wb_983bb2c5d10e42fd9ef5e7dc9e8cb4c8') && document.getElementById('wb_ebe5747f1f134df489565e892ae53eec')) {
            fillAndSelect();
            // 不再需要持续监听，可以选择在这里断开observer
            // obs.disconnect();
        }
    });

    observer.observe(document, {
        childList: true,
        subtree: true
    });
})();
