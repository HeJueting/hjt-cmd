### 前言

最近有这么一个小需求，使用命令行快速构建项目文件，项目文件中的部分内容也会根据命令行输入内容的改变而改变，于是抽空简单学习了一下 **commander** 和 **inquirer** 的使用，并写了一个小 demo。

</br>
</br>

### 使用

```javascript
// 全局安装hjt-cmd工具包
npm i hjt-cmd -g

// 查看命令帮助
hjt --help

// 初始化项目
hjt init test
> 请输入你的名称：hejueting

// 最后将生成一个test项目
```

</br>
</br>
