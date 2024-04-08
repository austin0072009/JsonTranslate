const { Translate } = require("@google-cloud/translate").v2;

// 配置服务账号密钥路径
process.env.GOOGLE_APPLICATION_CREDENTIALS ="./service.json"; // 如果已经设置环境变量，这行可以省略

const translate = new Translate();

async function quickStart() {
  // 要翻译的文本
  const text = "Hello, world!";
  // 目标语言
  const target = "ru"; // 例如，翻译成俄语

  // 翻译文本
  try {
    let [translation] = await translate.translate(text, target);
    console.log(`Text: ${text}`);
    console.log(`Translation: ${translation}`);
  } catch (error) {
    console.error("Error:", error);
  }
}

quickStart();
