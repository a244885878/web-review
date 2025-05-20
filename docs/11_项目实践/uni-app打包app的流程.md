#### 一、打包 Android 应用

##### 1. 开发环境准备

- 安装 HBuilderX（官方推荐的开发工具）。
- 确保项目在 HBuilderX 中能正常运行（调试模式）。

##### 2. 配置 Android 打包信息

- 应用名称：在 `manifest.json` → 基础配置 → 应用名称。
- 应用标识（包名）：在 `manifest.json` → 基础配置 → 应用标识（如 `com.example.app`）。
- 版本号：在 `manifest.json` → 基础配置 → 版本名称和版本号。

##### 3. 生成签名证书（可选但推荐）

- Android 要求应用必须签名。可以使用以下方法生成：

```bash
keytool -genkey -alias testalias -keyalg RSA -keysize 2048 -validity 36500 -keystore test.keystore
```

- 保存 `.keystore` 文件并记录密码（丢失后无法更新应用）。

##### 4. 云端打包（推荐）

- 步骤：
  - 在 HBuilderX 中右键项目 → 发行 → 原生 App-云端打包。
  - 选择 Android 平台，勾选「使用自有证书」并填写 `.keystore` 文件路径和密码。
  - 点击打包，等待完成（需登录 DCloud 账号，免费用户每日有限额）。
- 输出：生成 `.apk` 文件（下载到本地）。

##### 5. 本地打包（可选）

- 需要配置 Android Studio 和 SDK 环境。
- 导出 uni-app 代码到 Android 项目，手动编译（复杂，建议参考官方文档）。

##### 6. 安装测试

将 `.apk` 文件传输到 Android 设备，安装并测试。

#### 二、打包 iOS 应用

##### 1. 开发环境准备

- 必须使用 `macOS` 系统（Xcode 仅支持 macOS）。
- 安装 `Xcode` 和 `iOS` 模拟器。
- 注册 `Apple 开发者账号`（个人/公司账号，需付费）。

##### 2. 配置 iOS 打包信息

- Bundle Identifier：在 `manifest.json` → 基础配置 → 应用标识（如 `com.example.app`）。
- 版本号：在 `manifest.json` → 基础配置 → 版本名称和版本号。

##### 3. 生成 iOS 证书和描述文件

- 步骤：
  - 登录 `Apple Developer` 后台，创建 App ID。
  - 生成 开发/发布证书（`.p12` 文件）和 描述文件（Provisioning Profile）。
  - 下载证书和描述文件到本地。

##### 4. 云端打包（推荐）

- 步骤：
  - 在 HBuilderX 中右键项目 → 发行 → 原生 App-云端打包。
  - 选择 iOS 平台，上传 `.p12` 证书和描述文件。
  - 点击打包，等待完成（需 DCloud 账号）。
- 输出：生成 `.ipa` 文件（仅限越狱设备直接安装）。

##### 5. 本地打包（上架必备）

- 步骤：
  - 在 HBuilderX 中生成 iOS 资源：发行 → 原生 App 本地打包 → 生成原生 App 资源。
  - 使用 Xcode 打开生成的 `iOS` 目录下的工程文件（如 `xxx.xcodeproj`）。
  - 配置签名：在 Xcode 的 `Signing & Capabilities` 中选择团队和描述文件。
  - 连接真机或选择模拟器，点击 Build 生成 `.ipa`。

##### 6. 上架 App Store

- 通过 `App Store Connect` 提交应用：
  - 创建新应用，填写元数据（名称、截图、描述等）。
  - 使用 Xcode 或 Transporter 上传 `.ipa` 文件。
  - 提交审核（需 1-7 天）。

#### 三、注意事项

##### 1. Android：

- 若使用第三方 SDK（如地图、支付），需在 `manifest.json` 配置权限。
- 签名文件务必备份！丢失后无法更新同一包名的应用。

##### 2. iOS：

- 测试阶段可使用 TestFlight 分发给测试用户。
- 上架需遵守 Apple 审核规则（如隐私政策、支付方式等）。

##### 3. 跨平台兼容性：

部分 API 和组件在 iOS/Android 表现不同，需真机测试。

#### 四、常见问题

- Q：云打包失败怎么办？
  - 检查证书格式、包名是否冲突，或查看 HBuilderX 控制台报错信息。
- OS 打包后无法安装？
  - 未签名或描述文件未包含设备 UDID（测试时需添加设备到开发者账号）。
- Q：如何调试原生功能？
  - 使用 HBuilderX 的「自定义调试基座」功能（需本地安装 Android Studio/Xcode）。

#### 五、如何热更新

在 uni-app 中，实现应用的热更新主要有两种方式：**资源热更新**和**整包更新**。

##### 资源热更新

##### 1. 生成资源包（.wgt 文件）：

- 在 HBuilderX 中，选择“发行” > “原生 App” > “资源升级包”，生成 .wgt 文件。

##### 2. 上传资源包：

- 将生成的 `.wgt` 文件上传到服务器或云存储，以便客户端下载。

##### 3. 客户端检测更新：

- 在应用启动时，向服务器请求最新版本信息，判断是否需要更新。

##### 4. 下载并安装更新：

- 如果需要更新，下载 `.wgt` 文件，并使用 `plus.runtime.install` 方法安装。

##### 示例代码：

```js
// #ifdef APP-PLUS
uni.request({
  url: "https://example.com/check-update",
  success: (res) => {
    if (res.data.updateAvailable) {
      uni.downloadFile({
        url: res.data.wgtUrl,
        success: (downloadResult) => {
          if (downloadResult.statusCode === 200) {
            plus.runtime.install(
              downloadResult.tempFilePath,
              { force: true },
              () => {
                plus.runtime.restart();
              },
              (e) => {
                console.error("安装失败：", e);
              }
            );
          }
        },
      });
    }
  },
});
// #endif
```

#### 注意事项：

- 版本号管理： 确保客户端和服务器端的版本号一致，以避免不必要的更新。
- 兼容性： 更新的资源应与当前应用版本兼容，避免因 API 变化导致崩溃。

##### 整包更新

整包更新需要重新安装应用，适用于需要修改原生代码或大幅度改动的情况。

##### 1. 生成新版本的安装包（.apk 或 .ipa）：

- 在 HBuilderX 中，选择“发行” > “原生 App” > “云打包”，生成新的安装包。

##### 2. 上传安装包：

- 将新的安装包上传到服务器或应用市场。

##### 3. 客户端检测更新：

- 在应用启动时，向服务器请求最新版本信息，判断是否需要更新。

##### 4. 提示用户更新：

- 如果需要更新，提示用户下载并安装新版本。

```js
// #ifdef APP-PLUS
uni.request({
  url: "https://example.com/check-update",
  success: (res) => {
    if (res.data.updateAvailable) {
      uni.showModal({
        title: "更新提示",
        content: res.data.updateDescription,
        success: (response) => {
          if (response.confirm) {
            plus.runtime.openURL(res.data.apkUrl);
          }
        },
      });
    }
  },
});
// #endif
```

#### 注意事项：

- 用户体验： 提示用户更新时，提供详细的更新说明，增强用户的更新意愿。
- 应用市场审核： 整包更新需要重新提交应用市场审核，可能导致审核延迟。
