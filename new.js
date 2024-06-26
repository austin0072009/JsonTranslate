const fs = require("fs");
const { Translate } = require("@google-cloud/translate").v2;
process.env.GOOGLE_APPLICATION_CREDENTIALS ="./service.json"; // 如果已经设置环境变量，这行可以省略

// 初始化Google翻译客户端
const translate = new Translate();

// 读取你的文件内容（假设是JSON格式）
const fileContent = require("./th.js"); // 确保文件路径正确

// 函数：翻译文本
async function translateText(text, targetLanguage) {
  try {
    let [translated] = await translate.translate(text, targetLanguage);
    return translated;
  } catch (error) {
    console.error("Error:", error);
    return text; // 发生错误时返回原始文本
  }
}

// 函数：递归翻译对象中的所有字符串
async function translateObject(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = await translateText(obj[key], "th"); // 目标语言代码
    } else if (typeof obj[key] === "object") {
      await translateObject(obj[key]); // 递归处理嵌套对象
    }
  }
}

// 主函数：开始翻译流程
async function main() {
  await translateObject(fileContent);
  // 将翻译后的对象写回到新文件中
  fs.writeFile(
    "th_translated.js",
    "export default " + JSON.stringify(fileContent, null, 2),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved with translated content!");
    }
  );
}

main(); // 执行主函数
