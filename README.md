简体中文|[English](./README_en.md)

# Ming-ui

>   为企业绩效评价系统定制开发的一款UI框架



## 作者

-   Quarter ([https://shiruihua.cn](https://shiruihua.cn))



## 依赖

-   [wendux/fly](https://github.com/wendux/fly)



## 文档

### m-select

**属性**

-   **disabled:** 是否禁用组件

**样式**

-   **--m-select-color:** 默认情况下的字体颜色
-   **--m-select-disable-color:**  禁用状态下的字体颜色
-   **--m-select-active-color:** 激活状态下的字体颜色
-   **--m-option-color:**  默认情况下选项的字体颜色
-   **--m-option-active-color:** 激活状态下选项的字体颜色
-   **--m-option-active-bg:**  激活状态下选项的背景颜色
-   **--m-option-disable-color:** 禁用状态下的字体颜色

**值**

-   **disabled:** 是否禁用组件

**方法**

-   **calcWidthAndPosition():** 重新计算组件布局

**事件**

-   **change:** 组件值改变



### m-option

**属性**

-   **value:** 选项的值（缺省为选项的内容）
-   **disabled:** 是否禁用该选项
-   **selected:** 该选项是否选中

**样式**

-   无

**值**

-   **value:** 选项的值（缺省为选项的内容）
-   **disabled:** 是否禁用该选项
-   **selected:** 该选项是否选中

**方法**

-   无



### m-input

**属性**

-   **value:** 输入框的值
-   **disabled:** 是否禁用输入框
-   **placeholder:** 提示文字
-   **type:** 文本框类型
-   **maxlength:** 最长字符长度限制

**样式**

-   **--m-input-width：** 输入框的宽度
-   **--m-input-line-height：** 输入框的行高
-   **--m-input-color：** 输入框为文字默认颜色
-   **--m-input-border-color：** 输入框的默认边框颜色
-   **--m-input-active-color：** 输入框的激活文字颜色
-   **--m-input-active-border-color：** 输入框的激活边框颜色
-   **--m-input-disable-color：** 输入框的禁用文字颜色
-   **--m-input-disable-border-color：** 输入框的禁用边框颜色

**值**

-   **value：** 输入框的内容
-   **placeholder：** 输入框的提示文字
-   **disabled：** 是否禁用数据框
-   **type：** 输入框的内容类型
-   **maxlength：** 输入框的字符长度限制

**方法**

-   无

**事件**

-   **focus:** 获得焦点
-   **blur:** 失去焦点
-   **change:** 值改变



### m-switch

**属性**

-   **value:** 当前状态
-   **disabled:** 是否禁用滑钮
-   **selected:** 是否打开

**样式**

-   无

**值**

-   **value：** 设置当前状态
-   **disabled：** 设置是否禁用滑钮

**方法**

-   无

**事件**

-   **change:** 值改变



### m-operation-list

**属性**

-   **disabled:** 是否禁用组件

**样式**

-   **--m-operation-list-color:** 默认情况下的文字颜色
-   **--m-operation-list-bg:** 默认情况下的背景颜色
-   **--m-operation-list-disable-color:** 禁用状态下的字体颜色
-   **--m-operation-list-disable-bg:** 禁用状态下的背景颜色
-   **--m-operation-color:** 默认情况下操作项的字体颜色
-   **--m-operation-active-color:** 激活状态下操作项的字体颜色
-   **--m-operation-active-bg:** 激活状态下的操作项的背景颜色
-   **--m-operation-disable-color:** 禁用状态下的操作项的字体颜色

**值**

-   **disabled:** 是否禁用组件

**方法**

-   **calcWidthAndPosition():** 重新计算组件布局



### m-operation

**属性**

-   **operation:** 点击时调用的操作
-   **disabled:** 是否禁用该选项

**样式**

-   无

**值**

-   **operation:** 点击时调用的操作
-   **disabled:** 是否禁用该选项

**方法**

-   无



### m-function

**属性**

-   **icon:** 图标的unicode代码
-   **icon-class:** 图标的类名
-   **disabled:** 是否禁用组件
-   **operation:** 点击时调用的方法名
-   **tip:** 指针悬浮时显示的提示信息

**样式**

-   **--m-function-color:** 默认情况下的字体颜色
-   **--m-function-bg:** 默认情况下的背景颜色
-   **--m-function-disable-color:** 禁用状态下的字体颜色
-   **--m-function-disable-bg:** 禁用状态下的背景颜色

**值**

-   **icon:** 图标的unicode代码
-   **icon-class:** 图标的类名
-   **disabled:** 是否禁用组件
-   **operation:** 点击时调用的方法名
-   **tip:** 指针悬浮时显示的提示信息

**方法**

-   无



### m-icon-function

**属性**

-   **icon:** 图标的unicode代码
-   **icon-class:** 图标的类名
-   **disabled:** 是否禁用组件
-   **operation:** 点击时调用的方法名
-   **tip:** 指针悬浮时显示的提示信息

**样式**

-   **--m-icon-function-color:** 默认情况下的字体颜色
-   **--m-icon-function-active-color:** 激活状态下的字体颜色
-   **--m-icon-function-active-bg:** 激活状态下的背景颜色
-   **--m-icon-function-disable-color:** 禁用状态下的字体颜色
-   **--m-icon-function-tip-color:** 提示框的字体颜色
-   **--m-icon-function-tip-bg:** 提示框的背景颜色

**值**

-   **icon:** 图标的unicode代码
-   **icon-class:** 图标的类名
-   **disabled:** 是否禁用组件
-   **operation:** 点击时调用的方法名
-   **tip:** 指针悬浮时显示的提示信息

**方法**

-   无



### m-menu

**属性**

-   **menu-target:** 菜单操作的对象的id

**样式**

-   无

**值**

-   **menu-target:** 菜单操作的对象的id

**方法**

-   无

**事件**

-   **change**： 菜单改变



### m-menu-group

**属性**

-   **icon:** 一级菜单对应的图标类名
-   **group-name:** 一级菜单的名称
-   **menu-route:** 一级菜单对应的url
-   **disabled:** 菜单是否禁用

**样式**

-   **--m-menu-group-active-bg:** 激活时的菜单组的背景颜色
-   **--m-menu-group-color:** 默认状态下一级菜单的字体颜色
-   **--m-menu-group-disable-color:** 禁用状态下一级菜单的字体颜色
-   **--m-menu-group-icon-active-color:** 激活状态下的菜单图标的颜色
-   **--m-menu-group-active-color:** 激活状态下的一级菜单的颜色
-   **--m-menu-group-icon-disable-color:** 禁用状态下的菜单图标的颜色
-   **--m-menu-item-color:** 默认情况下二级菜单的字体颜色
-   **--m-menu-item-active-color:** 激活状态下的二级菜单的字体颜色
-   **--m-menu-item-disable-color:** 禁用状态下的二级菜单的字体颜色

**值**

-   **icon:** 一级菜单对应的图标类名
-   **group-name:** 一级菜单的名称
-   **menu-route:** 一级菜单对应的url
-   **disabled:** 菜单是否禁用

**方法**

-   无



### m-menu-item

**属性**

-   **menu-route:** 二级菜单对应的url
-   **disabled:** 菜单是否禁用

**样式**

-   无

**值**

-   **menu-route:** 二级菜单对应的url
-   **disabled:** 菜单是否禁用

**方法**

-   无



### m-table

**属性**

-   无

**样式**

-   无

**值**

-   **config:** 表格的配置项

**方法**

-   **register(config) :** 配置表格组件，config 参数为必须
-   **render():** 重新获取值渲染表格
-   **showError():** 显示表格渲染错误的页面
-   **hideError():** 隐藏表格渲染错误的也米娜
-   **showEmpty():** 显示无数据页面
-   **hideEmpty():** 隐藏无数据页面



### m-form-item

**属性**

-   无

**样式**

-   **--m-form-item-color：** 文字颜色
-   **--m-form-item-active-color：** 选中后的文字颜色

**值**

-   无

**方法**

-   无



## 使用

### 引入

```html
<script type="text/javscript" src="./ming/ming.js"></script>
```



### select

```html
<m-select>
    <m-option value="1">选项 1</m-option>
    <m-option value="2">选项 2</m-option>
    <m-option value="3">选项 3</m-option>
    <m-option value="4" selected>选项 4</m-option>
    <m-option value="5" disabled>选项 5</m-option>
    <m-option value="6">选项 6</m-option>
    <m-option value="7">选项 7</m-option>
    <m-option value="8">选项 8</m-option>
</m-select>
```

**预览**

![select 的预览图](./previews/preview_zh_select.png)



### input

```html
<m-input type="text"></m-input>
<m-input type="text" disabled></m-input>
<m-input type="text" value="一家公司的名称"></m-input>
<m-input type="text" value="一家公司的名称" disabled></m-input>
<m-input type="text" value="一家公司的名称"></m-input>
```

**预览**

![input 的预览图](./previews/preview_zh_input.png)

### switch

```html
<m-switch disabled></m-switch>
<m-switch></m-switch>
<m-switch selected></m-switch>
```

**预览**

![switch 的预览图](./previews/preview_switch.png)



### operation-list

```html
<m-operation-list>
    <m-operation operation="helloWorld">编辑数据</m-operation>
    <m-operation operation="helloWorld" disabled>加入对比</m-operation>
    <m-operation>删除数据</m-operation>
    <m-operation>查看详情</m-operation>
</m-operation-list>
```

**预览**

![operation-list 的预览图](./previews/preview_zh_operation_list.png)

### function

```html
<m-function icon-class="ming-icon-plus" tip="上传图片"></m-function>
```

**预览**

![ function的预览图](./previews/preview_zh_function.png)

### icon-function

```html
<m-icon-function icon-class="ming-icon-home" tip="主页" operation="helloWorld"></m-icon-function>
```

**预览**

![ icon-function 的预览图](./previews/preview_zh_icon_function.png)

### menu

```html
<m-menu menu-target="main-content">
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 1">
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 2">
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
        <m-menu-item menu-route="">二级菜单 3</m-menu-item>
        <m-menu-item menu-route="">二级菜单 4</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 3">
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 4" menu-route=""></m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 5">
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 6">
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
        <m-menu-item menu-route="">二级菜单 3</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="禁用的一级菜单" disabled>
        <m-menu-item menu-route="">二级菜单 1</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
    </m-menu-group>
    <m-menu-group icon="ming-icon-settings" group-name="一级菜单 8">
        <m-menu-item menu-route="" disabled>禁用的二级菜单</m-menu-item>
        <m-menu-item menu-route="">二级菜单 2</m-menu-item>
    </m-menu-group>
</m-menu>
```

**预览**

![menu 的预览图](./previews/preview_zh_menu.png)

### m-table

```html
<style type="text/css">
	.main-table {
        height: 600px;
    }
</style>

<m-table class="main-table" id="main-table"></m-table>

<script type="text/javascript">
	let config = {
        pageSize: 20,
        data: async function () {
            let tabledata = {
                status: 0,
                data: [],
                total: 0,
            };
            await fly.get('/data/table_example.json')
                .then(function (response) {
                    if (response.status == 200) {
                        tabledata.status = response.status;
                        if (response.data.status == 200) {
                            tabledata.data = response.data.data;
                            tabledata.total = response.data.total;
                        }
                    }
                });
            return tabledata;
        },
        columns: [
            [
                {
                    title: '序号',
                    rowspan: 2,
                    formatter: function (column, row, index) {
                        return index + 1;
                    }
                },
                {title: '第一组', colspan: 9},
                {title: '第二组', colspan: 3},
                {
                    title: '操作',
                    fixed: true,
                    rowspan: 2,
                    formatter: function (column, row, index) {
                        return `<m-operation-list>
                            <m-operation>操作项 A</m-operation>
                            <m-operation>操作项 B</m-operation>
                            <m-operation>操作项 C</m-operation>
                        </m-operation-list>`;
                    }
                },
            ],
            [
                {title: '数据 1', field: 'col1'},
                {title: '数据 2', field: 'col2'},
                {title: '数据 3', field: 'col3'},
                {title: '数据 4', field: 'col4'},
                {title: '数据 5', field: 'col5'},
                {title: '数据 6', field: 'col6'},
                {title: '数据 7', field: 'col7'},
                {title: '数据 8', field: 'col8'},
                {title: '数据 9', field: 'col9'},
                {title: '数据 10', field: 'col10'},
                {title: '数据 11', field: 'col11'},
                {title: '数据 12', field: 'col12'},
            ]
        ]
    };

    document.querySelector('#main-table').register(config);
</script>
```

![table 的预览图](./previews/preview_zh_table.png)


### form-item

```html
<m-form-item name="企业名称">
    <m-input type="text" disabled></m-input>
</m-form-item>
<m-form-item name="企业名称">
    <m-input type="text"></m-input>
</m-form-item>
<m-form-item name="企业名称">
    <m-input type="text"></m-input>
</m-form-item>
<m-form-item name="企业名称">
    <m-input type="text" value="一个企业的名称"></m-input>
</m-form-item>
<m-form-item name="企业名称">
    <m-select>
        <m-option value="1">选项 1</m-option>
        <m-option value="2">选项 2</m-option>
        <m-option value="3">选项 3</m-option>
        <m-option value="4" selected>选项 4</m-option>
        <m-option value="5" disabled>选项 5</m-option>
        <m-option value="6">选项 6</m-option>
        <m-option value="7">选项 7</m-option>
        <m-option value="8">选项 8</m-option>
    </m-select>
</m-form-item>
```

**预览**

![form-item 的预览图](./previews/preview_zh_form_item.png)





## 更多

-   [表格说明文档](./docs/DOC_TABLE.md)



## 开源协议

-   [MIT License](./LICENSE)