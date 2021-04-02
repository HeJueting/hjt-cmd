#! /usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const fetch = require("node-fetch");
const unzipper = require("unzipper");
const { program } = require("commander");

// 定义版本信息
program.version("0.0.1");
// 定义参数
program
    .option("-t, --test", "this is a test option")
    .option("-var, --variable <variable>", "this is a variable option", "hello");
// 定义命令内容
program
    .command("init <project>")
    .alias("i")
    .description("初始化项目...")
    .action((project) => {
        // 创建文件夹
        const folderPath = path.join(process.cwd(), project);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        // 根据输入的名称生成文件夹
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "请输入你的名字:",
                    name: "name",
                    default: "",
                },
            ])
            .then((answers) => {
                fetch("http://qiniu.hejueting.cn/npm/cmd-hello/hello.zip").then(function (res) {
                    // 将压缩包资源下载到本地磁盘
                    const dest = fs.createWriteStream(`./${project}/hello.zip`);
                    res.body.pipe(dest);
                    // 下载成功后
                    dest.on("close", () => {
                        // 从本地磁盘读取该压缩包资源，并解压
                        fs.createReadStream(`./${project}/hello.zip`)
                            .pipe(unzipper.Parse())
                            .on("entry", (entry) => {
                                // 获取文件名称
                                const fileName = entry.path;
                                if (fileName === "hello.html") {
                                    entry.on("data", (content) => {
                                        // 将文件的内容转成utf-8格式
                                        content = content.toString("utf-8");
                                        // 替换变量
                                        content = content.replace(/\[_name_\]/g, answers.name);
                                        // 写入组件文件
                                        fs.writeFileSync(`./${project}/${fileName}`, content, "utf8");
                                    });
                                } else {
                                    entry.autodrain();
                                }
                            });
                    });
                });
            });
    });

program.parse(process.argv);
