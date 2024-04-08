const fs = require("fs");
const fetch = require("node-fetch");

// 替换为你的文件路径
const file = "path/to/your/th.js";
// 替换为你的API密钥
const apiKey = "YOUR_GOOGLE_TRANSLATE_API_KEY";

// 读取文件并解析JSON
const content = require(file);

// 函数：调用谷歌翻译API进行翻译
async function translateText(text, targetLanguage) {
  try {
    let response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
      {
        method: "POST",
        body: JSON.stringify({
          q: text,
          target: targetLanguage,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    let jsonResponse = await response.json();
    return jsonResponse.data.translations[0].translatedText;
  } catch (error) {
    console.error("Error:", error);
    return text; // 返回原文本作为后备
  }
}

// 主函数：遍历并翻译每个键值
async function translateObject(obj) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = await translateText(obj[key], "th");
    } else if (typeof obj[key] === "object") {
      await translateObject(obj[key]); // 递归处理嵌套对象
    }
  }
}

// 开始翻译过程
translateObject(content).then(() => {
  fs.writeFile(
    "th_translated.js",
    "export default " + JSON.stringify(content, null, 2),
    (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    }
  );
});
