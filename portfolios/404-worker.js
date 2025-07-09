// src/index.ts
var src_default = {
    async fetch(request, env) {
      const inputs = {
        prompt: "cyberpunk cat"
      };
      
      // 获取图片数据
      const imageData = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );
      
      // 创建HTML响应，设置黑色背景并居中显示图片
      const html = `
<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                margin: 0;
                padding: 0;
                background-color: black;
                color: white;
                font-family: Arial, sans-serif;
                min-height: 100vh;
              }
              
              .container {
                /* 采用弹性布局使子元素在移动设备上垂直排列并水平居中对齐 */
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center; /* 添加垂直居中 */
                min-height: 100vh; /* 确保容器至少有视口高度，使垂直居中生效 */
                box-sizing: border-box;
                width: 100%;
              }
              
              .message {
                text-align: center;
                padding: 20px;
                line-height: 1.5;
              }
              
              .image-container {
                max-width: 100%;
              }
              
              img {
                max-width: 100%;
                max-height: 70vh;
                display: block;
                object-fit: contain;
              }
              
              /* 全屏黑色蒙版 */
              .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: black;
                z-index: 1000;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: opacity 0.5s ease;
              }
              
              .loading-spinner {
                width: 50px;
                height: 50px;
                border: 5px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
              }
              
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
              
              /* 桌面端布局 */
              @media (min-width: 768px) {
                .container {
                  flex-direction: row;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                }
                
                .message {
                  width: 17%;
                  padding: 0 20px;
                }
                
                .image-container {
                  height: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                
                img {
                  max-height: 100vh;
                  object-fit: contain;
                  width: auto;
                  height: auto;
                }
              }
            </style>
          </head>
          <body>
            <!-- 全屏黑色蒙版 -->
            <div class="loading-overlay" id="loadingOverlay">
              <div class="loading-spinner"></div>
            </div>
            
            <div class="container">
              <div class="message">
                <p style="font-weight: bold;">The website is currently undergoing an architectural upgrade. </p>
                </p>Reason: Architecture upgrade 🚀</p>
                </p>Reopening time: 2025-03-31 🚀</p>
              </div>
              
              <div class="image-container">
                <img src="/image" alt="Generated Image" id="generatedImage">
              </div>
              
              <div class="message">
                <p>You can visit the website multiple times,maybe you will meet your <span style="font-size: 22px; font-weight: bold;">Favourite cat!😺</span></p>
                
              </div>
            </div>
            
            <script>
              // 图片加载完成后隐藏蒙版
              function hideLoadingOverlay() {
                const overlay = document.getElementById('loadingOverlay');
                if (!overlay) return;
                
                overlay.style.opacity = '0';
                setTimeout(() => {
                  overlay.style.display = 'none';
                }, 500);
              }
              
              // 获取图片元素
              const img = document.getElementById('generatedImage');
              
              // 每500ms检查图片是否已经加载完成
              const checkImageLoaded = () => {
                console.log(img.complete, img.naturalHeight);
                if (img.complete && img.naturalHeight > 200) {
                  hideLoadingOverlay();
                } else {
                  setTimeout(checkImageLoaded, 200);
                }
              };
              
              // 立即检查图片是否已经加载完成
              checkImageLoaded();
            </script>
          </body>
        </html>
      `;
      
      // 根据请求路径返回不同的内容
      const url = new URL(request.url);
      if (url.pathname === "/image") {
        // 直接返回图片数据
        return new Response(imageData, {
          headers: {
            "content-type": "image/png"
          }
        });
      } else {
        // 返回HTML页面
        return new Response(html, {
          headers: {
            "content-type": "text/html"
          }
        });
      }
    }
  };
  export {
    src_default as default
  };
  //# sourceMappingURL=index.js.map
  